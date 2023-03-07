from .database import get_database
from rest_framework.views import APIView, Response, status

from .serializers import EstabelecimentosSerializer
from bson import ObjectId


class EstabelecimentsListCreate(APIView):
    def get(self, request):
        try:
            es = get_database()
            result = es.search(index="desafio-1", body={"query": {"match_all": {}}})
            estabelecimentos_list = result["hits"]["hits"]

            estabelecimentos_return = []
            if len(estabelecimentos_list) > 0:
                for estabeleciment in estabelecimentos_list:
                    estabeleciment = {
                        "_id": estabeleciment["_id"],
                        **estabeleciment["_source"],
                    }
                    estabelecimentos_return.append(estabeleciment)

            return Response(estabelecimentos_return, status=status.HTTP_200_OK)
        except:
            return Response(
                {"detail": "Erro interno"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        es = get_database()
        if es.exists(index="desafio-1", id=request.data["cnpj"]):
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
        es = get_database()

        if not es.exists(index="desafio-1", id=estabelecimento_id):
            return Response(
                {
                    "detail": "Estabelecimento com cnpj {} não existe".format(
                        estabelecimento_id
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = EstabelecimentosSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        data = {}
        chave_name = {
            "cnpj": "CNPJ COMPLETO",
            "nome": "NOME FANTASIA",
            "cep": "CEP",
            "telefone": "TELEFONE",
            "correio": "CORREIO ELETRÔNICO",
        }

        for key, value in serializer.validated_data.items():
            data[chave_name[key]] = value

        updated = es.update(
            index="desafio-1",
            id=estabelecimento_id,
            body={"doc": data},
        )

        if updated["result"] == "updated":
            updated_doc = es.get(index="desafio-1", id=estabelecimento_id)["_source"]
            return Response(
                {"_id": estabelecimento_id, **updated_doc}, status=status.HTTP_200_OK
            )

        return Response(
            {"detail": "nenhum campo atualizado"}, status=status.HTTP_200_OK
        )

    def delete(self, request, estabelecimento_id):
        es = get_database()

        if not es.exists(index="desafio-1", id=estabelecimento_id):
            return Response(
                {
                    "detail": "Estabelecimento com cnpj {} não existe".format(
                        estabelecimento_id
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        es.delete(index="desafio-1", id=estabelecimento_id)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, estabelecimento_id):
        es = get_database()
        try:
            response = es.get(index="desafio-1", id=estabelecimento_id)
        except:
            return Response(
                {
                    "detail": "Estabelecimento com id {} não encontrado".format(
                        estabelecimento_id
                    )
                }
            )

        return Response(
            {"_id": estabelecimento_id, **response["_source"]},
            status=status.HTTP_200_OK,
        )
