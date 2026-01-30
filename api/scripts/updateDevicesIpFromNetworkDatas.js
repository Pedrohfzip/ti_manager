import { db, loadModels } from '../database/models/index.js';

export default async function updateDevicesIpFromNetworkDatas() {
  await loadModels();
  const { Devices, NetworkDatas } = db;

  // Busca todos os Devices
  const devices = await Devices.findAll();

  for (const device of devices) {
    // Busca NetworkDatas onde o hostname começa com o name do device
    const networkData = await NetworkDatas.findOne({
      where: db.Sequelize.where(
        db.Sequelize.fn('LOWER', db.Sequelize.col('hostname')),
        'LIKE',
        device.name.toLowerCase() + '%'
      )
    });
    if (networkData && networkData.ip) {
      await device.update({ ip: networkData.ip });
      console.log(`Device ${device.name} atualizado com IP ${networkData.ip}`);
    } else {
      console.log(`Device ${device.name} não encontrado em NetworkDatas.`);
    }
  }

  console.log('Atualização concluída.');
}
