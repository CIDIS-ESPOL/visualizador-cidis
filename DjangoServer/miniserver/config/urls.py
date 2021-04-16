from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   path('configuracion', views.get_configuracion),
]
router = routers.DefaultRouter()
router.register('configuraciones',views.Configuracion_GrafanaViewSet,'configuraciones')
urlpatterns = urlpatterns + router.urls