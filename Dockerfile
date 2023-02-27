# Imagem base com Python
FROM python:3.8-slim-buster

# Copia os arquivos de configuração para o contêiner
COPY . /app
WORKDIR /app

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Define as variáveis de ambiente para a conexão com o MongoDB e Elasticsearch
ENV MONGO_URI mongodb://mongo:27017/
ENV ELASTICSEARCH_HOST elasticsearch:9200/

WORKDIR /app/desafio-2
# Define o comando padrão a ser executado quando o contêiner for iniciado
CMD ["flask", "run", "--host", "0.0.0.0"]
