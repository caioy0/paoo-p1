// src/news/index.js
// Exercicio 3: 
// Consulta de notícias sobre uma cidade
// Utilizando o serviço a seguir, seu sistema deve fazer uma consulta que
// - envia o nome de uma cidade
// - obtém notícias sobre aquela cidade

require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

// Link
const PROTOCOL = process.env.PROTOCOL;
const BASE_URL3 = process.env.BASE_URL3;
const NEWSAPI = process.env.NEWSAPI;
const CIDADE = 'Sao Paulo'; 

// URL
const URL = `${PROTOCOL}://${BASE_URL3}?q=${CIDADE}&apiKey=${NEWSAPI}&language=pt&pageSize=2`;

async function getCondicoes(){
  try{
    const res = await axios.get(URL); 
    console.log(res.data);
    
    } catch(erro){
        console.log(`Erro: ${erro}`);
    }
}
// exec
getCondicoes();