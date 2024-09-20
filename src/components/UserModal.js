// src/components/UserModal.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useUsers } from '../UserContext';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid

function UserModal({ onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const { setUsers } = useUsers(); // Usando o contexto

  const mutation = useMutation(
    (data) => {
      const newUser = { ...data, id: uuidv4() }; // Adiciona um ID único
      return newUser; // Retorna o novo usuário
    },
    {
      onSuccess: (newUser) => {
        setUsers((prev) => [...prev, newUser]); // Atualiza a lista de usuários
        reset();
        onClose();
        toast.success('Usuário cadastrado com sucesso!');
      },
      onError: (error) => {
        console.error(error);
        toast.error('Erro ao cadastrar usuário');
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data); // Chama a mutação para cadastrar o usuário
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Cadastrar Novo Usuário</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nome:</label>
          <input {...register('name')} required />
          <label>Email:</label>
          <input type="email" {...register('email')} required />
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={onClose}>Fechar</button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
