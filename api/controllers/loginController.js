import dotenv from "dotenv";
import { db } from "../database/models/index.js";
import jwt from "jsonwebtoken";
dotenv.config();

const LoginController = {

    async login(req, res) {
        const { email, password } = req.body;
        console.log("Login attempt with:", email, password);
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        try {
            // Corrigido: senha -> password
            const user = await db.users.findOne({ where: { email, password } });
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "20d"
                }
            );
            console.log(token);
            return res.status(200).json({ 
                message: 'Login bem-sucedido.',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    nome: user?.name // caso exista campo nome
                }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },


    async register(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }
        try {
            const user = db.users.create({
                name: name,
                email: email,
                password: password
            });
            await user.save();
            return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
        }catch (err) {
            return res.status(500).json({ message: err.message });
        }
        
    }


};


export default LoginController;