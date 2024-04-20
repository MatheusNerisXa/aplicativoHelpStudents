const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const model = require('./models');
const { News } = require('./models');
const { Video } = require('./models');
const {Subject} = require('./models');
const { Op } = require('sequelize');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do Multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/files'); // O diretório onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo após o upload
    }
  });
  
  const upload = multer({ storage: storage });


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
            res.status(201).json({ message: 'Matéria criada com sucesso!', subjectId: newSubject.id });
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


app.get('/subjectsByDay', async (req, res) => {
    try {
        const userId = req.query.userId;
        const day = req.query.day;

        if (!userId || !day) {
            return res.status(400).json({ error: 'Os parâmetros "userId" e "day" são obrigatórios.' });
        }

        const subjects = await Subject.findAll({
            where: {
                userId: userId,
                days: { [Op.like]: `%${day}%` } // Use uma operação LIKE para encontrar as matérias que possuem o dia específico
            }
        });

        console.log('Matérias do usuário para o dia', day, ':', subjects);
        res.json(subjects);
    } catch (error) {
        console.error('Erro ao obter matérias do usuário para o dia específico:', error);
        res.status(500).json({ error: 'Erro ao obter matérias do usuário para o dia específico.' });
    }
});

// Recuperação de todos os Banners para exibição no aplicativo
app.get('/banners', async (req, res) => {
    try {
        console.log('Recebida requisição para /banners');
        const banners = await model.Banner.findAll();
        console.log('Banners obtidos com sucesso:', banners);
        res.json(banners);
    } catch (error) {
        console.error('Erro ao obter banners:', error);
        res.status(500).json({ error: 'Erro ao obter banners.' });
    }
});

app.get('/studyTips', async (req, res) => {
    try {
        console.log('Recebida requisição para /studyTips');
        const studyTips = await model.StudyTip.findAll();
        console.log('Dicas de estudo obtidas com sucesso:', studyTips);
        res.json(studyTips);
    } catch (error) {
        console.error('Erro ao obter dicas de estudo:', error);
        res.status(500).json({ error: 'Erro ao obter dicas de estudo.' });
    }
});

app.get('/stopwatches', async (req, res) => {
    try {
        console.log('Recebida requisição para /stopwatches');
        const stopwatches = await model.Stopwatch.findAll();
        console.log('Cronômetros obtidos com sucesso:', stopwatches);
        res.json(stopwatches);
    } catch (error) {
        console.error('Erro ao obter cronômetros:', error);
        res.status(500).json({ error: 'Erro ao obter cronômetros.' });
    }
});

app.post('/stopwatches', async (req, res) => {
    try {
        console.log('Recebida requisição para criar um novo cronômetro');
        const { description, subjectId, time, userId } = req.body;

        // Verificar se todos os campos obrigatórios foram fornecidos
        if (!description || !subjectId || !time || !userId) {
            return res.status(400).json({ error: 'Descrição, subjectId, tempo e userId são obrigatórios.' });
        }

        // Criar o cronômetro no banco de dados
        const stopwatch = await model.Stopwatch.create({ description, subjectId, time, userId });

        console.log('Cronômetro criado com sucesso:', stopwatch);
        res.status(201).json(stopwatch);
    } catch (error) {
        console.error('Erro ao criar o cronômetro:', error);
        res.status(500).json({ error: 'Erro ao criar o cronômetro.' });
    }
});

app.get('/stopwatches/:userId', async (req, res) => {
    try {
        console.log('Recebida requisição para buscar cronômetros do usuário com ID:', req.params.userId);
        const userId = req.params.userId;

        // Verificar se o ID do usuário foi fornecido
        if (!userId) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório.' });
        }

        // Recuperar os cronômetros do usuário do banco de dados
        const stopwatches = await model.Stopwatch.findAll({ where: { userId } });

        console.log('Cronômetros do usuário encontrados:', stopwatches);
        res.status(200).json(stopwatches);
    } catch (error) {
        console.error('Erro ao buscar cronômetros do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar cronômetros do usuário.' });
    }
});

app.delete('/stopwatches/:stopwatchId', async (req, res) => {
    try {
        console.log('Recebida requisição para excluir um cronômetro');
        const stopwatchId = req.params.stopwatchId;

        // Verificar se o ID do cronômetro foi fornecido
        if (!stopwatchId) {
            return res.status(400).json({ error: 'ID do cronômetro é obrigatório.' });
        }

        // Verificar se o cronômetro existe no banco de dados
        const existingStopwatch = await model.Stopwatch.findByPk(stopwatchId);
        if (!existingStopwatch) {
            return res.status(404).json({ error: 'Cronômetro não encontrado.' });
        }

        // Excluir o cronômetro do banco de dados
        await model.Stopwatch.destroy({ where: { id: stopwatchId } });

        console.log('Cronômetro excluído com sucesso');
        res.status(204).send(); // Retorna uma resposta de sucesso sem conteúdo
    } catch (error) {
        console.error('Erro ao excluir o cronômetro:', error);
        res.status(500).json({ error: 'Erro ao excluir o cronômetro.' });
    }
});

app.post('/uploadPhoto', upload.array('photo', 10), async (req, res) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        }
        
        const fileDetails = [];

        for (const file of files) {
            const filePath = file.path;
            const fileName = file.filename;
            const description = req.body.description;
            const subjectId = req.body.subjectId;

            // Salvar os detalhes do arquivo na tabela Files
            const newFile = await model.File.create({
                description: description,
                url: filePath,
                subjectId: subjectId // Associa o arquivo à matéria específica
            });

            fileDetails.push(newFile);
        }

        res.status(200).json({ message: 'Fotos enviadas com sucesso.', fileDetails: fileDetails });
    } catch (error) {
        console.error('Erro durante o upload de fotos:', error);
        res.status(500).json({ error: 'Erro durante o upload de fotos.' });
    }
});

// Rota para exibir todos os arquivos associados a um subjectId específico
app.get('/files/:subjectId', async (req, res) => {
    try {
      const subjectId = req.params.subjectId;
  
      if (!subjectId) {
        return res.status(400).json({ error: 'O parâmetro "subjectId" é obrigatório.' });
      }
  
      // Consultar todos os arquivos associados ao subjectId fornecido
      const files = await model.File.findAll({
        where: {
          subjectId: subjectId
        }
      });
  
      if (files.length === 0) {
        return res.status(404).json({ error: 'Nenhum arquivo encontrado para o subjectId fornecido.' });
      }
  
      res.json(files);
    } catch (error) {
      console.error('Erro ao obter arquivos por subjectId:', error);
      res.status(500).json({ error: 'Erro ao obter arquivos por subjectId.' });
    }
  });
  
// Start Server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
