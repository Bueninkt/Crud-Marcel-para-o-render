/**************************************************
* Objetivo: Arquivo responsavel pela padronização de mensagens e status code
* Data: 11/02/2025
* Autor: Matheus
* Versão: 1.0

 ****************************************************/

/***************************STATUS CODE DE ERRO******************/

const ERROR_REQUIRED_FIELDS = {
    status: false, 
    status_code: 400, 
    message: 'Existem campos de preenchimento obrigatórios ou quantidade de caracteres que não foram atentidos na requisição'



}

/***************************STATUS CODE DE ERRO******************/

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false, status_code: 500,
    message: 'Devido a um erro interno no servidor da MODEL, nao foi possivel processar a requisição '
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false, status_code: 500,
    message: 'Devido a um erro interno no servidor da CONTROLLER, nao foi possivel processar a requisição '
}


const ERROR_CONTENT_TYPE = {
    status: false, status_code: 415,
    message: 'O content-type encaminhado não é encaminhado não é suportado pelo servidor, voce deve encaminhar apenas conteudo no formato de servidor'
}

const ERROR_CONTENT_NOT_FOUND = {
    status: false, status_code: 400,
    message: 'Não foram encontrados itens de retorno'
}

/***************************STATUS CODE DE SUCESSO ******************/
const SUCESS_CREATED_ITEM = {
    status: true, 
    status_code: 201, 
    message: 'Item criado com sucesso'
}
const SUCESS_DELETE_ITEM = {
    status: true, 
    status_code: 200, 
    message: 'Item deletado com sucesso'
}
const SUCESS_UPDATE_ITEM = {
    status: true, 
    status_code: 200, 
    message: 'Item Atualizado com sucesso'
}



module.exports = {
    ERROR_REQUIRED_FIELDS, 
    SUCESS_CREATED_ITEM,
    SUCESS_DELETE_ITEM,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_CONTENT_NOT_FOUND,
    SUCESS_UPDATE_ITEM

}