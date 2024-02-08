from django.urls import path
from .views import technicians, delete_technician, appointments, delete_appointment

urlpatterns = [
    path('service/technicians/', technicians, name="technicians"),
    path('service/technicians/<int:pk>/', delete_technician, name="delete_technician"),

    path('service/appointments/', appointments, name="appointments"),
    path('service/appointments/<int:pk>/', appointments, name="delete_or_update_appointment"),
    path('service/appointments/<int:pk>/', delete_appointment, name="delete_appointment"),
]
