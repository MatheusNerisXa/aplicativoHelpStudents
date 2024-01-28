const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const model = require('./models');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.post('/createUser', async (req, res) => {
    try {
        let reqs = await model.User.create({
            'name': req.body.nameUser,
            'password': req.body.passwordUser,
            'email': req.body.emailUser,
            'createdAt': new Date(),
            'updatedAt': new Date()
        });
        if (reqs) {
            res.send(JSON.stringify('Usuário cadastrado com sucesso!'));
        }
    } catch (error) {
        console.error('Erro durante o cadastro:', error);
        res.status(500).send(JSON.stringify('Erro durante o cadastro.'));
    }
});

app.post('/login', async (req, res) => {
    try {
        const { nameUser, passwordUser } = req.body;

        // Consulta o banco de dados para encontrar o usuário
        const user = await model.User.findOne({
            where: {
                name: nameUser,
                password: passwordUser
            }
        });

        if (user) {
            res.send(JSON.stringify('Login bem-sucedido!'));
        } else {
            res.status(401).send(JSON.stringify('Credenciais inválidas.'));
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).send(JSON.stringify('Erro durante o login.'));
    }
});

// Start Server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
