from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment
from common.json import ModelEncoder
import json

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "date_time", "reason", "status", "vin", "customer", "technician"]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]

@require_http_methods(["GET", "POST"])
def technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        serialized_technicians = [TechnicianDetailEncoder().default(technician) for technician in technicians]
        return JsonResponse({"technicians": serialized_technicians})
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(technician, encoder=TechnicianDetailEncoder, safe=False, status=201)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def delete_technician(technician_id):
    try:
        technician = Technician.objects.get(id=technician_id)
        technician.delete()
        return JsonResponse({"message": f"Technician with id {technician_id} deleted successfully."})
    except:
        return JsonResponse({"message": f"Technician with id {technician_id} does not exist."}, status=404)

@require_http_methods(["GET", "POST"])
def appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        serialized_appointments = [AppointmentDetailEncoder().default(appointment) for appointment in appointments]
        return JsonResponse({"appointments": serialized_appointments})
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.create(**content)
            return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False, status=201)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def delete_appointment(appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        appointment.delete()
        return JsonResponse({"message": f"Appointment with id {appointment_id} deleted successfully."})
    except:
        return JsonResponse({"message": f"Appointment with id {appointment_id} does not exist."}, status=404)
