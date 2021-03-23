# Cache Market

API utilizando Lazy-Loading com Redis e PostgreSQL em um domínio market place

# Instalação

Para instalar as dependências você vai precisar do NPM, tendo ele instalado você pode executar o seguinte comando no seu terminal:

$ npm i

# Tabela e colunas do banco

Foi usada uma tabela denominada products com as colunas code, p_name_, quantity e price sendo respectivamente o código, nome, quantidade e preço do produto

# Configuração da Variáveis

Você vai precisar criar um arquivo .env na raiz do projeto com as seguintes variáveis:  
  
PORT={Porta em que a aplicação irá rodar}  
PG_USERNAME={Nome de usuário do PostgreSQL}  
PG_PASSWORD={Senha do PostgreSQL}  
PG_HOST={Host do seu PostgreSQL}  
PG_PORT={Porta do PostgreSQL}  
PG_NAME={Nome da base de dados que tem os dados mantidos}  
REDIS_HOST={Host em que o Redis está rodando}  
REDIS_PORT={Porta do Redis}  
  
# Execução

Para executar a aplicação você terá que executar o seguinte comando no terminal:
  
$ npm start
