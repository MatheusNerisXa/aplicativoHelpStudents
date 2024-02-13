const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const model = require('./models');
const { News } = require('./models');
const { Video } = require('./models');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contatohelpstudent@gmail.com',
        pass: 'bmsl vbst vknb xfel'
    }
});

// Rounds de salt para a função bcrypt
const saltRounds = 10;

// Routes
app.post('/createUser', async (req, res) => {
    try {
        // Criptografar a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(req.body.passwordUser, saltRounds);

        let reqs = await model.User.create({
            'name': req.body.nameUser,
            'password': hashedPassword,
            'email': req.body.emailUser,
            'createdAt': new Date(),
            'updatedAt': new Date()
        });

        if (reqs) {
            // Envie o e-mail de boas-vindas
            const mailOptions = {
                from: 'contatohelpstudent@gmail.com',
                to: req.body.emailUser,
                subject: 'Bem-vindo ao Seu App!',
                text: 'Obrigado por se cadastrar. Bem-vindo!'
            };

            await transporter.sendMail(mailOptions);

            res.send(JSON.stringify('Usuário cadastrado com sucesso!'));
        }
    } catch (error) {
        console.error('Erro durante o cadastro:', error);
        res.status(500).send(JSON.stringify('Erro durante o cadastro.'));
    }
});

app.post('/login', async (req, res) => {
    try {
        const { emailUser, passwordUser } = req.body;

        const user = await model.User.findOne({
            where: {
                email: emailUser,
            }
        });

        if (user) {
            // Comparar a senha criptografada
            const match = await bcrypt.compare(passwordUser, user.password);

            if (match) {
                res.send(JSON.stringify('Login bem-sucedido!'));
            } else {
                res.status(401).send(JSON.stringify('Credenciais inválidas.'));
            }
        } else {
            res.status(401).send(JSON.stringify('Credenciais inválidas.'));
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).send(JSON.stringify('Erro durante o login.'));
    }
});

app.get('/news', async (req, res) => {
    try {
        console.log('Recebida requisição para /news');
        const news = await News.findAll();
        console.log('Notícias obtidas com sucesso:', news);
        res.json(news);
    } catch (error) {
        console.error('Erro ao obter notícias:', error);
        res.status(500).json({ error: 'Erro ao obter notícias.' });
    }
});

app.get('/videos', async (req, res) => {
    try {
        console.log('Recebida requisição para /videos');
        const videos = await Video.findAll();
        console.log('Vídeos obtidos com sucesso:', videos);
        res.json(videos);
    } catch (error) {
        console.error('Erro ao obter vídeos:', error);
        res.status(500).json({ error: 'Erro ao obter vídeos.' });
    }
});

// Start Server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
