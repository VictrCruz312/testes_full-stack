from django.db import models


class Estabelecimentos(models.Model):
    _id = models.CharField(unique=True, max_length=255)
    cnpj = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)
    cep = models.CharField(max_length=10)
    telefone = models.IntegerField()
    correio = models.CharField(max_length=200)
