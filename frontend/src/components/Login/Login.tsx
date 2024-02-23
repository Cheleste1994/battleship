import { Form } from 'react-bootstrap';
import styles from './Login.module.scss';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { stringifyMessage } from 'src/helpers/stringifyMessage';
import { sendMessage } from 'src/modules/handlerSocket';

export default function Login() {
  const [name, setName] = useState('');

  const handleNameSubmit = (name: string) => {
      sendMessage(
        stringifyMessage({
          type: 'reg',
          data: {
            name,
            password: '',
          },
        })
    );
  };

  return (
    <Form
      className={styles.login}
      onSubmit={(e) => {
        e.preventDefault();
        handleNameSubmit(name);
      }}
    >
      <h1>BATTLESHIP</h1>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Please, write your name</Form.Label>
        <Form.Control
          type="text"
          placeholder="login"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}
