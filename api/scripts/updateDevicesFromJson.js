import fs from 'fs';
import path from 'path';
import { db, loadModels } from '../database/models/index.js';

async function updateDevicesFromJson() {
  await loadModels();
  const pcsDataPath = path.resolve('../../PCsData.json');
  if (!fs.existsSync(pcsDataPath)) {
    console.error('Arquivo PCsData.json não encontrado!');
    return;
  }
  const fileContent = fs.readFileSync(pcsDataPath, 'utf8');
  let data = [];
  try {
    data = JSON.parse(fileContent);
  } catch (e) {
    console.error('Erro ao fazer parse do JSON:', e.message);
    return;
  }
  for (const device of data) {
    const name = device.hostname;
    const ip = device.ip;
    if (!name) continue;
    try {
      // Busca o device pelo name
      const deviceRow = await db.Devices.findOne({ where: { name } });
      if (deviceRow) {
        deviceRow.ip = ip;
        await deviceRow.save();
        console.log(`Device ${name} atualizado com ip ${ip}.`);
      } else {
        console.log(`Device ${name} não encontrado na tabela Devices.`);
      }
    } catch (err) {
      console.error(`Erro ao atualizar device ${name}:`, err.message);
    }
  }
  process.exit(0);
}

updateDevicesFromJson();
