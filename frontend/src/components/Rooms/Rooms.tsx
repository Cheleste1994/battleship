import { ListGroup } from 'react-bootstrap';
import { stringifyMessage } from 'src/helpers/stringifyMessage';
import { sendMessage } from 'src/modules/handlerSocket';
import { RoomsData } from 'src/types/responseWS';
import styles from './Rooms.module.scss';

export default function Rooms({ rooms }: { rooms: RoomsData[] }) {
  return (
    <div className={styles.rooms}>
      <h3>Rooms in game</h3>
      <ListGroup as="ol">
        {rooms.map((room) => (
          <ListGroup.Item
            as="li"
            key={room.roomId}
            action
            onClick={() => {
              sendMessage(
                stringifyMessage({
                  data: {
                    indexRoom: room.roomId,
                  },
                  type: 'add_user_to_room',
                })
              );
            }}
          >
            User in Room: {room.roomUsers[0].name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
