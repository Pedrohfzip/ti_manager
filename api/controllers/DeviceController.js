import dotenv from "dotenv";
import { db } from "../database/models/index.js";
import jwt from "jsonwebtoken";
import adInit from '../adInit.js';
import { get } from "http";
import fs from "fs";
import path from "path";
dotenv.config();


const DeviceController = {
    async getAllDevices(req, res) {
        try {
            const devices = await db.Devices.findAll();
            return res.status(200).json(devices);
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
        console.log(req.body);
        res.json({ ok: true });
    },
};


export default DeviceController;