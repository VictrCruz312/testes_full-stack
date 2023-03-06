from django.urls import path
from .views import EstabelecimentsListCreate, EstabelecimentsUpdateDestroy

urlpatterns = [
    path("estabelecimentos/", EstabelecimentsListCreate.as_view(), name="ListCreate"),
    path(
        "estabelecimentos/<str:estabelecimento_id>",
        EstabelecimentsUpdateDestroy.as_view(),
        name="UpdateDestroy",
    ),
]
