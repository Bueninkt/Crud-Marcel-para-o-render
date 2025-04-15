/***************** 
* Objetivo: Criar Crud de dados da tabela de musica do Banco de Dados
* Data: 11/02/2025
* Autor: Matheus
* Versão: 1.0

 ******************************/
// Import Da Biblioteca do prisma cliente para realizar as ações no Banco de Dados
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


// função para inserir uma musica
const InsertMusica = async function(musica){

    try {

    let sql = `Insert into tbl_musica ( nome, 
                                         duracao, 
                                         data_lancamento, 
                                         letra,
                                         link
                                        )
                                        values(
                                            '${musica.nome}',
                                            '${musica.duracao}',
                                            '${musica.data_lancamento}',
                                            '${musica.letra}',
                                            '${musica.link}'         

    )`
// executa o script Mysql, retorna resultado do banco de dados    
// await()
 
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    
    } catch (error) {
        console.log(error)
        return false
    }


}


// funçao para atualizar uma musica existente
const updateMusica = async function(musica){
    try {
        let sql = `update tbl_musica set nome  =  '${musica.nome}',
                                         duracao = '${musica.duracao}',
                                         data_lancamento = '${musica.data_lancamento}',
                                         letra = '${musica.letra}',
                                         link = '${musica.link}'    
                                         Where id = ${musica.id} `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) 
            return true
    
        else
            return false

    } catch (error) {
       return false 
    }
}

// funçao para excluir uma musica existente 
const deleteMusica = async function(id){
    try {
        let sql = `delete from tbl_musica where id = ${id}`

        let resultMusica = await prisma.$executeRawUnsafe(sql)

        if (resultMusica) 
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

// funcao para retornar todas as musica do Banco de Dados
const selectAllMusica = async function(){
    try {
      let sql = 'select * from tbl_musica order by id desc'
    // quando mandar script que devolvem valor usar o query
      let result = await prisma.$queryRawUnsafe(sql)

        if (result) 
            return result
         else 
            return false
        

    } catch (error) {
        return false
    }
}       

// funçao para buscar uma musica pelo ID
const selectByidMusica = async function(id){
    try {
        let sql = `select * from tbl_musica Where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) 
            return result
        else 
            return false
        

    } catch (error) {
        return false
    }
}



module.exports = {
    InsertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByidMusica
}