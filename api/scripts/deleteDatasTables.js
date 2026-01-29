import { db, loadModels } from '../database/models/index.js';

async function deleteAllDevices() {
  await loadModels();
  try {
    await db.Devices.destroy({ where: {}, truncate: true });
    console.log('Todos os dados da tabela Devices foram deletados.');
  } catch (err) {
    console.error('Erro ao deletar dados da tabela Devices:', err.message);
  } finally {
    process.exit(0);
  }
}

deleteAllDevices();
