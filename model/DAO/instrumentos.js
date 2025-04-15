/***************** 
* Objetivo: Criar Crud de dados da tabela de musica do Banco de Dados
* Data: 11/02/2025
* Autor: Matheus
* Versão: 1.0

 ******************************/
// Import Da Biblioteca do prisma cliente para realizar as ações no Banco de Dados

// função para inserir uma musica

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


const InsertInstrumentos = async function(instrumentos){
    try {

        let sql = `Insert into tbl_instrumentos ( tipo,
                                                nome
                                            )
                                            values(
                                                '${instrumentos.tipo}',
                                                '${instrumentos.nome}'
                                                    
    
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
const updateInstrumentos = async function(instrumentos){
    try {
        let sql = `update tbl_genero set tipo_instrumentos  =  '${instrumentos.tipo_genero}'`

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
const deleteInstrumentos = async function(id){
    try {
        let sql = `delete from tbl_instrumentos where id = ${id}`

        let resultInstrumentos = await prisma.$executeRawUnsafe(sql)

        if (resultInstrumentos) 
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

// funcao para retornar todas as musica do Banco de Dados
const selectAllInstrumentos = async function(){
    try {
        let sql = 'select * from tbl_instrumentos order by id desc'
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
const selectByidInstrumentos = async function(id){
    try {
        let sql = `select * from tbl_instrumentos where id = ${id}`

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
    InsertInstrumentos,
    updateInstrumentos,
    deleteInstrumentos,
    selectAllInstrumentos,
    selectByidInstrumentos
}