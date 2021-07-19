from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   path('raspberry/<str:id>',views.rapsberry),
   path('getsensoresall/<str:bucket>',views.sensoresAll),
   path('getsensoresR/<str:cultivo>/<str:finca>/<str:bucket>',views.sensoresR),
   path('sensor/<str:id>',views.sensor)
]
router = routers.DefaultRouter()
router.register('raspberry',views.RaspBerryViewSet,'raspberry')
router.register('sensores',views.SensorViewSet,'sensores')
urlpatterns = urlpatterns + router.urls