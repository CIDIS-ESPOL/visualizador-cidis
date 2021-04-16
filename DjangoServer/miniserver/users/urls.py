from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   path('login', views.login),
]
router = routers.DefaultRouter()
router.register('usuarios',views.UsuarioViewSet,'usuarios')
urlpatterns = urlpatterns + router.urls