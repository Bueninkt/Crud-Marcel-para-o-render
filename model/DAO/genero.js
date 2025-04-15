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


const InsertGenero = async function(genero){
    try {

        let sql = `Insert into tbl_genero ( tipo_genero
                                            )
                                            values(
                                                '${genero.tipo_genero}'
                                                    
    
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
const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set tipo_genero  =  '${genero.tipo_genero}'`

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
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if (resultGenero) 
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

// funcao para retornar todas as musica do Banco de Dados
const selectAllGenero = async function(){
    try {
        let sql = 'select * from tbl_genero order by id desc'
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
const selectByidGenero = async function(id){
    try {
        let sql = `select * from tbl_genero where id = ${id}`

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
    InsertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByidGenero
}