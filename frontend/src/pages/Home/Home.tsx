import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Background from 'src/components/Background/Background';
import CreateRoom from 'src/components/CreateRoom/CreateRoom';
import GameRoom from 'src/components/GameRoom/GameRoom';
import Login from 'src/components/Login/Login';
import Rooms from 'src/components/Rooms/Rooms';
import Table from 'src/components/Table/Table';
import { startListening } from 'src/modules/handlerSocket';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getGameRoomsState } from 'src/store/slice/game.slice';
import { getUsersState } from 'src/store/slice/users.slice';
import styles from './Home.module.scss';

const backgroundPortal = document.getElementById('background') as HTMLElement;

export default function Home() {
  const { userName, allUsers, rooms } = useAppSelector(getUsersState);
  const { isFull } = useAppSelector(getGameRoomsState);
  const [background, setBackground] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startListening());
    setBackground(backgroundPortal);
  }, [dispatch]);

  const allUsersMemo = useMemo(() => allUsers, [allUsers]);

  return (
    <>
      <div className={styles.home}>
        {!userName && <Login />}
        {userName && !isFull && (
          <div className={styles.users}>
            <CreateRoom userName={userName} />
            <Rooms rooms={rooms} />
            <Table users={allUsersMemo} />
          </div>
        )}
        {isFull && <GameRoom />}
      </div>
      {background && createPortal(<Background />, background)}
    </>
  );
}
