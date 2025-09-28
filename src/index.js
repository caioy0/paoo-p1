// src/index.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

// dotenv
const PROTOCOL = process.env.PROTOCOL;
const BASE_URL = process.env.BASE_URL;
const BASE_URL2 = process.env.BASE_URL2;
const BASE_URL3 = process.env.BASE_URL3;
const APPID = process.env.APPID;
const LIMIT = process.env.LIMIT;
const NEWSAPI = process.env.NEWSAPI;

// EX 1 : Lat e Lon
app.get('/:city/coordenadas', (req, res) => {
  const cidadeParam = req.params.city;
  const URL = `${PROTOCOL}://${BASE_URL}?appid=${APPID}&q=${cidadeParam}&limit=${LIMIT}`;
  
  const promiseResult = axios.get(URL);
  promiseResult
    .then(res2 => {
      const cidade = res2.data[0];
      console.log(`Ex1:`); 
      console.log(`Cidade: ${cidade.name}`); 
      console.log(`Latitude: ${cidade.lat}`);
      console.log(`Longitude: ${cidade.lon}`);

      // https://expressjs.com/pt-br/api.html#res.json <- como eu formatei o json
      res.status(200).json({
        cidade: cidade.name,
        pais: cidade.country,
        latitude: cidade.lat,
        longitude: cidade.lon
      });
    })
    .catch(erro => {
      res.status(500).json({ erro: erro.message });
    });
});
  
// EX 2 : lat+lon = status da cordenada 
app.get('/:city/weather', async (req, res) => {
  try {
    const cidadeParam = req.params.city;

    // Pega coordenadas
    const URL = `${PROTOCOL}://${BASE_URL}?appid=${APPID}&q=${cidadeParam}&limit=${LIMIT}`;
    const res2 = await axios.get(URL);
    const cidade = res2.data[0];

    // Obter clima
    const URL2 = `${PROTOCOL}://${BASE_URL2}?appid=${APPID}&lat=${cidade.lat}&lon=${cidade.lon}&units=metric&lang=pt_br`;
    const res3 = await axios.get(URL2);

    console.log(`Ex2:`);
    console.log(`Sensacao termica: ${res3.data.main.feels_like}`);
    console.log(`Descricao: ${res3.data.weather[0].description}`);

    // Enviar resposta correta
    res.status(200).json({
      sensacao_termica: res3.data.main.feels_like,
      descricao: res3.data.weather[0].description
    });

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});
  
// EX 3 : API News
app.get('/:city/news', async (req, res) => {
  try {
    const cidadeParam = req.params.city;
    const URL3 = `${PROTOCOL}://${BASE_URL3}?q=${cidadeParam}&apiKey=${NEWSAPI}&language=pt&pageSize=2`;
    const res2 = await axios.get(URL3); 
    console.log(res2.data);

    res.status(200).json({
      cidade: cidadeParam,
      noticias: res2.data.articles
    });

    } catch (erro) {
      console.log(`erro: ${erro}`)
      res.status(500).json({ erro: erro.message });
    }
});

// API route completa
app.get ('/:city', async function getCidade(req, res) {
  try {
    const cidadeParam = req.params.city;
    const URL = `${PROTOCOL}://${BASE_URL}?appid=${APPID}&q=${cidadeParam}&limit=${LIMIT}`;
    const res2 = await axios.get(URL);
    const cidade = res2.data[0];
    const URL2 = `${PROTOCOL}://${BASE_URL2}?appid=${APPID}&lat=${cidade.lat}&lon=${cidade.lon}&units=metric&lang=pt_br`;
    const res3 = await axios.get(URL2);
    const URL3 = `${PROTOCOL}://${BASE_URL3}?q=${cidadeParam}&apiKey=${NEWSAPI}&language=pt&pageSize=2`;
    const res4 = await axios.get(URL3); 

    console.log(res4.data);
    console.log(`Cidade: ${cidade.name}`); 
    console.log(`Latitude: ${cidade.lat}`);
    console.log(`Longitude: ${cidade.lon}`);
    console.log(`Sensacao termica: ${res3.data.main.feels_like}`);
    console.log(`Descricao: ${res3.data.weather[0].description}`);

    res.status(200).json({
        cidade: cidade.name,
        pais: cidade.country,
        latitude: cidade.lat,
        longitude: cidade.lon,
        sensacao_termica: res3.data.main.feels_like,
        descricao: res3.data.weather[0].description,
        noticias: res4.data.articles
      });

  } catch (error) {
    console.log(`Erro: ${error}`);
  }  
})

// Express
const port = 4000;
app.listen(port, () => console.log(`Projeto P1; porta: ${port}`));