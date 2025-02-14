from django.urls import path
from . import views
#from .views import save_ecg_data

urlpatterns = [
    path('process_ecg_data', views.process_ecg_data, name='process_ecg_data'),
]