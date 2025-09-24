// "Import"
require('dotenv').config({ path: '../.env' });
const axios = require('axios')

// Link
const PROTOCOL = process.env.PROTOCOL
const BASE_URL = process.env.BASE_URL
const APPID = process.env.APPID
const Q = process.env.Q
const LIMIT = process.env.LIMIT
// Url
const URL = `${PROTOCOL}://${BASE_URL}?appid=${APPID}&q=${Q}&limit=${LIMIT}`
// console.log('URL: ', URL);

// axios retorna promise
const promiseResult = axios.get(URL)
// res e erro sao objeto
promiseResult.then((res)=> {console.log(res.data);}) // .data conteudo json
.catch(erro=>console.log(`erro: ${erro}`));