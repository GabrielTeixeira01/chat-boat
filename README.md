# API de Pedidos e Webhook

API REST para gerenciamento de pedidos, desenvolvida com Node.js, Express e MySQL. O projeto também disponibiliza um webhook para simular integrações com chatbots, plataformas omnichannel e outros sistemas externos.

[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Banco_de_dados-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![REST](https://img.shields.io/badge/Arquitetura-REST-2563EB)](https://developer.mozilla.org/docs/Glossary/REST)

## Sobre o projeto

A aplicação representa o fluxo básico de pedidos de uma operação comercial. Clientes e produtos são registrados por meio de requisições JSON, os dados ficam persistidos no MySQL e o status de cada pedido pode ser atualizado conforme o avanço do atendimento.

A separação das rotas em um módulo próprio mantém o servidor enxuto e facilita a evolução do código. O endpoint de webhook demonstra como a API pode receber eventos originados por outros serviços.

## Funcionalidades

- Cadastro de pedidos com cliente, produto e quantidade
- Definição automática do status inicial como `PENDENTE`
- Listagem de todos os pedidos cadastrados
- Atualização do status por identificador
- Persistência dos dados em MySQL
- Consultas parametrizadas para evitar injeção de SQL
- Endpoint de webhook para integração com sistemas externos
- Configuração do ambiente sem credenciais no código-fonte

## Tecnologias

| Categoria | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Framework HTTP | Express |
| Banco de dados | MySQL |
| Driver | mysql2 |
| Configuração | dotenv |

## Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Uma instância MySQL em execução
- Git

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/GabrielTeixeira01/chat-boat.git
   cd chat-boat
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o banco e a tabela utilizando o arquivo `database/schema.sql`:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

4. Crie sua configuração local a partir do exemplo:

   No Windows:

   ```powershell
   Copy-Item .env.example .env
   ```

   No Linux ou macOS:

   ```bash
   cp .env.example .env
   ```

5. Ajuste as credenciais no arquivo `.env`:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=pedidos_db
   PORT=3000
   ```

6. Inicie a API:

   ```bash
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`.

## Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/pedidos` | Cadastra um novo pedido |
| `GET` | `/pedidos` | Lista todos os pedidos |
| `PUT` | `/pedidos/{id}` | Atualiza o status de um pedido |
| `POST` | `/pedidos/webhook` | Recebe e confirma um evento externo |

### Criar um pedido

```http
POST /pedidos
Content-Type: application/json
```

```json
{
  "cliente": "Empresa Exemplo",
  "produto": "Camiseta personalizada",
  "quantidade": 50
}
```

### Atualizar o status

```http
PUT /pedidos/1
Content-Type: application/json
```

```json
{
  "status": "APROVADO"
}
```

### Enviar um evento ao webhook

```http
POST /pedidos/webhook
Content-Type: application/json
```

```json
{
  "origem": "chatbot",
  "evento": "novo_pedido",
  "pedidoId": 1
}
```

## Estrutura do projeto

```text
chat-boat/
├── database/
│   └── schema.sql      # Criação do banco e da tabela
├── routes/
│   └── pedidos.js      # Rotas e consultas dos pedidos
├── .env.example        # Modelo de configuração local
├── .gitignore          # Arquivos que não devem ser versionados
├── db.js               # Pool de conexões com o MySQL
├── package.json        # Dependências e scripts
└── server.js           # Inicialização do Express
```

## Demonstração

### Cadastro e consulta de pedidos

![Requisições da API de pedidos](https://github.com/user-attachments/assets/cf7c13d9-9f2b-4f66-8941-e5ecc6aebfff)

### Atualização de status

![Atualização de pedido](https://github.com/user-attachments/assets/94dbb711-ef73-4488-a2c2-7d8070277728)

### Persistência no MySQL

![Tabela de pedidos no MySQL](https://github.com/user-attachments/assets/4aa77881-202b-405f-a406-b6e018dac227)

## Possíveis evoluções

- Validação dos dados de entrada
- Paginação e filtros na listagem
- Exclusão de pedidos
- Autenticação e autorização
- Registro estruturado dos webhooks
- Testes automatizados e documentação OpenAPI
- Conteinerização com Docker

## Autor

Desenvolvido por [Gabriel Teixeira](https://github.com/GabrielTeixeira01).
