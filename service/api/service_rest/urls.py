from django.urls import path

from .views import technicians, delete_technician, appointments, delete_appointment

urlpatterns = [
    path('service/technicians/', technicians, name="technicians"),
    path('service/technicians/<int:pk>/', delete_technician, name="delete_technician"),
    path('service/delete/appointment/<int:pk>/', delete_appointment, name="delete_appointment"),

    path('service/appointments/', appointments, name="appointments"),
    # path('service/cancel/appointment/<int:pk>/', cancel_appointment, name="cancel_appointment"),
    # path('service/finish/appointment/<int:pk>/', finish_appointment, name="finish_appointment")

]
