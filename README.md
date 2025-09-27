📌 Projeto Frontend – FakeStore

Este projeto é um MVP fullstack containerizado:

Front-end: Aplicação React (build com Vite, servida por Nginx).
Back-end: API FastAPI (Python) com persistência em SQLite.
Integração: 4 métodos HTTP (POST/GET/PUT/DELETE) para gerenciamento de pedidos, + produtos da Fake Store API externa.
Tecnologias: Docker Compose para orquestração, volumes para persistir o banco de dados.

Este repositório contém o frontend do projeto FakeStore, responsável pela interface de usuário e comunicação com a API externa/backend.

projeto-mvp/

backend/# Database

FakeStore-Frontend/# React app + Dockerfile + nginx.conf + .dockerignore

FakeStore-Backend/ # FastAPI + requirements.txt + Dockerfile

docker-compose.yml # Orquestração

⚙️ Instalação e Execução para teste local

Clone o repositório:

git clone https://github.com/csccorgozinho/front-end-FakeStore-Sprint-Back-end-A-MVP-PUC-RIO.git

cd fakestore-frontend


Instale as dependências:

npm install

ou

yarn install

Execute o ambiente de desenvolvimento:

npm start

ou

yarn start


Acesse em:

http://localhost:3000

⚙️Instalação e Execução com Docker

Pré-requisitos
Docker Desktop: Instale a versão mais recente para sua plataforma:
Windows/macOS: Baixe de docker.com/products/docker-desktop. Ative WSL 2 no Windows (durante instalação).
Linux (Ubuntu/Debian): Rode no terminal:

sudo apt update

sudo apt install docker.io docker-compose

sudo usermod -aG docker $USER # Adicione seu usuário ao grupo docker (reinicie sessão)

Verifique instalação: docker --version e docker-compose --version (deve mostrar v2+).

Recursos Recomendados: 4GB+ RAM, 2+ CPU cores (Docker Settings > Resources para ajustar).

Rede: Conexão à internet para baixar imagens Docker (Node, Python, Nginx — ~1GB na primeira vez).
Navegador: Chrome/Firefox para testar (F12 para debug).
Construa e Inicie os Containers:

Rode o comando principal:

docker-compose up --build

Para rodar em background:
docker-compose up -d --build

Portas Mapeadas (Ajustáveis no docker-compose.yml):
Front-end: http://localhost:3000 (React app).
Back-end: http://localhost:8000 (API FastAPI).
