from treat_and_save.treat import data_processing
from treat_and_save.save import insert_data_in_elasticsearch, insert_data_in_mongodb


if __name__ == "__main__":
    # Chamada da função para tratar os dados do arquivo a ser baixado (retorna os dados tratados)
    data = data_processing(
        url="https://dadosabertos.rfb.gov.br/CNPJ/Estabelecimentos9.zip",
        file_name_to_extract="Estabelecimentos9.zip",
        file_name_ends_with=".ESTABELE",
        line_limit_for_reading=10,
    )
    insert_data_in_mongodb(data)
    # insert_data_in_elasticsearch(data)
