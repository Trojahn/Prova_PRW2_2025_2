# Template de desenvolvimento de websites React

> Quer desenvolver em React sem ter que instalar dezenas de coisas em seu computador? Este é seu repositório!!!

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

```
http://localhost:5173/
```

Caso esteja utilizando o Windows, não se esqueça de antes inicializar o Docker Desktop ou similares.

## 🚀 Instalando bibliotecas

Caso deseje instalar uma nova dependência, você têm duas opções:

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



