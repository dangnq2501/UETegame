import CoreGame from "../../components/CoreGame";
import { GameProvider } from "../../contexts/game";

export default function Lmao() {
  return (
    <GameProvider>
      <CoreGame />
    </GameProvider>
  );
}
