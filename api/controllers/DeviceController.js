import dotenv from "dotenv";
import { db, loadModels } from "../database/models/index.js";
import jwt from "jsonwebtoken";
import adInit from '../adInit.js';
import { get } from "http";
import fs from "fs";
import path from "path";
dotenv.config();
loadModels(); // Garante que os models estão carregados

const DeviceController = {
    async getAllDevices(req, res) {
        function ipToNumber(ip) {
            if (!ip) return null;
            return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
        }
        try {
            const devices = await db.Devices.findAll();
            // Busca todos os NetworkDatas para mapear ip -> mac
            const networkDatas = await db.NetworkDatas.findAll();
            const ipToMac = {};
            networkDatas.forEach(nd => {
                ipToMac[nd.ip] = nd.mac;
            });
            const devicesWithNetwork = devices.map(device => {
                const d = device.toJSON();
                return {
                    ...d,
                    ipNumber: d.ip ? ipToNumber(d.ip) : null,
                    mac: d.ip && ipToMac[d.ip] ? ipToMac[d.ip] : null
                };
            });
            return res.status(200).json(devicesWithNetwork);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    async getDeviceDetails(req, res) {
        // Corrige __dirname para módulos ES
        let __dirname = path.dirname(new URL(import.meta.url).pathname);
        // Corrige barra extra no Windows
        if (process.platform === 'win32' && __dirname.startsWith('/')) {
            __dirname = __dirname.slice(1);
        }
        const pcsDataPath = path.resolve(__dirname, '../../../PCsData.json');
        try {
            let data = [];
            if (fs.existsSync(pcsDataPath)) {
                const fileContent = fs.readFileSync(pcsDataPath, 'utf8');
                if (fileContent.trim()) {
                    data = JSON.parse(fileContent);
                }
            }
            data.push(req.body);
            fs.writeFileSync(pcsDataPath, JSON.stringify(data, null, 2), 'utf8');
            res.json({ ok: true, message: 'Dados adicionados em PCsData.json' });
        } catch (err) {
            res.status(500).json({ ok: false, message: 'Erro ao salvar dados', error: err.message });
        }
    },


    async editDevice(req, res) {
        try {
            console.log('Requisição recebida para editar device:', req.body);
            const deviceData = req.body;
            const { id, ...fields } = deviceData;
            if (!id) {
                return res.status(400).json({ ok: false, message: 'ID é obrigatório para atualizar o device.' });
            }
            // Filtra apenas campos não nulos
            const updateFields = {};
            for (const [key, value] of Object.entries(fields)) {
                if (value !== null && value !== undefined) {
                    updateFields[key] = value;
                }
            }
            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ ok: false, message: 'Nenhum campo válido para atualizar.' });
            }
            const [updatedRows] = await db.Devices.update(updateFields, { where: { id } });
            if (updatedRows > 0) {
                res.json({ ok: true, message: 'Device atualizado na tabela Devices.' });
            } else {
                res.status(404).json({ ok: false, message: 'Device não encontrado para atualizar.' });
            }
        } catch (err) {
            res.status(500).json({ ok: false, message: 'Erro ao editar device', error: err.message });
        }
    },

    async deleteDevice(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await db.Devices.destroy({ where: { id } });
            if (deletedRows > 0) {
                res.json({ ok: true, message: 'Device deletado com sucesso.' });
            } else {
                res.status(404).json({ ok: false, message: 'Device não encontrado para deletar.' });
            }
        } catch (err) {
            res.status(500).json({ ok: false, message: 'Erro ao deletar device', error: err.message });
        }
    }
};


export default DeviceController;