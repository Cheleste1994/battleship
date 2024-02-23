import { useDeferredValue, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Background from 'src/components/Background/Background';
import CreateRoom from 'src/components/CreateRoom/CreateRoom';
import Login from 'src/components/Login/Login';
import Rooms from 'src/components/Rooms/Rooms';
import Table from 'src/components/Table/Table';
import { startListening } from 'src/modules/handlerSocket';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getUsersState } from 'src/store/slice/users.slice';
import styles from './Home.module.scss';

const sidebarContentEl = document.getElementById('background') as HTMLElement;

export default function Home() {
  const { userName, allUsers, rooms } = useAppSelector(getUsersState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startListening());
  }, [dispatch]);

  const deferredValue = useDeferredValue(sidebarContentEl);

  const allUsersMemo = useMemo(() => allUsers, [allUsers]);

  return (
    <>
      <div className={styles.home}>
        {!userName && <Login />}
        {userName && (
          <div className={styles.users}>
            <CreateRoom userName={userName} />
            <Rooms rooms={rooms} />
            <Table users={allUsersMemo} />
          </div>
        )}
      </div>
      {createPortal(<Background />, deferredValue)}
    </>
  );
}
