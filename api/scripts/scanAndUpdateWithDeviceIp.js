import scanAndUpdate from './getNetworkIPs.js';
import updateDevicesIpFromNetworkDatas from './updateDevicesIpFromNetworkDatas.js';

export async function main() {
  await scanAndUpdate();
  await updateDevicesIpFromNetworkDatas();
}