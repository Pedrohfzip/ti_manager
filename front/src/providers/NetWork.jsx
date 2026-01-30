import { fetcher } from "./api";


async function getNetworkDevices() {
  return fetcher('/network/devices', {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { getNetworkDevices };