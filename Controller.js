const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const model = require('./models');
const { News } = require('./models');
const { Video } = require('./models');
const {Subject} = require('./models');


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
        const { emailUser, passwordUser, nameUser } = req.body;

        const user = await model.User.findOne({
            where: {
                email: emailUser,
            }
        });

        if (user) {
            // Comparar a senha criptografada
            const match = await bcrypt.compare(passwordUser, user.password);

            if (match) {
                res.send(JSON.stringify({ message: 'Login bem-sucedido!', user: { name: user.name } }));
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

app.get('/entranceExams', async (req, res) => {
    try {
        console.log('Recebida requisição para /entranceExams');
        const entranceExams = await model.EntranceExam.findAll();
        console.log('Vestibulares obtidos com sucesso:', entranceExams);
        res.json(entranceExams);
    } catch (error) {
        console.error('Erro ao obter vestibulares:', error);
        res.status(500).json({ error: 'Erro ao obter vestibulares.' });
    }
});

app.get('/subjects', async (req, res) => {
    try {
        console.log('Recebida requisição para /subjects');
        const userId = req.query.userId; // Obtenha o userId do parâmetro de consulta

        // Verifique se o userId foi fornecido
        if (!userId) {
            return res.status(400).json({ error: 'O parâmetro de consulta "userId" é obrigatório.' });
        }

        const subjects = await Subject.findAll({
            where: {
                userId: userId, // Filtrar matérias por userId
            }
        });

        console.log('Matérias obtidas com sucesso:', subjects);
        res.json(subjects);
    } catch (error) {
        console.error('Erro ao obter matérias:', error);
        res.status(500).json({ error: 'Erro ao obter matérias.' });
    }
});


// Rota para criar uma nova matéria (subject)
app.post('/createSubject', async (req, res) => {
    try {
        console.log('Recebida requisição para criar uma nova matéria:', req.body);

        const newSubject = await Subject.create({
            name: req.body.name,
            professor: req.body.professor,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            days: JSON.stringify(req.body.days),
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            userId: req.body.userId
        });

        console.log('Nova matéria criada com sucesso:', newSubject);

        if (newSubject) {
            res.status(201).json({ message: 'Matéria criada com sucesso!' });
        } else {
            console.log('Erro: A nova matéria não foi criada.');
            res.status(500).json({ error: 'Erro ao criar a matéria.' });
        }
    } catch (error) {
        console.error('Erro durante a criação da matéria:', error);
        res.status(500).json({ error: 'Erro durante a criação da matéria.' });
    }
});


app.get('/getUserId', async (req, res) => {
    try {
        // Obtenha o email do parâmetro de consulta
        const userEmail = req.query.email;

        // Verifique se o email foi fornecido
        if (!userEmail) {
            return res.status(400).json({ error: 'O parâmetro de consulta "email" é obrigatório.' });
        }

        // Busque o usuário com base no email
        const user = await model.User.findOne({
            where: {
                email: userEmail,
            }
        });

        // Verifique se o usuário foi encontrado
        if (user) {
            // Retorne o ID do usuário encontrado
            return res.json({ userId: user.id });
        } else {
            // Se o usuário não for encontrado, retorne um erro
            return res.status(404).json({ error: 'Usuário não encontrado para o email fornecido.' });
        }
    } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
        return res.status(500).json({ error: 'Erro ao obter o ID do usuário.' });
    }
});



// Start Server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
