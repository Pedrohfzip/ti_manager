import  getNetworkIPs  from '../scripts/getNetworkIPs.js';
import { db } from '../database/models/index.js';
import { main } from '../scripts/scanAndUpdateWithDeviceIp.js';
const NetWorkController = {
    async getNetworkDevices(req, res) {
        function ipToNumber(ip) {
            return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
        }
        try {
            const devices = await db.NetworkDatas.findAll();
            const result = devices.map(d => ({
                ...d.toJSON(),
                ipNumber: ipToNumber(d.ip)
            }));
            return res.json(result);
        } catch (error) {
            console.error('Erro ao buscar dispositivos de rede:', error);
            return res.status(500).json({ error: 'Erro ao buscar dispositivos de rede' });
        }
    },

    async updateDevicesFromNetwork(req, res) {
        try {
            await main();
            return res.json({ message: 'Dispositivos de rede atualizados com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar dispositivos de rede:', error);
            return res.status(500).json({ error: 'Erro ao atualizar dispositivos de rede' });
        }
    }
};

export default NetWorkController;