// src/components/UserList.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUsers } from '../api/usersApi';
import UserModal from './UserModal';
import { useUsers } from '../UserContext';

function UserList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { users, setUsers } = useUsers();

  // Fetch users from API and update context
  const { error, isLoading } = useQuery('users', fetchUsers, {
    onSuccess: (data) => {
      setUsers(data); // Atualiza os usuários no contexto
    },
  });

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários!</p>;

  // Filtrar usuários com base na pesquisa
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <button className="cadastrar-btn" onClick={() => setIsModalOpen(true)}>
        Cadastrar Usuário
      </button>
      
      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar usuário..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      {isModalOpen && <UserModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default UserList;
