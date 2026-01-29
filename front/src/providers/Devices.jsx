import { fetcher } from "./api";


async function getData() {
  return fetcher('/devices/all', {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  // return fetcher('/active-directory/data', {
  //   method: 'GET',
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });
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


async function deleteDevice(deviceId) {
  return fetcher(`/devices/delete/${deviceId}`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { getData, updateDevice, deleteDevice };