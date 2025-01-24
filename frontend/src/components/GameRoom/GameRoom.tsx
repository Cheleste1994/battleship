import Canvas from '../Canvas/Canvas';
import ChooseShips from '../ChooseShips/ChooseShips';
import styles from './GameRoom.module.scss';

export default function GameRoom() {
  return (
    <div className={styles.room}>
      <ChooseShips />
      <Canvas />
    </div>
  );
}
