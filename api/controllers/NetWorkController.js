import { getNetworkIPs } from '../scripts/getNetworkIPs.js';

export const getNetworkDevices = (req, res) => {
  getNetworkIPs((devices) => {
    console.log(devices);
    res.json(devices);
  });
};
