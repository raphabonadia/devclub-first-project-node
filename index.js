
const express = require("express")
const uuid = require("uuid") // Biblioteca que cria um ID unico e universal
const port = 3000
const app = express()
app.use(express.json()) 
 /* Padrão para avisar o EXPRESS que quero usar o JSON no meu BODY,
    SEMPRE COLOCAR ESSA FUNÇÃO EM CIMA, O NODE EXECUTA DE CIMA PRA BAIXO,
    SEMPRE USAR ANTES DAS ROTAS.
    use = ferramenta interna do EXPRESS
 - query params => meusite.com/users?nome=raphael&age=39  // Filtros
 - Route params => /users/2    // Buscar, Deletar ou Atualizar algo específico
 - Request Body => {"name": "Raphael", "age":} - formato JSON

 - GET         => Buscar informação no Back-End
 - POST        => Criar informação no Back-End
 - PUT / PATCH => Alterar / Atualizar informação no Back-End
 - DELETE      => Deletar informação no Back-End

 - Middlewares => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição,
                                   ele é chamado antes das minhas Rotas.
     */

const users = []
const checkUserId = (request, response, next) =>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0 ){
        return response.status(404).json({Error:"User not found"})
    }

    request.userIndex = index 
    request.userId = id
    next()

}

app.get("/users", (request, response) => {
    
          
    return response.json(users)
}) 

app.post("/users", (request, response) => {
    const {name,age} = request.body
    
    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
}) 

app.put("/users/:id", checkUserId, (request, response) => {
    
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = {id, name, age}
      
    users[index] = updatedUser
          
    return response.json(updatedUser)
}) 

app.delete("/users/:id", checkUserId, (request, response) => {
    const index = request.userIndex
    
    users.splice(index,1)
          
    return response.status(204).json()
}) 











app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

