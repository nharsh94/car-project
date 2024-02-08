from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment
import json
from common.json import ModelEncoder
from django.http import HttpResponse

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "date_time", "reason", "status", "vin", "customer", "technician"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]

@require_http_methods(["GET", "POST"])
def technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            technician, encoder=TechnicianDetailEncoder, safe=False)
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False)
        except:
           response = JsonResponse(
               {"message": "Could not create a technician"}
           )
           response.status_code = 400
           return response


@require_http_methods(["DELETE"])
def delete_technician(request, pk=None):
    if request.method == "DELETE":
        deleted, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted" : deleted > 0})

@require_http_methods(["GET", "POST", "PUT"])
def appointments(request, pk=None):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            list(appointments.values()),
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                {"message": "Appointment created successfully"},
                status=201
            )
        except Exception as e:
            response = JsonResponse(
                {"message": f"Could not create an appointment: {str(e)}"}
            )
            response.status_code = 400
            return response

    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            appointment = Appointment.objects.get(id=pk).update
            if "cancel" in request.path:
                appointment.status = "canceled"
            elif "finish" in request.path:
                appointment.status = "finished"
            appointment.save()
            return HttpResponse(status=200)
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": f"Appointment with id {pk} does not exist"},
                status=404
            )
            return response
        except Exception as e:
            response = JsonResponse(
                {"message": f"Error updating appointment: {str(e)}"},
                status=500
            )
            return response
    else:
        return JsonResponse(
            {"message": "Method not allowed"},
            status=405
        )

@require_http_methods(["DELETE"])
def delete_appointment(request, pk=None):
    if request.method == "DELETE":
        deleted, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted" : deleted > 0})
