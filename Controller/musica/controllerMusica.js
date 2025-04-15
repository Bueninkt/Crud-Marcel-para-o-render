/********************************************************
* Objetivo: Controle referente as ações de Crud de Musica
* Data: 11/02/2025
* Autor: Matheus Bueno
* Versão: 1.0
 ********************************************************/

// Import do arquivo de messagens e status code
const message = require('../../mudulo/config.js')

// Import DAO para realizar o include no banco de dados
const musicaDAO = require('../../model/DAO/musica.js')


// funçao para atualizar uma musica
const atualizarMusica = async function(id, musica, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (musica.nome == '' || 
                musica.nome == null  ||
                musica.nome == undefined || 
                musica.nome.length > 100 || 
                musica.duracao == '' || 
                musica.duracao == null || 
                musica.duracao == undefined || 
                musica.duracao.length > 8 ||
                musica.data_lancamento == null || 
                musica.data_lancamento == undefined || 
                musica.data_lancamento.length > 50 ||
                musica.letra == undefined || 
                musica.link == undefined || 
                musica.link.length > 200 ||
                id == '' || 
                id == undefined ||
                id == null ||
                isNaN(id)

            ) 
            {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
            }else{
                // VERIFICA SE O ID EXISTE NO BCD
                let result = await musicaDAO.selectByidMusica(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        // adiciona o atributo Do no JSON com os dados recevidos no corpo de requisiição
                        musica.id = id

                        let resultMusica = await musicaDAO.updateMusica(musica)
                        
                        if(resultMusica){
                            return message.SUCESS_UPDATE_ITEM
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return message.ERROR_CONTENT_NOT_FOUND
                    }
                }
            }  

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}







// funcao para inserir uma musica
const inserirMusica = async function (musica, contentType) {
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (musica.nome == '' || 
                musica.nome == null  ||
                musica.nome == undefined || 
                musica.nome.length > 100 || 
                musica.duracao == '' || 
                musica.duracao == null || 
                musica.duracao == undefined || 
                musica.duracao.length > 8 ||
                musica.data_lancamento == null || 
                musica.data_lancamento == undefined || 
                musica.data_lancamento.length > 50 ||
                musica.letra == undefined || 
                musica.link == undefined || 
                musica.link.length > 200
            ) {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
        
            }else{
                // encaminhando os dados da musica para o DAO realizar o insert no Banco de Dados
                let resultMusica = await musicaDAO.InsertMusica(musica)
        
                if (resultMusica) 
                    return message.SUCESS_CREATED_ITEM
                    
                    
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
                
            }
        }else{
          return message.ERROR_CONTENT_TYPE//415  
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
   

}

// função para excluir uma musica
const excluirMusica = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS


        }else{
            // Antes de excluir, estamos verificando se existe um ID
            let resultMusica = await musicaDAO.selectByidMusica(id)

            if(resultMusica != false || typeof (resultMusica)== 'object'){
                if (resultMusica.length > 0) {
                    
                    let result = await musicaDAO.deleteMusica(id)
                        if (result) 
                            return message.SUCESS_DELETE_ITEM

                        else
                            return message.ERROR_INTERNAL_SERVER_CONTROLLER
                            
                } else {
                    return message.ERROR_CONTENT_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

// funçao para retornar uma lista de musicas
const listarMusica = async function() {
    try {
        let dadosMusica = {}

        let resultMusica = await musicaDAO.selectAllMusica()       

        if(resultMusica != false || typeof(resultMusica)== 'object'){

            if(resultMusica.length > 0){
            // cria um JSON para colocar o array de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica

                return dadosMusica
        }else{
            return message.ERROR_CONTENT_NOT_FOUND//404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_MODEL//500
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    } 
}
//  funçao para retornar musica com base no ID
const buscarMusica = async function(id) {
    try {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
    return message.ERROR_REQUIRED_FIELDS
} else {
    
        let dadosMusica = {}

        let resultMusica = await musicaDAO.selectByidMusica(id)       

        if(resultMusica != false || typeof(resultMusica) == 'object'){

            if(resultMusica.length > 0){
            // cria um JSON para oclocar o array de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.musics = resultMusica

                return dadosMusica
        }else{
            return message.ERROR_CONTENT_NOT_FOUND//404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_MODEL//500
    }}

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

module.exports = {
    inserirMusica,
    atualizarMusica, 
    excluirMusica, 
    listarMusica, 
    buscarMusica
}