
// utils/usersApi.ts
import { fetcher } from "./api";


async function getUsers() {
  return fetcher('/users/');
}

async function loginUser(email, senha) {
  return fetcher('/users/login/', {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha }),
  });
}

// Adicione outras funções relacionadas a usuários aqui

export default {
  getUsers,
  loginUser,
};

// Adicione outras funções relacionadas a usuários aqui
