from rest_framework import serializers
from .models import Estabelecimentos
from .database import get_database


class EstabelecimentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estabelecimentos
        fields = "__all__"
        read_only_fields = ["_id"]

    def create(self, validated_data):
        document = {
            "CNPJ COMPLETO": validated_data["cnpj"],
            "NOME FANTASIA": validated_data["nome"],
            "CEP": validated_data["cep"],
            "TELEFONE": validated_data["telefone"],
            "CORREIO ELETRÔNICO": validated_data["correio"],
        }

        db = get_database()
        collection = db["estabelecimentos"]
        insert_result = collection.insert_one(document)

        if not insert_result.acknowledged:
            raise serializers.ValidationError(
                "Houve um problema ao inserir o documento no banco de dados."
            )

        return {**validated_data, "_id": insert_result.inserted_id}
