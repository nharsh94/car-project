from django.urls import path

from .views import technicians, delete_technician, appointments, delete_appointment

urlpatterns = [
    path('service/technicians/', technicians, name="technicians"),
    path('service/technicians/<int:pk>/', delete_technician, name="delete_technician"),
    path('service/appointments/', appointments, name="appointments"),
    path('service/delete/appointment/<int:pk>/', delete_appointment, name="delete_appointment"),
    # path('servie/cancel/appointment/<int:pk>/', cancel_appointment, name="cancel_appointment"),
    # path('service/finish/appointment/', finish_appointment, name="finish_appointment")

]
