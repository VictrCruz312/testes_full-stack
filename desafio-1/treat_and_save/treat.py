import os
import urllib.request
import zipfile
import pprint

from tqdm import tqdm
import pandas as pd


def data_processing(
    url: str,
    file_name_to_extract: str,
    file_name_ends_with: str,
    line_limit_for_reading: int,
):
    # 1. definir váriaveis de configuração
    file_path = "./cache/"

    # 2. Verificar se o arquivo já existe no cache, caso não existir realizar o download

    if not os.path.exists(file_path + file_name_to_extract):
        with tqdm(unit="B", unit_scale=True, unit_divisor=1024) as progress:
            urllib.request.urlretrieve(
                url,
                file_path + file_name_to_extract,
                reporthook=lambda blocknum, blocksize, total: progress.update(
                    blocknum * blocksize - progress.n
                ),
            )

    # 3 Extrair arquivos
    zip_file = zipfile.ZipFile(file_path + file_name_to_extract)

    target_file = None
    for file in zip_file.namelist():
        if file.endswith(file_name_ends_with):
            target_file = file
            break

        # 3.1. Verifique se o arquivo foi encontrado
    if target_file is None:
        print(
            f"Arquivo com fim do nome sendo: '{file_name_ends_with}' não encontrado no arquivo '{file_name_to_extract}'."
        )
    else:
        # 3.2. Extraia o arquivo
        if os.path.exists(file_path + target_file):
            os.remove(file_path + target_file)

        zip_file.extract(target_file, path=file_path)
        print(f"Arquivo {target_file} extraído com sucesso.")

    # 4. Tratamento de dados

    # 4.1. Ler o arquivo CSV e converter para um DataFrame nomeando as colunas.
    df = pd.read_csv(
        file_path + target_file,
        sep=";",
        encoding="ISO-8859-1",
        nrows=line_limit_for_reading,
        usecols=[
            "CNPJ BÁSICO",
            "CNPJ ORDEM",
            "CNPJ DV",
            "NOME FANTASIA",
            "CEP",
            "DDD 1",
            "TELEFONE 1",
            "CORREIO ELETRÔNICO",
        ],
        names=[
            "CNPJ BÁSICO",
            "CNPJ ORDEM",
            "CNPJ DV",
            "IDENTIFICADOR MATRIZ/FILIAL",
            "NOME FANTASIA",
            "SITUAÇÃO CADASTRAL",
            "DATA SITUAÇÃO CADASTRAL",
            "MOTIVO SITUAÇÃO CADASTRAL",
            "NOME DA CIDADE NO EXTERIOR",
            "PAIS",
            "DATA DE INÍCIO ATIVIDADE",
            "CNAE FISCAL PRINCIPAL",
            "CNAE FISCAL SECUNDÁRIA",
            "TIPO DE LOGRADOURO",
            "LOGRADOURO",
            "NÚMERO",
            "COMPLEMENTO",
            "BAIRRO",
            "CEP",
            "UF",
            "MUNICÍPIO",
            "DDD 1",
            "TELEFONE 1",
            "DDD 2",
            "TELEFONE 2",
            "DDD DO FAX",
            "FAX",
            "CORREIO ELETRÔNICO",
            "SITUAÇÃO ESPECIAL",
            "DATA DA SITUAÇÃO ESPECIAL",
        ],
    )
    # 4.1. Criar coluna "CNPJ completo"
    df["CNPJ COMPLETO"] = (
        df["CNPJ BÁSICO"].astype(str).str.zfill(8)
        + df["CNPJ ORDEM"].astype(str).str.zfill(4)
        + df["CNPJ DV"].astype(str).str.zfill(2)
    )

    # 4.2. Criar coluna "TELEFONE"
    df["TELEFONE"] = df["DDD 1"].astype(str).str.zfill(3) + df["TELEFONE 1"].astype(str)

    # 4.3. Reorganizar DataFrame para manter apenas as colunas a serem utilizadas
    df = df[
        [
            "CNPJ COMPLETO",
            "NOME FANTASIA",
            "CEP",
            "TELEFONE",
            "CORREIO ELETRÔNICO",
        ]
    ]
    data = df.to_dict(orient="records")
    pprint.pprint(data)
    return data
