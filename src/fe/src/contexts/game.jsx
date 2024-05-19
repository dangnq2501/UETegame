import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CHARACTER_CONFIGS, ITEM_CONFIGS, MOB_CONFIGS } from "../config/game";
import uuid from "../utils/uuid";
import { getRandomValue } from "../utils/random";
import shuffle from "lodash/shuffle";
import { useRouter } from "next/router";
import { socket } from "../models/wsEventListener";
import axios from "axios";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const router = useRouter();
  const [character, setCharacter] = useState(CHARACTER_CONFIGS.knight);
  const [gem, setGem] = useState(0);
  const [score, setScore] = useState(0);
  const [movable, setMovable] = useState(true);
  const [streak, setStreak] = useState(0);
  const [inventory, setInventory] = useState(
    character.inventory.map((item) => {
      const data = ITEM_CONFIGS[item];

      if (data) {
        return {
          ...data,
          durability: data.maxDurability,
        };
      }
      return null;
    })
  );
  const [health, setHealth] = useState(character.maxHealth);
  const [cards, setCards] = useState({});
  const [effects, setEffects] = useState({});
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [selectedSlotId, setSelectedSlotId] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [room, setRoom] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const addGem = useCallback((amount) => setGem((gem) => gem + amount), []);
  const [endGame, setEndGame] = useState(false);

  const addScore = useCallback(
    (amount) => setScore((score) => score + amount),
    []
  );

  const addItem = useCallback(
    (item) => {
      setInventory((inventory) => {
        const index = inventory.findIndex((i) => i == null);
        const inventory_ = [...inventory];
        inventory_[index] = item;

        return inventory_;
      });
    },
    [inventory]
  );

  const isInventoryFull = useMemo(
    () => inventory.every((item) => item != null),
    [inventory]
  );

  const weapon = useMemo(() => {
    const currentItem = inventory[selectedSlotId];

    if (currentItem && currentItem.group == "weapon") {
      return currentItem;
    }
    return null;
  }, [inventory, selectedSlotId]);

  const damage = useMemo(() => {
    let damage_ = weapon ? weapon.damage : 2;

    if (effects.power) {
      damage_ += effects.power.amount.damage;
    }

    return damage_;
  }, [weapon, effects]);

  const armor = useMemo(() => {
    let armors = inventory.filter((item) => item && item.group == "armor");
    return (
      armors.reduce((total, item) => total + item.defense, 0) +
      (effects.power?.amount.armor || 0)
    );
  }, [inventory, effects]);

  const addHealth = useCallback(
    (amount) =>
      setHealth((health) => Math.min(health + amount, character.maxHealth)),
    []
  );

  const reduceHealth = useCallback(
    (amount) => {
      const amount_ = Math.max(Math.floor((amount * 10) / (10 + armor)), 1);
      setHealth((health) => Math.max(health - amount_, 1));
    },
    [armor]
  );

  const sellItem = useCallback(
    (index) => {
      setInventory((inventory) => {
        const inventory_ = [...inventory];
        addGem(inventory_[index].price);
        inventory_[index] = null;
        return inventory_;
      });
    },
    [addGem]
  );

  const onFinished = useCallback(
    (isCorrect) => {
      if (isCorrect) {
        const currentHealth = currentCard.data.health;

        if (currentHealth > damage) {
          setCards({
            ...cards,
            [currentCard.id]: {
              ...currentCard,
              data: {
                ...currentCard.data,
                health: currentHealth - damage,
              },
            },
          });
        } else {
          const newCards = {
            ...cards,
          };

          delete newCards[currentCard.id];

          const id = uuid();
          newCards[id] = {
            id,
            type: "item",
            data: {
              ...ITEM_CONFIGS.gem,
              amount: currentCard.data.reward,
            },
            x: currentCard.x,
            y: currentCard.y,
          };

          setBoard((board) => {
            const board_ = [...board];
            board_[currentCard.x + currentCard.y * 3] = id;
            return board_;
          });

          setCards(newCards);
        }
      } else {
        reduceHealth(currentCard.data.damage);
      }

      if (weapon) {
        if (inventory[selectedSlotId].durability == 1) {
          setInventory((inventory) => {
            const inventory_ = [...inventory];
            inventory_[selectedSlotId] = null;
            return inventory_;
          });
        } else {
          setInventory((inventory) => {
            const inventory_ = [...inventory];
            inventory_[selectedSlotId].durability--;
            return inventory_;
          });
        }
      }

      setCurrentCard(null);
      setCurrentQuestion(null);

      handleEffects();
    },
    [inventory, currentCard, cards, weapon, damage]
  );

  const addEffect = useCallback((effectName, potionName, amount, duration) => {
    setEffects((effects) => ({
      ...effects,
      [effectName]: {
        amount,
        duration,
        potionName,
        firstTime: true,
      },
    }));
  }, []);

  const handleEffects = useCallback(() => {
    setEffects((effects) => {
      const effects_ = { ...effects };

      for (const effectName in effects_) {
        const effect = effects_[effectName];

        if (effect.firstTime) {
          effect.firstTime = false;
          continue;
        }

        if (effectName == "poison") {
          reduceHealth(effect.amount);
        }

        effect.duration--;

        if (effect.duration == 0) {
          delete effects_[effectName];
        }
      }
      return effects_;
    });
  }, [reduceHealth]);

  const handleInteraction = useCallback(
    (card) => {
      if (card.type == "item") {
        const item = card.data;

        if (item.group == "weapon") {
          if (!isInventoryFull) {
            addItem(item);
            return true;
          } else {
            return false;
          }
        }

        if (item.group == "gem") {
          addGem(item.amount);
        }

        if (item.group == "potion") {
          if (item.subgroup == "health") {
            addHealth(item.amount);
          } else {
            addEffect(item.subgroup, item.name, item.amount, item.duration);
          }
        }

        return true;
      } else if (card.type == "mob") {
        setCurrentCard(card);

        // pop last question
        setQuestions((questions) => {
          const questions_ = [...questions];
          const currentQuestion = questions_.pop();

          setCurrentQuestion(currentQuestion);

          return questions_;
        });

        return false;
      }

      return true;
    },
    [addItem, onFinished, addGem, addHealth, addEffect, isInventoryFull]
  );

  const generateCard = useCallback((x, y, isPlayer = false) => {
    const card = {
      id: uuid(),
      x,
      y,
    };

    if (isPlayer) {
      card.type = "player";
      card.data = character;
    } else {
      card.type = Math.random() < 0.5 ? "mob" : "item";

      if (card.type == "mob") {
        card.data = getRandomValue(MOB_CONFIGS);
        card.data.health = card.data.maxHealth;
      } else {
        card.type = "item";
        card.data = getRandomValue(ITEM_CONFIGS);

        if (card.data.group == "weapon") {
          card.data.durability = card.data.maxDurability;
        }
      }
    }

    setCards((cards) => ({
      ...cards,
      [card.id]: card,
    }));

    setBoard((board) => {
      const newBoard = [...board];
      newBoard[x + y * 3] = card.id;
      return newBoard;
    });
  }, []);

  const tryToMove = useCallback(
    (x, y) => {
      if (!movable) {
        return;
      }

      const playerCard = Object.values(cards).find(
        (card) => card.type == "player"
      );

      if (Math.abs(playerCard.x - x) + Math.abs(playerCard.y - y) != 1) {
        return;
      }

      const targetCard = cards[board[x + y * 3]];

      if (!handleInteraction(targetCard)) return;

      const cards_ = { ...cards };
      const board_ = [...board];

      let tx = x;
      let ty = y;

      board_[x + y * 3] = playerCard.id;
      board_[playerCard.x + playerCard.y * 3] = null;

      delete cards_[targetCard.id];
      cards_[playerCard.id] = {
        ...playerCard,
        x,
        y,
      };

      let flag = true;

      // Shuffle cards
      const cardList = shuffle(Object.values(cards_));
      const movedCards = new Set();

      while (flag) {
        flag = false;

        cardList.forEach((card) => {
          if (movedCards.has(card.id)) {
            return;
          }

          const cx = card.x;
          const cy = card.y;

          if (card.type == "player") {
            return;
          }

          let dx = tx - cx > 0 ? 1 : tx - cx < 0 ? -1 : 0;
          let dy = ty - cy > 0 ? 1 : ty - cy < 0 ? -1 : 0;

          if (board_[cy * 3 + cx + dx] != null) dx = 0;
          if (board_[(cy + dy) * 3 + cx] != null) dy = 0;

          // Choose random direction if both are available
          if (Math.abs(dx) == 1 && Math.abs(dy) == 1) {
            if (Math.random() < 0.5) {
              dx = 0;
            } else {
              dy = 0;
            }
          }

          if (dx != 0 || dy != 0) {
            const nx = cx + dx;
            const ny = cy + dy;

            board_[ny * 3 + nx] = card.id;
            board_[cy * 3 + cx] = null;
            cards_[card.id].x = nx;
            cards_[card.id].y = ny;

            movedCards.add(card.id);

            flag = true;
          }
        });
      }

      setBoard(board_);
      setCards(cards_);
      setMovable(false);

      // find empty coord
      let emptyX = null;
      let emptyY = null;
      board_.forEach((cardId, index) => {
        if (cardId == null) {
          emptyX = index % 3;
          emptyY = Math.floor(index / 3);
        }
      });

      setTimeout(() => {
        generateCard(emptyX, emptyY);

        setTimeout(() => {
          handleEffects();
          setMovable(true);
        }, 200);
      }, 450);
    },
    [board, cards, movable, handleInteraction, generateCard, handleEffects]
  );

  const moveCard = useCallback(
    (cardId, dx, dy) => {
      setBoard((board) => {
        const card = cards[cardId];

        const newBoard = [...board];
        newBoard[card.x + card.y * 3] = null;
        newBoard[card.x + dx + (card.y + dy) * 3] = card.id;

        return newBoard;
      });

      setCards((cards) => {
        const card = cards[cardId];

        return {
          ...cards,
          [cardId]: {
            ...card,
            x: card.x + dx,
            y: card.y + dy,
          },
        };
      });
    },
    [setCards, setBoard, cards]
  );

  useEffect(() => {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        generateCard(x, y, x == 1 && y == 1);
      }
    }
  }, []);

  useEffect(() => {
    if (!router.query.roomId) return;

    socket.emit(
      "post-joinRoom",
      localStorage.getItem("uid"),
      router.query.roomId
    );

    async function getData() {
      const res0 = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URI + `/room/get`,
        {
          uid: localStorage.getItem("uid"),
          data: router.query.roomId,
        }
      );

      const room = res0.data.data;

      const res1 = await axios.get(
        process.env.NEXT_PUBLIC_FLASK_URI + `/data/${room.testid}/questions`
      );

      setRoom(room);

      let questions = res1.data.questions;
      console.log('questions', questions)
      questions = questions.map((q, i) => ({ ...q, id: i }));
      questions = shuffle(questions);
      setQuestions(questions);
    }

    getData();
  }, [router]);

  useEffect(() => {
    socket.on("get-playerData", (uid, streak, nCorrects, total, score) => {
      console.log(uid, score);

      if (uid == localStorage.getItem("uid")) {
        setStreak(streak);
        setScore(score);
      }
    });

    socket.on("get-end", (uid, gem) => {
      localStorage.setItem("gem", gem);
      console.log(gem);
    });

    return () => {
      socket.off("get-playerDate");
      socket.off("get-end");
    };
  }, []);

  useEffect(() => {
    if (questions != null && currentQuestion == null && questions.length == 0) {
      setMovable(false);

      setTimeout(() => {
        setEndGame(true);

        socket.emit("post-end", gem);
      }, 1000);
    }
  }, [questions, currentQuestion]);

  return (
    <GameContext.Provider
      value={{
        health,
        armor,
        addHealth,
        reduceHealth,
        character,
        gem,
        addGem,
        score,
        addScore,
        inventory,
        cards,
        effects,
        board,
        moveCard,
        selectedSlotId,
        setSelectedSlotId,
        weapon,
        damage,
        onFinished,
        tryToMove,
        currentCard,
        setCurrentCard,
        sellItem,
        currentQuestion,
        streak,
        endGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
