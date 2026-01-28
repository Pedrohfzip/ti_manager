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

async function updateDevice(deviceData) {
  return fetcher('/devices/update', {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(deviceData)
  });
}

export { getData, updateDevice };