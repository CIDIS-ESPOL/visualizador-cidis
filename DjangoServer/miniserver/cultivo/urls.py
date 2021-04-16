from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   path('getCultivos', views.cultivos),
]
router = routers.DefaultRouter()
router.register('cultivos',views.CultivoViewSet,'cultivos')
urlpatterns = urlpatterns + router.urls