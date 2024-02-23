import { useDeferredValue, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Background from 'src/components/Background/Background';
import Login from 'src/components/Login/Login';
import { startListening } from 'src/modules/handlerSocket';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getUsersState } from 'src/store/slice/users.slice';

const sidebarContentEl = document.getElementById('background') as HTMLElement;

export default function Home() {
  const {userName} = useAppSelector(getUsersState)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startListening());
  }, [dispatch]);

  const deferredValue = useDeferredValue(sidebarContentEl);
  return (
    <>
      <div className="Home">
        {!userName && <Login />}
      </div>
      {createPortal(<Background />, deferredValue)}
    </>
  );
}
