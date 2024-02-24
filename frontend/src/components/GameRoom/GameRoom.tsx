import { useAppSelector } from 'src/store/hooks';
import { getGameRoomsState } from 'src/store/slice/game.slice';

export default function GameRoom() {
  const { roomUsers } = useAppSelector(getGameRoomsState);

  return (
    <div>
      GAME ROOM
      {roomUsers[0].name}
      {roomUsers[1].name}
    </div>
  );
}
