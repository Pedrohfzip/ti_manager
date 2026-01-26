import dotenv from "dotenv";
import { db } from "../database/models/index.js";
import jwt from "jsonwebtoken";
dotenv.config();

const LoginController = {

    async login(req, res) {
        const { email, senha } = req.body;
        if (email === '' || senha === '') {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }
        
        try{
            const user = await db.users.findAll({ where: { email, password } });
            console.log(user);
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
            return res.status(200).json({ message: 'Login bem-sucedido.'});
        }catch(err){
            return res.status(500).json({ message: err.message });
        }
    }


};


export default LoginController;