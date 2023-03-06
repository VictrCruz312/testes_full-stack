from pymongo import MongoClient


def get_database():
    client = MongoClient("mongodb", 27017)

    db = client["desafio-1"]

    return db
