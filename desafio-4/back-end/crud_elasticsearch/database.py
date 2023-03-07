from elasticsearch import Elasticsearch


def get_database():
    es = Elasticsearch(["http://elasticsearch:9200/"])

    return es
