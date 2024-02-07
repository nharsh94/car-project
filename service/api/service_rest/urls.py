from django.urls import path

from .views import technicians, delete_technician, appointments, delete_appointment

urlpatterns = [
    path('service/', technicians, name="technicians"),
    path('service/<int:pk>/', delete_technician, name="delete_technician"),
    path('service/', appointments, name="appointments"),
    path('service/<int:pk>/', delete_appointment, name="delete_appointment")
]
