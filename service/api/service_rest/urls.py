from django.urls import path

from .views import technicians, delete_technician, delete_appointment, appointments

urlpatterns = [
    path('service/technicians/', technicians, name="technicians"),
    path('service/technicians/<int:pk>/', delete_technician, name="delete_technician"),
    path('service/appointment/<int:id>/', delete_appointment, name="delete_appointment"),
    path('service/appointments/', appointments, name="appointments"),


]
