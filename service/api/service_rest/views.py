from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
import json
from common.json import ModelEncoder
# from django.http import HttpResponse
from django.core.exceptions import ValidationError

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]

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
        vin = request.GET.get('vin', None)
        if vin is not None:
            appointments = Appointment.objects.filter(vin=vin)
        else:
            appointments = Appointment.objects.all()
        data = [AppointmentDetailEncoder().default(appointment) for appointment in appointments]
        return JsonResponse({"appointments": data}, safe=False, status=200)
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id=content.pop('employee_id'))
            content['technician'] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                AppointmentDetailEncoder().default(appointment),
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse({"error": "Technician with provided employee_id does not exist"}, status=400)
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=400)
    elif request.method == "DELETE":
        content = json.loads(request.body)
        try:
            appointment = Appointment.objects.get(id=content['id'])
            appointment.delete()
            return JsonResponse({"status": "Appointment deleted"}, status=200)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment with provided id does not exist"}, status=400)

@require_http_methods(["DELETE", "PUT"])
def delete_appointment(request, id=None):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({"status": "Appointment deleted"}, status=200)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment with provided id does not exist"}, status=400)
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            appointment = Appointment.objects.get(id=id)
            appointment.status = data.get('status')
            appointment.save()
            return JsonResponse({"status": "Appointment updated"}, status=200)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment with provided id does not exist"}, status=400)
        except ValueError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

def api_auto_list(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder,
        )
