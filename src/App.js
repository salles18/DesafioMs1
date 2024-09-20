
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './components/UserList';
import './index.css';
import './styles.css';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Consulta e Cadastro de Usuários</h1>
        <UserList />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
