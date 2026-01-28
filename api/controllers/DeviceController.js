import dotenv from "dotenv";
import { db } from "../database/models/index.js";
import jwt from "jsonwebtoken";
import adInit from '../adInit.js';
import { get } from "http";
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
        console.log(req.body);
        res.json({ ok: true });
    },


    async editDevice(req, res) {
        console.log(req.body);
        res.json({ ok: true });
    },
};


export default DeviceController;