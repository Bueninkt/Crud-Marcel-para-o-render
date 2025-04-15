/************************************************************
* Objetivo: Criar Api para interagir com o Banco de Dados
* Data: 11/02/2025
* Autor: Matheus
* Versão: 1.0
* Observações: 
    Para criar a API precisa INSTALAR: 
                * express
                * cors 
                * body-parser

    Para criar a conexão com banco de Dados precisa INSTALAR:
                *   prisma             npm install prisma --save
                *   @prisma/client     npm install @prisma/client --save
                *   prisma init        npx prisma init 
                *   Configurar o arquivo .env, schema
                *   npx prisma migrate dev

***************************************************************/



// importe das controles do projeto

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const controllerMusica = require('./Controller/musica/controllerMusica.js')
const controllerGenero = require('./Controller/genero/controllerGenero.js')
const controllerInstrumentos = require('./Controller/instrumentos/controllerInstrumentos.js')

//Cria um objeto para o body do tipo JSON
const bodyParserJSON = bodyParser.json()

// Inicializando a utilização do '(express)' através da variavel app
const app = express()


app.use((request, response, next)=>{
    //permissão de acesso para quem irá criar a API
    response.header('Acess-Control-Allow-Origin', '*')
    //permissão de acesso para os metodos da api
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ')
    //ativa as configurações do header para o cors 
    app.use(cors())

    next()
})

// Endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors() , bodyParserJSON, async function (request, response) {

    // Recebe o contentType da requisicao
    let contentType = request.headers['content-type']

    // recebe os dados do body, o que foi encaminhado do banco
    let dadosBody = request.body

    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

app.get('/v1/controle-musicas/musicas', cors(), async function(request, response) {
    let resultMusica = await controllerMusica.listarMusica()
    
    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
   

app.get('/v1/controle-musicas/musicas/:id', cors(), async function (request, response) {
    
    //  recebe o ID
    let idMusica = request.params.id


    // Chama A a função
    let resultMusica = await controllerMusica.buscarMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})


app.delete('/v1/controle-musicas/musicas/:id', cors(), async function (request, response){
    let idMusica = request.params.id

    let resultMusica = await controllerMusica.excluirMusica(idMusica)
    
    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o ID da musica
    let idMusica = request.params.id

    // Recebe o contentType da requisiçõa
    let contentType = request.headers['content-type']

    // Recebe os dados do corpo da requisição
    let dadosBody = request.body

    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})
/************************************************************************************ */

// Genero

app.post('/v1/controle-generos/genero', cors() , bodyParserJSON, async function (request, response) {

    // Recebe o contentType da requisicao
    let contentType = request.headers['content-type']

    // recebe os dados do body, o que foi encaminhado do banco
    let dadosBody = request.body

    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

app.get('/v1/controle-generos/generos', cors(), async function(request, response) {
    let resultGenero = await controllerGenero.listarGenero()
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
   

app.get('/v1/controle-generos/generos/:id', cors(), async function (request, response) {
    
    //  recebe o ID
    let idGenero = request.params.id


    // Chama A a função
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})


app.delete('/v1/controle-generos/generos/:id', cors(), async function (request, response){
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-generos/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o ID da musica
    let idGenero = request.params.id

    // Recebe o contentType da requisiçõa
    let contentType = request.headers['content-type']

    // Recebe os dados do corpo da requisição
    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})


/************************************************************************************************************************/ 

// Instrumentos

app.post('/v1/controle-instrumentos/instrumentos', cors() , bodyParserJSON, async function (request, response) {

    // Recebe o contentType da requisicao
    let contentType = request.headers['content-type']

    // recebe os dados do body, o que foi encaminhado do banco
    let dadosBody = request.body

    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

app.get('/v1/controle-generos/generos', cors(), async function(request, response) {
    let resultGenero = await controllerGenero.listarGenero()
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
   

app.get('/v1/controle-generos/generos/:id', cors(), async function (request, response) {
    
    //  recebe o ID
    let idGenero = request.params.id


    // Chama A a função
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})


app.delete('/v1/controle-generos/generos/:id', cors(), async function (request, response){
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-generos/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o ID da musica
    let idGenero = request.params.id

    // Recebe o contentType da requisiçõa
    let contentType = request.headers['content-type']

    // Recebe os dados do corpo da requisição
    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})





app.listen(8080, function(){
    console.log('API aguardando requisições...')
})


 









