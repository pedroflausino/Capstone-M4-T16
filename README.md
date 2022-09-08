![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

# Capstone-M4 | 🏁 Projeto final referente ao módulo 4 

## ✔️ Técnicas e tecnologias utilizadas
 - `Node` 
 - `TypeScript`
 - `Express`
 - `TypeORM`
## 📁 Descrição do projeto 
<p> Projeto em desenvolvimento para a finalização do módulo 4 do curso de Desenvolvedor Web FullStack da Kenzie Academy Brasil. Se trata de uma aplicação de delivery de alimentos com objetivo de combater o desperdício de alimentos.</p>


## 🔨 Requisitos do Serviço 


### `POST - /users`

Rota para criação de usuários com os seguintes dados:
- `name`: string
- `email`: string
- `password`: Deverá receber uma string mas armazenar uma hash gerada com o bcrypt
- `isActive`: Deve ser gerado no momento da validação dos dados no formato boolean com default = true
- `createdAt`: Deve ser gerado no momento da validação dos dados no formato Date
- `updatedAt`: Deve ser gerado no momento da validação dos dados no formato Date, deve iniciar com o valor de criação (mesmo valor do campo createdAt) e deve ser atualizado sempre que esse usuário for atualizado.
- `id`: Deve ser gerado no momento da validação dos dados, deve ser um uuid.
- `address`: um objeto com os seguintes dados:
- `district`: string
- `zipCode`: string
- `number`: string
- `city`: string
- `state`: string

#### - A rota de criação deve retornar todos os dados, com exceção da hash de senha.
#### - Não podem ser cadastrados dois usuários com o mesmo e-mail.
#### - Não pode ser cadastrado dois usuários com o mesmo endereço.
#### - Não pode ser cadastrado usuários com o campo state maior que 2 dígitos.
#### - Não pode ser cadastrado usuários com o campo zipCode maior que 8 dígitos.

### `GET - /users/:id`
A rota deve retornar todos os dados do usuário, com exceção de hash de senha.

### `UPDATE - /users/:id`
A rota deve retornar os dados atualizados do usuário, com exceção de hash de senha.

### `DELETE - /users/:id`
A rota deve realizar um soft delete do usuário, alterando isActive para false.
Não deve ser possível realizar um soft delete em um usuário inativo.

### `POST - /companies`
Rota para criação de empresas com os seguintes dados:
- `name`: string
- `email`: string
- `password`: Deverá receber uma string mas armazenar uma hash gerada com o bcrypt
- `isActive`: Deve ser gerado no momento da validação dos dados no formato boolean com default = true
- `createdAt`: Deve ser gerado no momento da validação dos dados no formato Date
- `updatedAt`: Deve ser gerado no momento da validação dos dados no formato Date, deve iniciar com o valor de criação (mesmo valor do campo createdAt) e deve ser atualizado sempre que esse usuário for atualizado
- `isOpen`: Deve ser gerado no momento da validação dos dados no formato boolean com default = false
- `id`: Deve ser gerado no momento da validação dos dados, deve ser um uuid
- `address`: um objeto com os seguintes dados:
        - `district`: string
        - `zipCode`: string
        - `number`: string
        - `city`: string
        - `state`: string

#### - A rota de criação deve retornar todos os dados, com exceção da hash de senha.
#### - Não podem ser cadastradas duas empresas com o mesmo e-mail e nome.
#### - Não pode ser cadastrado duas empresas com o mesmo endereço.
#### - Não podem ser cadastradas empresas com o campo state maior que 2 dígitos.
#### - Não podem ser cadastradas empresas com o campo zipCode maior que 8 dígitos.

### `GET - /companies/:id`
A rota deve retornar todos os dados da empresa, com exceção de hash de senha.

### `UPDATE - /companies/:id`
A rota deve retornar os dados atualizados da empresa, com exceção de hash de senha.

### `DELETE - /companies/:id`
A rota deve realizar um soft delete da empresa, alterando isActive para false.
#### - Não deve ser possível realizar um soft delete em uma empresa inativa.

### `POST - /login`
Rota de login recebendo:
- `email`: string
- `password`: string 
O login deve validar se o usuário ou empresa existem, se o isActive é igual a true e se a senha está correta.

### `GET - /categories`
A rota deve listar todas as categorias.
A rota não precisa de autenticação para ser acessada.

### `GET - /categories/<id>/products`
A rota deve listar todos os produtos de uma categoria.

### `POST - /products`
Rota para criação de um produto com os seguintes dados:
- `name`: string
- `description`: string
- `quantity`: number
- `price`: number
- `expirationDate`: string
A rota deve ser acessada apenas pela company.

### `GET - /products`
A rota deve listar todos os produtos
A rota precisa de autenticação para ser acessada.

### `GET - /products/:id`
A rota deve listar todos os dados do produto.

### `UPDATE -/products/:id`
A rota deve retornar os dados atualizados do produto.

### `DELETE -/products/:id`
A rota deve deletar do banco o produto.

### `POST - /orders`
Rota responsável pelo pedido com os seguintes dados:
- `status`: string
- `userId`: Não deve ser passado no body da requisição e sim pego através do token do usuário.
- `id`: Deve ser gerado no momento da validação dos dados, deve ser um uuid.

### `POST - /orders/products`
Rota responsável pelo agendamento de uma visita a um imóvel com os seguintes dados:
- `date`:  date
- `hour`: time
- `orderId`: string
- `productId`: string
- `id`: Deve ser gerado no momento da validação dos dados, deve ser um uuid.

### `GET - /orders/:id/products`
A rota deve listar todos os produtos de um pedido
A rota pode ser acessada apenas pela company


### `POST - /delivery`
Rota para criação delivery com os seguintes dados:
- `name`: string 
- `phone`: string
- `isActive`: boolean
- `id`: Deve ser gerado no momento da validação dos dados, deve ser um uuid.

#### - A rota pode ser acessada apenas pela company
#### - A rota de criação deve retornar todos os dados








