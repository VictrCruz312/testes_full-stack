from pymongo import MongoClient
from elasticsearch import Elasticsearch
import pandas as pd


def insert_data_in_mongodb(data) -> None:
    # Inserir os registros no MongoDB
    print("\n\n")
    print("Insersão de dados no mongodb:")

    client = MongoClient("mongodb://mongodb:27017/")

    db = client["desafio-1"]
    collection = db["estabelecimentos"]

    for document in data:
        if collection.find_one({"CNPJ COMPLETO": document["CNPJ COMPLETO"]}):
            print(
                "Empresa com CNPJ {} já existe na coleção do mongodb, pulando para a proxima...".format(
                    document["CNPJ COMPLETO"]
                )
            )
        else:
            collection.insert_one(document)
            print(
                "Inserido com sucesso empresa com CNPJ {}, no mongodb.".format(
                    document["CNPJ COMPLETO"]
                )
            )


def insert_data_in_elasticsearch(data) -> None:
    # 5. Inserir os registros no ElasticSearch
    data = pd.DataFrame(data)
    print("\n\n")
    print("Insersão de dados no ElasticSearch:")

    es = Elasticsearch(["http://elasticsearch:9200/"])

    for i, row in data.iterrows():
        cnpj = row["CNPJ COMPLETO"]

        if es.exists(index="desafio-1", id=cnpj):
            print(
                f"Documento com CNPJ {cnpj} já existe no Elasticsearch. Ignorando a inserção..."
            )
            continue

        row = row.fillna("")

        data = {
            "CNPJ COMPLETO": row["CNPJ COMPLETO"],
            "NOME FANTASIA": row["NOME FANTASIA"],
            "CEP": row["CEP"],
            "TELEFONE": row["TELEFONE"],
            "CORREIO ELETRÔNICO": row["CORREIO ELETRÔNICO"],
        }
        es.index(index="desafio-1", id=cnpj, body=data)["result"]
        print(f"Inserido com sucesso empresa com CNPJ: {cnpj}, no ElasticSearch.")
