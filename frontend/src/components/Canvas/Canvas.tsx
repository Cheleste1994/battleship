import { useEffect, useRef } from 'react';
import ControllerGame from 'src/Game/ControllerGame';
import { useAppDispatch } from 'src/store/hooks';
import { startGame } from 'src/store/slice/canvas.slice';
import styles from './Canvas.module.scss';

export default function Canvas() {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      startGame({
        canvas: refCanvas.current,
        gameBoard: new ControllerGame(refCanvas.current),
      })
    );
  }, []);

  return (
    <div className={styles.canvas}>
      <canvas width={400} height={400} ref={refCanvas}></canvas>
    </div>
  );
}
