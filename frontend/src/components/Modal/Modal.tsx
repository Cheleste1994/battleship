import { memo, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { RoomsData } from 'src/types/responseWS';
import styles from './Modal.module.scss';

export default memo(function Modal({
  message,
}: {
  rooms: RoomsData;
  message?: string;
}) {
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(styles.active);
    setTimeout(() => setActive(''), 4000);
  }, []);

  return (
    <div className={`${styles.modal} ${active}`}>
      <Alert show={true} variant="success">
        {message || `Rooms update!`}
      </Alert>
    </div>
  );
});
