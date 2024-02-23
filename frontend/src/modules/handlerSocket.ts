import { parseMessage } from 'src/helpers/parseMessage';
import { setAllUsers, setRooms, setUser } from 'src/store/slice/users.slice';
import { AppDispatch } from 'src/store/store';
import { RegData, RoomsData, WinnersData } from 'src/types/responseWS';

const socket = new WebSocket('ws://localhost:5000/');

export const sendMessage = (message: string) => {
  socket.send(message);
};

export const startListening = () => (dispatch: AppDispatch) => {
  socket.onmessage = (event) => {
    const { data, type } = parseMessage(event.data);

    switch (type) {
      case 'reg':
        dispatch(setUser(data as RegData));
        break;
      case 'create_game':
        console.log(type);
        break;
      case 'add_ships':
        console.log(type);

        break;
      case 'attack':
        console.log(type);

        break;
      case 'randomAttack':
        console.log(type);

        break;
      case 'update_room':
        dispatch(setRooms(data as RoomsData));
        break;
      case 'update_winners':
        dispatch(setAllUsers(data as WinnersData));
        break;
      default:
        console.log('Unknown message type:', type);
    }
  };
};
