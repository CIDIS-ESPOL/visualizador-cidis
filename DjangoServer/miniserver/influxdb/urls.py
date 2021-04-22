from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   path('cultivos', views.get_cultivos),
   path('fincas', views.get_fincas),
   path('images',views.get_images_grafana)
]
router = routers.DefaultRouter()
urlpatterns = urlpatterns + router.urls