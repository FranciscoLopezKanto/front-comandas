import React, { createContext, useState, ReactNode } from 'react';

type User = {
  user_id: number;
  name: string;
  email: string;
  password: string;
  rol: 'admin' | 'user';
  token: string;
};

type UserContextProps = {
  users: User[];
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
};

const initialUsers: User[] = [
  {
    user_id: 1,
    name: 'sebas',
    email: 'sebas@gmail.com',
    password: '123456',
    rol: 'admin',
    token: 'token-123',
  },
];

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const login = (email: string, password: string): string | null => {
    const user = users.find((u) => u.email === email && u.password === password);
    return user ? user.token : null;
  };

  const register = (name: string, email: string, password: string): string | null => {
    const exists = users.some((u) => u.email === email);
    if (exists) return null;

    const newUser: User = {
      user_id: users.length + 1,
      name,
      email,
      password,
      rol: 'user',
      token: `token-${users.length + 1}`,
    };

    setUsers((prev) => [...prev, newUser]);
    return newUser.token;
  };

  return (
    <UserContext.Provider value={{ users, login, register }}>
      {children}
    </UserContext.Provider>
  );
};
