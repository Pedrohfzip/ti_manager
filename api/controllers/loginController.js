

const LoginController = {

    async login(req, res) {
        const { email, senha } = req.body;
        console.log(email, senha);
        if (email === '' || senha === '') {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        try{
            const user = await User.findOne({ where: { email, senha } });
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }
            return res.status(200).json({ message: 'Login bem-sucedido.', user });
        }catch(err){
            return res.status(500).json({ message: 'Erro no servidor.' });
        }
    }


};


export default LoginController;