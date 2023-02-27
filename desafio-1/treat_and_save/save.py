from pymongo import MongoClient
from elasticsearch import Elasticsearch


def insert_data_in_mongodb(data) -> None:
    # Inserir os registros no MongoDB
    client = MongoClient("mongodb://mongodb:27017/")
    db = client["desafio"]
    collection = db["estabelecimentos"]
    collection.insert_many(data)
    print(db["desafio"].find())


def insert_data_in_elasticsearch(data) -> None:
    # 5. Inserir os registros no ElasticSearch
    es = Elasticsearch()
    for i, row in data.iterrows():
        data = {
            "CNPJ COMPLETO": row["CNPJ COMPLETO"],
            "Nome Fantasia": row["NOME_FANTASIA"],
            "CEP": row["CEP"],
            "Telefone": f"({row['DDD_TELEFONE_1']}) {row['TELEFONE_1']}",
            "Email": row["EMAIL"],
        }
        es.index(index="desafio", id=i, body=data)
