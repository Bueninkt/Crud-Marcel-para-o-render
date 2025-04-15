/********************************************************
* Objetivo: Controle referente as ações de Crud de Musica
* Data: 11/02/2025
* Autor: Matheus Bueno
* Versão: 1.0
 ********************************************************/

// Import do arquivo de messagens e status code
const message = require('../../mudulo/config.js')

// Import DAO para realizar o include no banco de dados
const instrumentosDAO = require('../../model/DAO/instrumentos.js')


// funçao para atualizar uma Genero
const atualizarInstrumentos = async function(id, instrumentos, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (instrumentos.tipo == '' || 
                instrumentos.tipo == null  ||
                instrumentos.tipo == undefined || 
                instrumentos.tipo.length > 100 || 
                instrumentos.nome == '' || 
                instrumentos.nome == null || 
                instrumentos.nome == undefined || 
                instrumentos.nome.length > 8 ||
                id == '' || 
                id == undefined ||
                id == null ||
                isNaN(id)

            ) 
            {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
            }else{
                // VERIFICA SE O ID EXISTE NO BCD
                let result = await instrumentosDAO.selectByidInstrumentos(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        // adiciona o atributo Do no JSON com os dados recevidos no corpo de requisiição
                        instrumentos.id = id

                        let resultInstrumentos = await instrumentosDAO.updateInstrumentos(instrumentos)
                        
                        if(resultInstrumentos){
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
const inserirInstrumentos = async function (instrumentos, contentType) {
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (instrumentos.tipo == '' || 
                instrumentos.tipo == null  ||
                instrumentos.tipo == undefined || 
                instrumentos.tipo.length > 100 || 
                instrumentos.nome == '' || 
                instrumentos.nome == null || 
                instrumentos.nome == undefined || 
                instrumentos.nome.length > 8 
                
            ) {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
        
            }else{
                // encaminhando os dados da musica para o DAO realizar o insert no Banco de Dados
                let resultGenero = await instrumentosDAO.inserirInstrumentos(instrumentos)
        
                if (resultInstrumentos) 
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

// função para excluir um Genero
const excluirInstrumentos = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS


        }else{
            // Antes de excluir, estamos verificando se existe um ID
            let resultInstrumentos = await instrumentosDAO.selectByidInstrumentos(id)

            if(resultInstrumentos != false || typeof (resultInstrumentos)== 'object'){
                if (resultInstrumentos.length > 0) {
                    
                    let result = await instrumentosDAO.deleteInstrumentos(id)
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
const listarInstrumentos = async function() {
    try {
        let dadosInstrumentos = {}

        let resultInstrumentos = await instrumentosDAO.selectAllInstrumentos()       

        if(resultInstrumentos != false || typeof(resultInstrumentos)== 'object'){

            if(resultInstrumentos.length > 0){
            // cria um JSON para colocar o array de Genero
                dadosInstrumentos.status = true
                dadosInstrumentos.status_code = 200,
                dadosInstrumentos.items = resultInstrumentos.length
                dadosInstrumentos.instrumentos = resultInstrumentos

                return dadosInstrumentos
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
//  funçao para retornar Genero com base no ID
const buscarInstrumentos = async function(id) {
    try {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
    return message.ERROR_REQUIRED_FIELDS
} else {
    
        let dadosInstrumentos = {}

        let resultInstrumentos = await instrumentosDAO.selectByidInstrumentos(id)       

        if(resultInstrumentos != false || typeof(resultInstrumentos) == 'object'){

            if(resultInstrumentos.length > 0){
            // cria um JSON para oclocar o array de  Genero
                dadosGenero.status = true
                dadosGenero.status_code = 200,
                dadosGenero.instrumentos = resultInstrumentos

                return dadosInstrumentos
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
    inserirInstrumentos,
    atualizarInstrumentos, 
    excluirInstrumentos, 
    listarInstrumentos, 
    buscarInstrumentos
}
