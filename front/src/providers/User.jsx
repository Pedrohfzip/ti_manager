
// utils/usersApi.ts
import { fetcher } from "./api";


async function getUsers() {
  return fetcher('/users/');
}

async function loginUser(email, password) {
  console.log("loginUser called with:", email, password);
  return fetcher('/users/login/', {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  });
}


async function register({name ,email, password}) {
  return fetcher('/users/register/', {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password }),
  });
}



// Função para buscar dados de usuário via GET
async function getData() {
  return fetcher('/active-directory/data', {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}




// Adicione outras funções relacionadas a usuários aqui


export default {
  getUsers,
  register,
  loginUser,
  getData,
};

// Adicione outras funções relacionadas a usuários aqui
