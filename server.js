require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'blogger-audio'
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Falha ao enviar o arquivo.' });
        }
        res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro inesperado.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
