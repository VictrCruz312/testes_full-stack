from .database import get_database
from rest_framework.views import APIView, Response, status

from .serializers import EstabelecimentosSerializer
from bson import ObjectId


class EstabelecimentsListCreate(APIView):
    def get(self, request):
        try:
            db = get_database()
            collection = db["estabelecimentos"]
            estabelecimentos = collection.find()
            estabelecimentos_list = list(estabelecimentos)
            for index, estabelecimento in enumerate(estabelecimentos_list):
                estabelecimentos_list[index]["_id"] = str(estabelecimento["_id"])
            print("", estabelecimentos_list)
            return Response(estabelecimentos_list, status=status.HTTP_200_OK)
        except:
            return Response(
                {"detail": "Erro interno"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        db = get_database()
        collection = db["estabelecimentos"]

        exists_cnpj = collection.find_one({"CNPJ COMPLETO": request.data["cnpj"]})
        if exists_cnpj:
            return Response(
                {
                    "detail": "Estabelecimento com cnpj {} já existe".format(
                        request.data["cnpj"]
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = EstabelecimentosSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EstabelecimentsUpdateDestroy(APIView):
    def patch(self, request, estabelecimento_id):
        serializer = EstabelecimentosSerializer(data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)

        document = {}
        chave_name = {
            "cnpj": "CNPJ COMPLETO",
            "nome": "NOME FANTASIA",
            "cep": "CEP",
            "telefone": "TELEFONE",
            "correio": "CORREIO ELETRÔNICO",
        }

        for key, value in serializer.validated_data.items():
            document[chave_name[key]] = value

        db = get_database()
        collection = db["estabelecimentos"]

        collection.update_one({"_id": ObjectId(estabelecimento_id)}, {"$set": document})

        get_inserted = collection.find_one({"_id": ObjectId(estabelecimento_id)})
        if not get_inserted:
            return Response(
                {
                    "detail": "Estabelecimento com id {} não encontrado".format(
                        estabelecimento_id
                    )
                }
            )
        get_inserted["_id"] = str(get_inserted["_id"])

        return Response(get_inserted, status=status.HTTP_200_OK)

    def delete(self, request, estabelecimento_id):
        db = get_database()
        collection = db["estabelecimentos"]

        get_inserted = collection.find_one({"_id": ObjectId(estabelecimento_id)})

        if not get_inserted:
            return Response(
                {
                    "detail": "Estabelecimento com id {} não encontrado".format(
                        estabelecimento_id
                    )
                }
            )

        collection.delete_one({"_id": ObjectId(estabelecimento_id)})

        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, estabelecimento_id):
        db = get_database()
        collection = db["estabelecimentos"]
        estabelecimento = collection.find_one({"_id": ObjectId(estabelecimento_id)})

        if not estabelecimento:
            return Response(
                {
                    "detail": "Estabelecimento com id {} não encontrado".format(
                        estabelecimento_id
                    )
                }
            )
        estabelecimento["_id"] = str(estabelecimento["_id"])

        return Response(estabelecimento, status=status.HTTP_200_OK)
