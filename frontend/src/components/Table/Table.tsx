import { memo } from 'react';
import { Table as TableBootstrap } from 'react-bootstrap';
import { WinnersData } from 'src/types/responseWS';

export default memo(function Table({ users }: { users: WinnersData }) {
  return (
    <TableBootstrap striped bordered hover variant="dark">
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>№</th>
          <th colSpan={2}>Name</th>
          <th style={{ textAlign: 'center' }}>Poins</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={`${user} ${index}`}>
            <td style={{ textAlign: 'center' }}>{index + 1}</td>
            <td colSpan={2}>{user.name}</td>
            <td style={{ textAlign: 'center' }}>{user.wins || 'none'}</td>
          </tr>
        ))}
      </tbody>
    </TableBootstrap>
  );
});
