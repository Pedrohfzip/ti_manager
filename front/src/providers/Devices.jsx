import { fetcher } from "./api";


async function getData() {
  return fetcher('/devices/all', {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { getData };