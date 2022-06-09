import type { User } from "@prisma/client";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => Promise<void>;
};

const Users = ({ users, onEdit, onDelete }: Props) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}{" "}
          <button onClick={() => onEdit(user)}>edit</button>
          <button onClick={() => onDelete(user)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Users;
