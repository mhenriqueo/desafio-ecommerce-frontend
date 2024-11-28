# Desafio: Frontend de Catálogo de Produtos de um Ecommerce

Este repositório contém a parte do Frontend com React, para o desafio para construção de um sistema de gerenciamento de catálogo de produtos em um aplicativo de ecommerce.

## Pré-requisitos

- Git
- Docker e Docker Compose instalados

## Estrutura do Projeto

Este repositório é parte de uma aplicação que depende do backend para funcionar corretamente, onde poderá ser feito o clone do mesmo no seguinte repositório: https://github.com/mhenriqueo/desafio-ecommerce-backend. 

O `docker-compose.yml` do projeto frontend ou backend, deve ser colocado em um diretório que contenha tanto o repositório do frontend quanto o do backend.

### Passos para rodar o projeto

1. Clone ambos os repositórios do desafio ecommerce (frontend e backend) em um diretório específico na sua máquina local. O diretório do projeto pode ser algo como:

    ```bash
    /meu/projeto/
    ├── desafio-ecommerce-frontend
    └── desafio-ecommerce-backend
    ```

2. Adicione o arquivo `docker-compose.yml` no diretório raiz (onde estão os dois repositórios).

3. Navegue até o diretório onde o `docker-compose.yml` está localizado e execute o seguinte comando para construir e iniciar os containers:

    ```bash
    docker compose up --build
    ```

4. O frontend estará disponível no seu navegador em `http://localhost`.

### Observações

- O backend é necessário para que o frontend funcione corretamente. O `docker-compose.yml` irá construir e iniciar tanto o frontend quanto o backend automaticamente.
- Se você desejar alterar portas ou outras configurações, edite o arquivo `docker-compose.yml` de acordo.

