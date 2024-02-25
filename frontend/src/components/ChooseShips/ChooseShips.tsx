import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector } from 'src/store/hooks';
import { getStateCanvas } from 'src/store/slice/canvas.slice';
import { getGameRoomsState } from 'src/store/slice/game.slice';
import styles from './ChooseShips.module.scss';

const sizeShips = {
  huge: 4,
  large: 3,
  medium: 2,
  small: 1,
};

export type SizeShips = typeof sizeShips;

export default function ChooseShips() {
  const { roomUsers } = useAppSelector(getGameRoomsState);
  const [alignShips, setAlignShips] = useState(false);
  const [activeShip, setActiveShip] = useState<keyof SizeShips | null>(null);

  const [shipsCount, setShipsCount] = useState<Record<keyof SizeShips, number>>(
    {
      huge: 1,
      large: 2,
      medium: 3,
      small: 4,
    }
  );

  const { gameBoard } = useAppSelector(getStateCanvas);

  useEffect(() => {
    if (activeShip) {
      const isSet = gameBoard?.shipPositionHandler(
        sizeShips[activeShip],
        alignShips
      );

      if (isSet) {
        setShipsCount((state) => ({
          ...state,
          [activeShip]: state[activeShip] - 1,
        }));
      }
    }
  }, [activeShip]);

  return (
    <div className={styles.choose}>
      <div className={styles.background} />
      <h6>Player: {roomUsers[0].name}</h6>
      <h3>Arrange your ships on grid</h3>
      <div className={styles.ships}>
        {Object.entries(shipsCount).map(([size, count], index) => (
          <div>
            <span>Count: {count}</span>
            <img
              src={`/ships/${size}.png`}
              key={size + index}
              alt="huge"
              itemType={!count ? 'disabled' : ''}
              className={activeShip === size ? styles.active : ''}
              onClick={() =>
                !activeShip || activeShip !== size
                  ? setActiveShip(size as keyof SizeShips)
                  : setActiveShip(null)
              }
            />
          </div>
        ))}
      </div>
      <div className={styles.align}>
        <Form.Check
          type="switch"
          id="custom-switch"
          label={alignShips ? 'vertical' : 'horizonal'}
          onChange={(e) => setAlignShips(Boolean(e.target.value))}
        />
        <Button variant="dark">Automatically</Button>
      </div>
    </div>
  );
}
