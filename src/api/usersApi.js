// src/api/usersApi.js
export const fetchUsers = async () => {
    const response = await fetch('https://api.github.com/users');
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    const data = await response.json();
    return data.map(user => ({
      id: user.id,
      name: user.login,
      email: `${user.login}@example.com`, // Email fictício
    }));
  };
  