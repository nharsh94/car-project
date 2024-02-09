from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment
import json
from common.json import ModelEncoder
# from django.http import HttpResponse


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "date_time", "reason", "status", "vin", "customer", "technician"]

    def default(self, obj):
        if isinstance(obj, Appointment):
            appointment_data = {
                "id": obj.id,
                "date_time": obj.date_time,
                "reason": obj.reason,
                "status": obj.status,
                "vin": obj.vin,
                "customer": obj.customer,
                "technician": None
            }
            if obj.technician:
                appointment_data["technician"] = {
                    "id": obj.technician.id,
                    "first_name": obj.technician.first_name,
                    "last_name": obj.technician.last_name,
                    "employee_id": obj.technician.employee_id

                }
            return appointment_data
        else:
            return super().default(obj)


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

@require_http_methods(["GET", "POST"])
def appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(appointments, encoder=AppointmentDetailEncoder, safe=False)

    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                {"appointment_id": appointment.id},
                status=201
            )
        except Exception as e:
            response = JsonResponse(
                {"message": "Could not create the appointment", "error": str(e)}
            )
            response.status_code = 400
            return response
    else:
        return JsonResponse({"message": "Method Not Allowed"}, status=405)

@require_http_methods(["DELETE"])
def delete_appointment(request, pk=None):
    if request.method == "DELETE":
        deleted, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted" : deleted > 0})
