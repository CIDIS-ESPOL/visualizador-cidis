from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   path('fincas', views.get_fincas),
]
router = routers.DefaultRouter()
router.register('fincas',views.FincaViewSet,'fincas')
urlpatterns = urlpatterns + router.urls