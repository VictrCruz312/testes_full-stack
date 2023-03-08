# testes Vaga de Desenvolvedor Full Stack em TargetData

#### Este projeto consiste em 5 desafios para uma vaga full-stack.

# Requisitos
- Docker
- docker-compose

# Rodando o projeto:
#### O projeto pode ser executado em sua máquina local seguindo os seguintes passos:

### Clone o repositório
- abre o terminal escolha alguma pasta de sua preferência e execute o seguinte comando:
```shell
git clone git@github.com:VictrCruz312/testes_full-stack.git
```
- após clonar acesse a pasta do projeto:
```shell
cd testes_full-stack
```

- na pasta do projeto execute:
```shell
docker-compose up #utilize a frag -d caso não queira ver os logs e não ficar com o terminal travado

# ou: docker compose up dependendo da versão instalada sem o '-'
```

## desafio-1:
#### Desafio 1 é um programa em python que lê um arquivo .csv faz as tratativas dos dados e salva no mongodb e elasticsearch
#### com os containers rodando execute em outro terminal o seguinte:

```shell
docker exec -it teste_fullstack-desafio-4_back-end-1 /bin/bash
#para sair do container basta digitar no terminal: exit
```
#### Este comando acessa o container... Após isso:
```shell
cd desafio-1 && python main.py

#obs: ao executar este comando você vai estar rodando o arquivo main.py localizado em ./desafio-1
```
#### O desafio 1 já está configurado para baixar o arquivo .zip da base de dados do governo pela url fornecida na chamada da função 'data_processing' em main.py. 

#### Abaixo deixo informações sobre o que são cada um dos parâmetros desta função:
- **url:** é o link de download do arquivo .zip de estabelecimentos
- **file_name_to_extract:** é o nome que será definido para ser salvo o arquivo que será baixado da url
- **file_name_ends_with:** a parte final do arquivo csv extraido do .zip (deve ser exatamente igual caso contrário mão será identificado pela função)
- **line_limit_for_reading:** quantidade de linhas para serem lidas no arquivo .csv para serem salvas no banco de dados.

## desafio-2
#### O desafio-2 que é uma aplicação simples em flask está rodando em ```http://localhost:5000``` e possui as seguintes rotas:
- **/** - deve estar logado para acessar
- **/login** - rota de login na aplicação
- **/register** - rota de registro de usuário

## desafio-3
#### O desafio 3 é uma aplicação em HTML CSS e JavaScript puro, com tela de menu e uma to-do-list, a aplicação está rodando em ```http://localhost:8080```

## desafio-4
#### O desafio 4 contem dois serviços que são:
- **back-end:** um CRUD de estabelecimentos utilizando o DJANGO + MongoDB e Pymongo
- **front-end:** uma aplicação em react + typescript que está consumindo a api do **back-end**, utilizando o axios.

#### front-end possui as seguintes telas:
**/home** - Lista os estabelecimentos salvos no mongodb com possibilidade de atualiza-los e deletar.
