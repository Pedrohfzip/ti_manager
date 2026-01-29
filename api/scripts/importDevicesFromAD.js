import { db, loadModels } from '../database/models/index.js';
import adInit from '../adInit.js';

async function importDevicesFromAD() {
  await loadModels();
  const client = adInit();
  const opts = {
    filter: '(objectClass=computer)',
    scope: 'sub',
    attributes: [
      'cn',
      'description'
    ]
  };
  const baseDN = 'dc=ezortea,dc=com,dc=br';

  await new Promise((resolve, reject) => {
    client.search(baseDN, opts, (err, res) => {
      if (err) {
        console.error('Erro na busca AD:', err);
        client.unbind();
        return reject(err);
      }
      res.on('searchEntry', async (entry) => {
        const attrs = {};
        entry.attributes.forEach(a => {
          attrs[a.type] = a.vals.length > 1 ? a.vals : a.vals[0];
        });
        if (attrs.cn) {
          let type = null;
          if (typeof attrs.cn === 'string') {
            if (attrs.cn.toUpperCase().startsWith('EZ-LT-')) {
              type = 'Notebook';
            } else if (attrs.cn.toUpperCase().startsWith('EZ-PC-')) {
              type = 'Computador';
            }
          }
          try {
            await db.Devices.create({
              name: attrs.cn,
              employee: attrs.description || null,
              type: type
            });
            console.log(`Device criado: name=${attrs.cn}, employee=${attrs.description || ''}, type=${type || ''}`);
          } catch (e) {
            console.error(`Erro ao criar Device name=${attrs.cn}:`, e.message);
          }
        }
      });
      res.on('end', () => {
        client.unbind();
        resolve();
      });
      res.on('error', (e) => {
        client.unbind();
        reject(e);
      });
    });
  });
  process.exit(0);
}

importDevicesFromAD();
