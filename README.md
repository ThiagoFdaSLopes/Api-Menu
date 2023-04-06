# Api Menu 

Para este projeto, foi desenvolvido uma api para aplicar os princípios de Programação Orientada a Objetos (POO) e a construção de uma API com CRUD para gerenciar um cardapio online. Isso foi realizado utilizando o banco de dados MongoDB através do framework do Mongoose.  

## Stack utilizada 

- Back-end: Typescript, Node, Moongose, MongoDB, Docker, Express
- Testes: Jest, Mocha, Sinon

## Rodando o Docker
Rode os serviços node e mongodb com o comando ```docker-compose up -d```.

Lembre-se de parar o mongodb se estiver usando localmente na porta padrão (27017), ou adapte, caso queria fazer uso da aplicação em containers.

:warning: Após rodar o docker! Use o comando ```npm run db:populate``` na raiz do projeto. Para o bando de dados ser populado com informações iniciais!

:warning: Após subir todos os contêineres, a api já estará rodando na porta 3001, portanto basta apenas usar os endpoints


Esses serviços irão inicializar um container chamado ```api-menu``` e outro chamado ```api_menu_db```. 
Tambem existe um servico mongo-express que pode ser usado atraves de um navegador de internet na rota ```http://localhost:8081```

A partir daqui você pode rodar o container ```api-menu``` via CLI ou abri-lo no VS Code. 

Use o comando ```docker exec -it api-menu bash```.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano. 

Instale as dependências "Caso existam" com ```npm install``` 

  

:warning: Atenção :warning: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima. 

  

:warning: Atenção :warning: O git dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container. 

  

:warning: Atenção :warning: Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador. 

  

:warning: Atenção :warning: Caso você esteja usando macOS e ao executar o docker-compose up -d se depare com o seguinte erro: 

  

```bash 

The Compose file './docker-compose.yml' is invalid because: 

Unsupported config option for services.db: 'platform' 

Unsupported config option for services.node: 'platform' 

``` 

Foram encontradas 2 possíveis soluções para este problema: 

* Você pode adicionar manualmente a option platform: linux/amd64 no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos. 

* Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha export DOCKER_DEFAULT_PLATFORM=linux/amd64, essa é uma solução global. As soluções foram com base nesta fonte. 

# Rotas Da Api

#### Criar um product
```http
  POST /product
```

```
 Sera validado se existe um token no headers e se o usuário é um admin.
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `categories` | `string[]` | **Obrigatório no body**. |
| `name` | `string` | **Obrigatório no body**. |
| `qty` | `number` | **Obrigatório no body**. |
| `price` | `number` | **Obrigatório no body**. |

#### Atualizar um produto

```http
  PATCH /products/:id <--(Precisa ser um id mongoID valido)
```

```
 Sera validado se existe um token no headers e se o usuário é um admin.
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `categories` | `string[]` | **Obrigatório no body**. |
| `name` | `string` | **Obrigatório no body**. |
| `qty` | `number` | **Obrigatório no body**. |
| `price` | `number` | **Obrigatório no body**. |

#### Buscar product por ID

```
 Sera validado se existe um token no headers e se o usuário é um admin.
```

```http
  GET /products/:id <--(Precisa ser um id mongoID valido)
  ```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório no params da rota**.  |


#### Deletando product por ID

```
 Sera validado se existe um token no headers e se o usuário é um admin.
```

```http
  DELETE /products/:id <--(Precisa ser um id mongoID valido)
  ```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório no params da rota**.  |

#### Pegar todos products da loja

```
 Sera validado se existe um token no headers e se o usuário é um admin.
```

```http
  GET /products
  ```
  
 #### Pegar todas categorias da loja

```
 Sera validado se existe um token no headers e se o usuário é um admin.
```

```http
  GET /categorys
  ```

Qualquer duvida entre em contato comigo:

E-mail: programadorthiagolopes@gmail.com

Linkedin: https://www.linkedin.com/in/thiago-lopes-dev-/
