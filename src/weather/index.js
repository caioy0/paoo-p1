// src/weather/index.js -> Exercicios 1 e 2
// Exercicio 1:
// Consulta de coordenadas latitude/longitude em função do nome de uma cidade
// Utilizando o serviço a seguir, seu sistema deve fazer uma consulta em que
// - envia o nome de uma cidade
// - obtém as coordenadas latitude/longitude dessa cidade

require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

// Link
const PROTOCOL = process.env.PROTOCOL;
const BASE_URL = process.env.BASE_URL;
const BASE_URL2 = process.env.BASE_URL2;
const APPID = process.env.APPID;
const LIMIT = process.env.LIMIT;
const Q = process.env.Q; 

// Url
const URL = `${PROTOCOL}://${BASE_URL}?appid=${APPID}&q=${Q}&limit=${LIMIT}`;
// console.log('URL: ', URL);

// axios retorna promise (classe)
const promiseResult = axios.get(URL);
// res e erro sao objeto
promiseResult
    .then((res)=> {
      // console.log(res.data); // .data conteudo json
      console.log(`Ex1:`); 
      console.log(`Cidade: ${res.data[0].name}`); 
      console.log(`Latitude: ${res.data[0].lat}`); 
      console.log(`Longitude: ${res.data[0].lon}`); 
    }) 
    .catch(erro=>console.log(`erro: ${erro}`));
    
// ------------------------------  
// Exercicio 2
// Consulta de condições atuais em função de latitude/longitude
// Utilizando o serviço a seguir, seu sistema deve fazer uma consulta em que
// - envia as coordenadas latitude/longitude obtidas anteriormente
// - obtém a sensação térmica (feels_like) e descrição (description)

async function getCondicoes(){
  try{
    const res = await axios.get(URL); // refazer promise
    const cidade = res.data[0]; // pegar data do ex1 e converter
    const LAT = cidade.lat; // ou const LAT = res.data[0].lat;
    const LON = cidade.lon;

    const URL2 = `${PROTOCOL}://${BASE_URL2}?appid=${APPID}&lat=${LAT}&lon=${LON}&units=metric&lang=pt_br`;
    
    const res2 = await axios.get(URL2);
    // console.log(res2.data);
    console.log(`Ex2:`);
    console.log(`Sensacao termica: ${res2.data.main.feels_like}`);
    console.log(`Descricao: ${res2.data.weather[0].description}`);
    
    } catch(erro){
        console.log(`Erro: ${erro}`);
    }
}
// exec
getCondicoes();

// JSON: key(string)
// value: dados 
// object{}+array{}