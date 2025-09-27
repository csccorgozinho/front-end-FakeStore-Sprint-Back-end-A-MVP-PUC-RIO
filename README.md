# front-end-FakeStore-Sprint-Back-end-Avan-adEste repositório contém o código-fonte do frontend da Fake Store, uma aplicação web construída com React.

Pré-requisitos
Para rodar esta aplicação, você precisará ter o seguinte instalado em sua máquina:

Node.js (versão 14 ou superior)
npm ou Yarn (gerenciador de pacotes)
Docker e Docker Compose (se for rodar via Docker)
Como Rodar Nativamente
Siga os passos abaixo para configurar e rodar o frontend em seu ambiente local:

Clone o Repositório:

bash

git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
cd FakeStore-api-main
Instale as Dependências:

bash


npm install
# ou
yarn install
Inicie a Aplicação:

bash

npm run dev
# ou
yarn dev
A aplicação será iniciada em http://localhost:3000 . Abra seu navegador e acesse este endereço para ver o frontend em funcionamento.

Como Rodar via Docker
Para rodar o frontend usando Docker, siga estas instruções:

Clone o Repositório:

bash

git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
cd FakeStore-api-main
Construa a Imagem Docker:

bash

docker build -t fakestore-frontend .
Execute o Contêiner Docker:

bash

Run
Copy code
docker run -p 3000:80 fakestore-frontend
A aplicação estará acessível em http://localhost:3000 em seu navegador.

Estrutura do Projeto
public/: Arquivos estáticos.
src/: Código-fonte da aplicação React.
index.html: Arquivo HTML principal.
package.json: Lista de dependências e scripts do projeto.
dockerfile: Configuração para construir a imagem Docker.
nginx.conf: Configuração do Nginx para servir a aplicação.
o-MVP
