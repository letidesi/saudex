On14 - Backend {reprograma} 💜 API Saudex - Projeto Final 💜 Status: **Em desenvolvimento... ✍** 

<img src="assets/saudex.png">

# <h1 align="center" style="font-weight: bold">API - Saudex</h1>

<br>

## <p align="center" style="font-weight: bold">Origem da API - Saudex -</p>
> <h3> O termo Saudex é formado pela junção da palavra saudade com a semelhança do fonema do plural da palavra saúdes.

<br>

> <h3> No entanto, o contexto geral sobre esta ideia é extremamente revoltante e triste. Durante anos, verificou-se ralatos, não somente através de Victor Soares mas de outros cidadãos, o descaso do Ministério da Saúde com as pessoas nos quais fazem o uso de insulina, que precisam de insumos gratuitos para gerar um controle maior sobre sua saúde e sua rotina diária. 
<br>

> <h3> Consequentemente durante a pandemia aconteceu um aumento nesses relatos. No ano de 2020 à 2021, acompanhei uma experiência pessoal ruim com um amigo, Victor Soares; Me informou que não havia conseguido adquirir fitas para medir sua glicose, não existia um aplicativo funcional ou gratuito para o auxiliar melhor em como, por exemplo, encontrar médicos endocrinologistas, no qual se tornava uma situação frustrante, atrapalhava seu emocional, sua rotina e seu dia-dia, além do medo de ocorrer alguma coisa mais grave.

<br>

> <h3> Como se não bastasse, neste mesmo período de ano, perdi meu cunhado, André Marcos, vítima da leucemia e minha prima, Sabrina Thomaz, vítima da rejeição do transplante de coração. Sendo eles, duas pessoas incríveis quais desfrutei do prazer de conhecer, conviver... Infelizmente, nos deixaram cedo demais, são duas pessoas as quais viveram, amaram à vida cada segundo, aproveitaram todos os momentos, duas pessoas guerreiras, duas pessoas fortes, que nos ensinou muito, são duas pessoas quais se estabeleceram em nossos corações e, com certeza, marcaram nossas almas e encontraram-se para sempre em nossas memórias.

<br>

> <h3> Como resultado deste período do ano de 2020 à 2021, nasceu o sentimento de impotência, o pesar em não ter a influência necessária para ajudar amenizar o sofrimento daqueles que amamos. Portanto, analisando tudo que aconteceu até o atual momento, realizei a criação da API Saudex, uma inspiração que surgiu através de dor e perda.

<br>

## <p align="center" style="font-weight: bold">Objetivo</p>

><h3> A API Saudex, possui como o seu principal objetivo a importância de ajudar pessoas diabéticas que fazem uso de insulinas e que tem a necessidade de insumos gratuitos. 
<br>

> <h3> Para atingirmos este objetivo, realizaremos os cadastros de Administradores, os tornando administrantes da nossa API Saudex e, por isso, serão capazes de realizarem o login, desse modo, ocasionará automaticamente um token ou chave, como costumamos chamar, através deste token obtido os administrantes conseguirão registrar os Hospitais, Postos de Saúde e Farmácias, somente as que são credenciadas no “Programa Farmácia Popular”. 
<br>

> <h3> Além disso, com os estabelecimentos acima cadastrados com sucesso em nosso banco de dados, os administrantes e usuários comuns, terão a possibilidade de pesquisar pela nossa API Saudex, a qual informará onde encontrá-los dentre o estado do Rio de Janeiro, e também, pesquisá-los por município, por nome e por id; Para pesquisar por id é obrigatório realização do login como administrador. 

<br>

> <h3> Além de, encontrar médicos endocrinologistas, saber as quantidades de insumos disponíveis para estas pessoas e informar as quantidades de senhas disponibilizadas para o atendimento.  
<br>

> <h3>  Em resumo, a Saudex foi desenvolvida com o propósito de indicar aos nossos usuários, os quais sofrem com a diabetes, em qual centro médico encontrar, primordialmente, médicos e insumos gratuitamente, que sejam mais próximo de sua residência, entre outras finalidades.

<br>

<hr>

## <p align="center" style="font-weight: bold">Funcionalidades</p> 

<hr>

                   Rotas Privadas

<h4 align="center" style="font-weight: bold"> {Administradores} </h4>

- [X] Cadastrar;
- [X] Atualizar;
- [X] Mostrar os registrados;
- [X] Pesquisar por id;
- [X] Logar;
- [X] Remover.

<h4 align="center" style="font-weight: bold"> {Postos de Saúde} </h4>

- [X] Cadastrar;
- [X] Atualizar;
- [X] Mostrar os registrados;
- [X] Pesquisar por id;
- [X] Pesquisar por nome;
- [X] Pesquisar por município;
- [X] Remover.

<h4 align="center" style="font-weight: bold"> {Hospitais} </h4>                               

- [X] Cadastrar;
- [X] Atualizar;
- [X] Mostrar os registrados;
- [X] Pesquisar por id;
- [X] Pesquisar por nome;
- [X] Pesquisar por município;
- [X] Remover.

<h4 align="center" style="font-weight: bold"> {Farmácias} </h4>

- [X] Cadastrar;
- [X] Atualizar;
- [X] Mostrar as registradas;
- [X] Pesquisar por id;
- [X] Pesquisar por nome;
- [X] Pesquisar por município;
- [X] Remover.
<hr>

                      Rotas Públicas
<h4 align="center" style="font-weight: bold"> {Saudex} </h4>

- [X] Pesquisar centros médicos que dispõe de endocrinologistas;
- [X] Pesquisar centros médicos que dispõe de insumos para diabetes;
- [X] Pesquisar quantidade de insumos para diabtes disponíveis nos Hospitais;
- [X] Pesquisar quantidade de insumos para diabtes disponíveis nos Postos de Saúde;
- [X] Pesquisar quantidade de senhas para atendimento nos Postos de Saúde;
- [X] Pesquisar quantidade de senhas para atendimento nos Hospitais;
- [X] Pesquisar Postos de Saúde por nome;
- [X] Pesquisar Hospitais por nome;
- [X] Pesquisar Farmácias por nome;
- [X] Pesquisar Postos de Saúde por município;
- [X] Pesquisar Hospitais por município;
- [X] Pesquisar Farmácias por município;
- [X] Mostrar Farmácias credenciadas no "Programa Farmácia Popular".


## <p align="center" style="font-weight: bold">A Linguagem de Programação Executada</p>
<p p align="center"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></img></p>

## <p align="center" style="font-weight: bold">Tecnologias Utilizadas</p>

<p  align="center">
<a  href="https://git-scm.com/"><img  alt="Git version"  src="https://img.shields.io/badge/Git/GitHub-green">
<a  href="https://nodejs.org/pt-br/"><img  alt="Node version"  src="https://img.shields.io/badge/NodeJS-green">
<a  href="https://www.mongodb.com/cloud/atlas"><img  alt="Node version"  src="https://img.shields.io/badge/MongoDB%20Atlas-green"></a>

## <p align="center" style="font-weight: bold">Bibliotecas Aplicadas</p>

<p  align="center">
<a  href="https://www.npmjs.com/"><img  alt="npm version"  src="https://img.shields.io/badge/npm-6.14.6-orange">
<a  href="https://expressjs.com/pt-br/"><img  alt="Express version"  src="https://img.shields.io/badge/express-4.17.1-orange">
<a  href="https://mongoosejs.com/"><img  alt="Mongoose version"  src="https://img.shields.io/badge/mongoose-5.10.17-orange">
<a  href="https://www.npmjs.com/package/dotenv-safe"><img  alt="Dotenv-safe version"  src="https://img.shields.io/badge/dotenv-8.2.0-green">
<a  href="https://www.npmjs.com/package/bcryptjs"><img  alt="Bcrypt version"  src="https://img.shields.io/badge/bcrypt-5.0.0-green">
<a  href="https://www.npmjs.com/package/jsonwebtoken"><img  alt="Jsonwebtoken version"  src="https://img.shields.io/badge/jsonwebtoken-8.5.1-green">
<a  href="https://www.npmjs.com/package/nodemon"><img  alt="Nodemon version"  src="https://img.shields.io/badge/nodemon-2.0.6-green">
</a>
</p>

## <p align="center" style="font-weight: bold">Instruções de Instalação da API Saudex </p>

<h3> Antes de tudo, se for da sua preferência criar modificações em nosso código, será necessário realizar o download e concluir instalação do <a href="https://code.visualstudio.com/download"> Visual Studio Code </a>. Além disso, para verificar se as modificações foram realizadas com sucesso, deixaremos o link para instalação de um banco de dados NoSQL, de nossa preferência, o <a href="https://www.mongodb.com/try/download/community">MongoDB</a>. E também, deixaremos disponíveis dois links de nossa preferência de APIs que serão capazes de testar, criar e comparatilhar APIs, são eles: 
 o <a href="https://www.postman.com/downloads/">Postman</a> e o <a href="https://insomnia.rest/download">Insomnia</a>; E por favor, escolha a versão de acordo com o seu sistema.

Após isso, é necessário realizar também o download e concluir instalação do <a href="https://nodejs.org/en/download/"> Node.js</a>; E novamente, escolha a versão de acordo com o seu sistema. 

Dito isto, siga o processo abaixo:

 - Faça um fork da API Saudex:
   <img align="center" src="assets/fork.jpg">

 - Na sua área de trabalho, dê um clique no lado esquerdo do mouse ou direito, caso você seja canhota, abra o terminal git bash here:

   <img align="center" src="assets/gitbash.jpg">

- No terminal Git Bash Here, faça o clone da API Saudex:

      git clone https://github.com/letidesi/saudex.git

- Para os que desejam criar modificações no código, crie uma nova branch:

      git checkout -b nome-da-sua-branch

- (Obs: os que não desejarem modificar, não crie uma nova branch, apenas pule para próxima etapa)

- Entre na pasta da API Saudex:

      cd saudex

- Após entrar na pasta da API Saudex, instale todas as depedências:

      npm install ou npm i

- Depois de seguir este processo, você estará apto a executar nossa API, utilize o último comando para finalizar:

      npm start

- Os que fizeram modificações, realize o push das suas alterações e envie uma solicitação de pull request. Para mais informações de comandos, <a href="https://gist.github.com/letidesi/47454278dff1f7b666802f3cc4951292">clique aqui</a>.

<br>

## <p align="center" style="font-weight: bold">Aprendizados </p>

<h3> A construção deste projeto final, consiste nesta API fundamentada no CRUD com a integração do banco de dados NoSQL, o MongoDB. 
<br>
<br>

- Definindo o que é CRUD: 
    

      CREATE (CRIAR)
      READ (LER, CONSULTAR)
      UPDATE (ATUALIZAR) 
      DELETE (DESTRUIÇÃO, REMOÇÃO).

<br>

## <p align="center" style="font-weight: bold"> Rotas Públicas </p>

    Nome da rota principal = Saudex

|  **_{GET}_** | Retornar |
| ------------------- | :-------------------: |
| /search/endocrinologists | Lista todos os Centros Médicos que possuem endocrinologistas disponíveis. |
| /search/supplies | Lista todos os Centros Médicos que possuem insumos disponíveis para pessoas diabéticas. |
| /search/healthcenter/quantitysupplies | Lista todos os Postos de Saúdes que possuem a mesma quantidade de insumos informada pelo usuário. |
| /search/healthcenter/attendancepassword | Lista todos os Postos de Saúdes que possuem a mesma quantidade de senha de atendimento informada pelo usuário. |
| /search/healthcenter/name| Lista todos os Postos de Saúde que possuem o mesmo nome informado pelo usuário. |
| /search/hospital/quantitysupplies | Lista todos os Hospitais que possuem a mesma quantidade de insumos informada pelo usuário. |
| /search/hospital/attendancepassword | Lista todos os Hospitais que possuem a mesma quantidade de senha de atendimento informada pelo usuário.
| /search/hospital/name | Lista todos os Hospitais que possuem o mesmo nome informado pelo usuário. |
| /pharmacy/popularprogram | Lista todas as Farmácias que são credenciadas no "Programa Farmácia Popular". |
| /search/pharmacy/name| Lista todas as Farmácias que possuem o mesmo nome informado pelo usuário. |
| /search/healthcenter/municipality| Lista todos os Postos de Saúde que estão localizados no mesmo município informado pelo usuário. |
| /search/hospital/municipality | Lista todos os Hospitais que estão localizados no mesmo município informado pelo usuário. |
| /search/pharmacy/municipality | Lista todos as Farmácias que estão localizados no mesmo município informado pelo usuário.



## <p align="center" style="font-weight: bold"> Rotas Privadas </p>

     Nome da rota principal = Saudex
        

| **_{GET}_** | Retornar |
| ------------------- | :-------------------: |
| /message | Informar mensagem para administradores. |
| /adm | Lista todos os Admnistradores cadastrados. |
| /admin/:id | Procura o Admnistrador do id requisitado pelo Admnistrador logado.|
| /healthcenter | Lista de todos os Postos de Saúde cadastrados. |
| /healthcenter/search/name| Lista todos os Postos de Saúde que possuem o mesmo nome informado pelo administrante. |
|/healthcenter/search/municipality | Lista todos os Postos de Saúde que estão localizados no mesmo município informado pelo administrante.  |
|/healthcenter/search/:id | Procura o Posto de Saúde do id requisitado pelo administrante. |
| /hospital | Lista de todos os Hospitais cadastrados. |
| /hospital/search/name | Lista todos os Hospitais que possuem o mesmo nome informado pelo administrante. |
| /hospital/search/municipality | Lista todos os Hospitais que estão localizados no mesmo município informado pelo admnistrante.  |
| /hospital/search/:id | Procura Hospital por id requisitado pelo administrante. |
| /pharmacy | Lista de todas as Farmácias cadastradas. |
| /pharmacy/search/name | Lista todas as Farmácias que possuem o mesmo nome informado pelo administrante. |
| /pharmacy/search/municipality | Lista todas as Farmácias que estão localizados no mesmo município informado pelo admnistrante.  |
| /pharmacy/search/:id | Procura Farmácia por id requisitado pelo administrante.

<br>

<br>

| **_{POST}_** | Retornar |
| ------------------- | :-------------------: |
| /register/admin | Cadastrar os administradores. |
| /login/admin | Realizar login do administrante cadastrado. |
| /healthcenter/register| Cadastrar os Postos de Saúde. |
| /hospital/register | Cadastrar os Hospitais. |
| /pharmacy/register | Cadastrar as Farmácias. |

<br>

<br>

| **_{PUT}_** | Retornar |
| ------------------- | :-------------------: |
| /update/admin/:id| Atualizar registros dos administradores. |
| /healthcenter/update/:id | Atualizar registros dos Postos de Saúde. |
| /hospital/update/:id| Atualizar registros dos Hospitais. |
| /pharmacy/update/:id | Atualizar registros das Farmácias. |

<br>

<br>

| **_{DELETE}_** | Retornar |
| ------------------- | :-------------------: |
| /delete/admin/:id | Deletar os registros dos administradores. |
| /healthcenter/delete/:id | Deletar os registros dos Postos de Saúde. |
| /hospital/delete/:id | Deletar os registros dos Hospitais. |
| /pharmacy/delete/:id | Deletar os registros das Farmácias. |

