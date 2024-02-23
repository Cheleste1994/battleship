import { Button } from 'react-bootstrap';
import { stringifyMessage } from 'src/helpers/stringifyMessage';
import { sendMessage } from 'src/modules/handlerSocket';
import styles from './CreateRoom.module.scss';

export default function CreateRoom({ userName }: { userName: string }) {
  return (
    <div className={styles.create}>
      <h3>{`Welcome to Battleship, ${userName}`}</h3>

      <Button
        variant="dark"
        onClick={() =>
          sendMessage(
            stringifyMessage({
              data: '',
              type: 'create_room',
            })
          )
        }
      >
        Create Room
      </Button>
    </div>
  );
}
