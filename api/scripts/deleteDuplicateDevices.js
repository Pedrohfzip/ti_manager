import { db, loadModels } from '../database/models/index.js';

async function deleteDuplicateDevices() {
  await loadModels();
  try {
    // Busca todos os devices ordenados por name e id
    const devices = await db.Devices.findAll({ order: [['name', 'ASC'], ['id', 'ASC']] });
    const seen = new Map();
    const duplicates = [];
    for (const device of devices) {
      const key = device.name + '|' + (device.employee || '');
      if (seen.has(key)) {
        duplicates.push(device.id);
      } else {
        seen.set(key, device.id);
      }
    }
    if (duplicates.length > 0) {
      await db.Devices.destroy({ where: { id: duplicates } });
      console.log(`Registros duplicados removidos: ${duplicates.length}`);
    } else {
      console.log('Nenhum registro duplicado encontrado.');
    }
  } catch (err) {
    console.error('Erro ao deletar duplicados:', err.message);
  } finally {
    process.exit(0);
  }
}

deleteDuplicateDevices();
