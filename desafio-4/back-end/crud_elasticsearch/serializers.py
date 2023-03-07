from rest_framework import serializers
from .models import Estabelecimentos
from .database import get_database


class EstabelecimentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estabelecimentos
        fields = "__all__"
        read_only_fields = ["_id"]

    def create(self, validated_data):
        data = {
            "CNPJ COMPLETO": validated_data["cnpj"],
            "NOME FANTASIA": validated_data["nome"],
            "CEP": validated_data["cep"],
            "TELEFONE": validated_data["telefone"],
            "CORREIO ELETRÔNICO": validated_data["correio"],
        }

        es = get_database()
        es.index(index="desafio-1", id=validated_data["cnpj"], body=data)["result"]

        return {"_id": validated_data["cnpj"], **validated_data}
