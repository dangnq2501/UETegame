import Phaser from "phaser";

export default class PlayGame extends Phaser.Scene {
  constructor({ gem, character, gameData, setDone }) {
    super("playGame"); // Identifier for this scene
    this.isRunning = false;
    this.swing = false;
    this.answer = null;
    this.gem = gem;
    this.character = character;
    this.gameData = gameData;
    this.setDone = setDone;
    this.flag = false;
  }

  create() {
    // console.log(this.gem, this.character)
    this.createEverything();
    // Logic

    this.game.events.on("Answer_Event", (event) => {
      this.answer = event;
      this.isRunning = true;
      this.player.play("run_" + this.gameData.character + "_anim");
      this.step.play();
      this.dust.playReverse("dust_particle");
    });

    // Finally trigger an event so that the scene is now visible. This is optional
    // but useful if you want to transition your game's appearance.
    this.game.events.emit("putOnPlayGame", true);
  }

  movePlayer(player, speed) {
    player.x += speed;
    if (player.x > 400) {
      this.resetPlayer(player);
    }
  }

  resetPlayer(player) {
    player.x = 0;
    player.y = 300 / 2;
  }

  createEverything() {
    if (this.monster) {
      this.monster.destroy();
      this.player.destroy();
      this.weapon.destroy();
    }

    this.background = this.add.image(
      this.gameData.map.x,
      this.gameData.map.y,
      this.gameData.map.name
    );
    // this.tundra = this.add.image(-240, -140, "tundra");
    this.background.setOrigin(0, 0);

    // Declaration using sprite
    this.monster = this.physics.add.sprite(
      400 - 50,
      300 / 2,
      localStorage.getItem("monster")
    );
    const player = this.physics.add.sprite(
      50,
      300 / 2,
      this.gameData.character
    );
    this.weapon = this.physics.add.sprite(
      53,
      300 / 2 + 15,
      localStorage.getItem("weapon")
    );
    this.diamond_pickaxe = this.physics.add.sprite(
      400 - 60,
      300 / 2 + 15,
      "pickaxe_diamond"
    );
    this.dust = this.physics.add.sprite(30, 300 / 2 + 16, "dust");

    // Audio
    this.swing_sound = this.sound.add("swing");
    this.bonk = this.sound.add("bonk");
    this.falling = this.sound.add("falling");
    this.step = this.sound.add("step");
    this.step.setLoop(true);

    // Set Scale and play anim
    this.monster.setScale(2);
    this.monster.setSize(5, 20, true);
    this.monster.play("idle_" + localStorage.getItem("monster") + "_anim");

    this.diamond_pickaxe.setScale(1.5);
    this.diamond_pickaxe.rotation = -Math.PI / 2;
    // this.diamond_pickaxe.play('pickaxe_swing_l')

    this.dust.setScale(1.5);
    // this.dust.play('dust_particle')

    player.setScale(2);
    player.play("idle_" + this.gameData.character + "_anim");
    player.setCollideWorldBounds(true);

    this.player = player;

    this.weapon.setScale(1.5);
    this.weapon.rotation = 0;
    this.weapon.angle = 0;
    this.weapon.setOrigin(0.5, 1);
    // this.weapon.play("weapon_idle");

    this.cPlayer = this.add.container(0, 0);

    this.cPlayer.setSize(32, 32);
    this.physics.add.existing(this.cPlayer);
    this.cPlayer.add([this.player, this.weapon, this.dust]);

    this.physics.add.overlap(
      player,
      this.monster,
      this.handleOverlap,
      null,
      this
    );
  }

  killMonster(player, monster) {
    if (this.swing == false) {
      this.step.stop();
      this.swing = true;
      // this.weapon.play("weapon_swing_r", true);
      this.swing_sound.play();
      this.dust.play("idle_dust_particle");
      this.falling.play();
      this.diamond_pickaxe.visible = false;
    }
    player.play("idle_" + this.gameData.character + "_anim", true);
    monster.play("ded_" + localStorage.getItem("monster") + "_anim", true);

    this.isRunning = false;
  }

  hitPlayer(player, monster) {
    if (this.swing == false) {
      this.step.stop();
      this.bonk.play();
      this.swing = true;
      this.diamond_pickaxe.play("pickaxe_swing_l", true);
      this.dust.play("idle_dust_particle");
      this.weapon.visible = false;
      // this.falling.play();
    }

    player.play("ded_" + this.gameData.character + "_anim", true);
    // monster.play('_orc_anim', true);

    this.isRunning = false;
  }

  handleOverlap(player, monster) {
    if (!this.flag) {
      this.flag = true;
    } else {
      return;
    }

    if (this.answer) {
      this.killMonster(player, monster);
    } else {
      this.hitPlayer(player, monster);
    }

    setTimeout(() => {
      this.game.events.emit("done");
    }, 1000);
  }

  update() {
    if (this.isRunning) {
      this.movePlayer(this.cPlayer, 2);

      if (this.player.x > 400) {
        this.createEverything();
      }
    }

    if (this.flag && this.answer && this.weapon.angle < 100) {
      this.weapon.angle += 3;
    }
  }
}
