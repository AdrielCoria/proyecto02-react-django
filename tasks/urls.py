# Genera todas las peticiones: GET, POST, PUT, DELETE

from django.urls import path, include
from rest_framework import routers
from tasks import views
from rest_framework.documentation import include_docs_urls

# api versioning
router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'Tasks')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='Task API'))
]
