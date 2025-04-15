/********************************************************
* Objetivo: Controle referente as ações de Crud de Musica
* Data: 11/02/2025
* Autor: Matheus Bueno
* Versão: 1.0
 ********************************************************/

// Import do arquivo de messagens e status code
const message = require('../../mudulo/config.js')

// Import DAO para realizar o include no banco de dados
const generoDAO = require('../../model/DAO/genero.js')


// funçao para atualizar uma Genero
const atualizarGenero = async function(id, genero, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (genero.tipo_genero == '' || 
                genero.tipo_genero == null  ||
                genero.tipo_genero == undefined || 
                genero.tipo_genero.length > 100 || 
                id == '' || 
                id == undefined ||
                id == null ||
                isNaN(id)

            ) 
            {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
            }else{
                // VERIFICA SE O ID EXISTE NO BCD
                let result = await generoDAO.selectByidGenero(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        // adiciona o atributo Do no JSON com os dados recevidos no corpo de requisiição
                        genero.id = id

                        let resultGenero = await generoDAO.updateGenero(genero)
                        
                        if(resultGenero){
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
const inserirGenero = async function (genero, contentType) {
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (genero.tipo_genero == '' || 
                genero.tipo_genero == null  ||
                genero.tipo_genero == undefined || 
                genero.tipo_genero.length > 100              
            ) {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
        
            }else{
                // encaminhando os dados da musica para o DAO realizar o insert no Banco de Dados
                let resultGenero = await generoDAO.InsertGenero(genero)
        
                if (resultGenero) 
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
const excluirGenero = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS


        }else{
            // Antes de excluir, estamos verificando se existe um ID
            let resultGenero = await generoDAO.selectByidGenero(id)

            if(resultGenero != false || typeof (resultGenero)== 'object'){
                if (resultGenero.length > 0) {
                    
                    let result = await generoDAO.deleteGenero(id)
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
const listarGenero = async function() {
    try {
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()       

        if(resultGenero != false || typeof(resultGenero)== 'object'){

            if(resultGenero.length > 0){
            // cria um JSON para colocar o array de Genero
                dadosGenero.status = true
                dadosGenero.status_code = 200,
                dadosGenero.items = resultGenero.length
                dadosGenero.generos = resultGenero

                return dadosGenero
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
const buscarGenero = async function(id) {
    try {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
    return message.ERROR_REQUIRED_FIELDS
} else {
    
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectByidGenero(id)       

        if(resultGenero != false || typeof(resultGenero) == 'object'){

            if(resultGenero.length > 0){
            // cria um JSON para oclocar o array de  Genero
                dadosGenero.status = true
                dadosGenero.status_code = 200,
                dadosGenero.generos = resultGenero

                return dadosGenero
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
    inserirGenero,
    atualizarGenero, 
    excluirGenero, 
    listarGenero, 
    buscarGenero
}