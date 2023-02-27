from pymongo import MongoClient
from elasticsearch import Elasticsearch


def insert_data_in_mongodb(data) -> None:
    # Inserir os registros no MongoDB
    client = MongoClient("mongodb://mongodb:27017/")
    db = client["desafio"]
    collection = db["estabelecimentos"]
    collection.insert_many(data)
    for document in data:
        if collection.find_one({"CNPJ COMPLETO": document["CNPJ COMPLETO"]}):
            cnpj = document["CNPJ COMPLETO"]
            print(
                "Empresa com CNPJ {} já existe na coleção, pulando para a proxima...".format(
                    document["CNPJ COMPLETO"]
                )
            )
        else:
            result = collection.insert_one(document)
            print("Inserida empresa com CNPJ {}.".format(document["CNPJ COMPLETO"]))


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
