import pandas as pd
from tqdm import tqdm
import os
import zipfile
from pymongo import MongoClient
from elasticsearch import Elasticsearch
import urllib.request

# 1. Fazer o download do arquivo "Estabelecimentos9"
url = "https://dadosabertos.rfb.gov.br/CNPJ/Empresas9.zip"
filename = "Empresas9.zip"
filename_endswith = ".EMPRECSV"

# verifique se o arquivo já existe na pasta raiz, caso não existe faz o download
if not os.path.exists(filename):
    # Mostra a barra de progresso durante o download do arquivo
    with tqdm(unit="B", unit_scale=True, unit_divisor=1024) as progress:
        urllib.request.urlretrieve(
            url,
            filename,
            reporthook=lambda blocknum, blocksize, total: progress.update(
                blocknum * blocksize - progress.n
            ),
        )

zip_file = zipfile.ZipFile(filename)

target_file = None
for file in zip_file.namelist():
    if file.endswith(filename_endswith):
        target_file = file
        break

    # Verifique se o arquivo foi encontrado
if target_file is None:
    print(f"Arquivo {filename_endswith} não encontrado no arquivo zip.")
else:
    # Extraia o arquivo
    print("zip_file:", zip_file)
    print("target_file", target_file)
    zip_file.extract(target_file, path=".")
    print(f"Arquivo {target_file} extraído com sucesso.")

df = pd.read_csv(
    target_file,
    sep="|",
    encoding="ISO-8859-1",
    usecols=[
        "CNPJ_BASE",
        "CNPJ_ORDEM",
        "CNPJ_DV",
        "NOME_FANTASIA",
        "CEP",
        "DDD_TELEFONE_1",
        "TELEFONE_1",
        "EMAIL",
    ],
)

# 3. Tratamento dos dados para criar o campo "CNPJ completo"
df["CNPJ completo"] = (
    df["CNPJ_BASE"].astype(str)
    + df["CNPJ_ORDEM"].astype(str).str.zfill(4)
    + df["CNPJ_DV"].astype(str)
)
df = df[
    ["CNPJ completo", "NOME_FANTASIA", "CEP", "DDD_TELEFONE_1", "TELEFONE_1", "EMAIL"]
]

# 4. Inserir os registros no MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["desafio"]
collection = db["estabelecimentos"]
records = df.to_dict(orient="records")
collection.insert_many(records)

# 5. Inserir os registros no ElasticSearch
es = Elasticsearch()
for i, row in df.iterrows():
    data = {
        "CNPJ completo": row["CNPJ completo"],
        "Nome Fantasia": row["NOME_FANTASIA"],
        "CEP": row["CEP"],
        "Telefone": f"({row['DDD_TELEFONE_1']}) {row['TELEFONE_1']}",
        "Email": row["EMAIL"],
    }
    es.index(index="desafio", id=i, body=data)
