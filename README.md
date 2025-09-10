# Prova PRW2 - 2025-2

> Repositório contendo o material da Prova PRW2 (React). Consiste de um backend de exemplo, um site de exemplo, e um projeto básico vazio React a ser desenvolvido. 

### Avisos

Usar apenas para desenvolvimento local. Adaptações são necessárias caso deseje publicar o website em produção.

## 💻 Pré-requisitos

Antes de começar, verifique que sua máquina possua:

- Docker

## 🚀 Executando

Com o terminal (ou prompt de comando), entre na pasta do repositório e digite o seguinte comando:

```
docker compose up --build
```

Se o processo acabar com sucesso, você poderá acessar o website resultante em


## 🚀 Endereços para acesso

A documentação do backend, suas rotas e formas de acesso, podem ser utilizados no endeço abaixo:

```
http://localhost:3000
```







### Editar o package.json

Primeiro, na pasta do projeto, remova todas as informações do conteiner e imagem antigos com o seguinte comando:

```
docker compose down -v
```

Depois, edite o arquivo *package.json* adicionando as dependências necessárias. Depois de finalizado, execute o projeto normalmente.

### Instalando via npm install

Com o projeto em execução, abra outro terminal na mesma pasta do projeto e execute o comando.

```
docker compose exec react bash
```

Execute então a instalação das bibliotecas usando o comando **npm install**.

## ☕ Codificando

Altere o diretamente os arquivos de código-fonte na pasta `src`. O sistema suporta *hot reload*, ou seja, basta salvar seu código-fonte que a página do navegador será atualizada automaticamente.



