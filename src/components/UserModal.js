// src/components/UserModal.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useUsers } from '../UserContext';
import { v4 as uuidv4 } from 'uuid'; 

function UserModal({ onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const { setUsers } = useUsers(); 

  const mutation = useMutation(
    (data) => {
      const newUser = { ...data, id: uuidv4() }; 
      return newUser; 
    },
    {
      onSuccess: (newUser) => {
        setUsers((prev) => [...prev, newUser]); 
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
    mutation.mutate(data); 
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
