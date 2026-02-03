import { fetcher } from "./api";


async function getEmployees() {
  return fetcher('/employees/all', {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}


export { getEmployees };
