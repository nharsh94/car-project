from django.shortcuts import render
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Salesperson, Customer, Sale

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
        "year",
        "color",
        "sold"
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]
class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "salesperson",
        "automobile",
        "customer",
        "price",
        "id"
    ]
    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.vin,
            "salesperson": {
                "name": o.salesperson.name, 
                "employee_id": o.salesperson.id,
            },
            "customer": o.customer.name
        }
    
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder = SalespersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid salesperson"},
                status=500,
            )

# @require_http_methods(["GET"])
# def api_list_automobiles(request):
#     if request.method == "GET":
#         autos = AutomobileVO.objects.all()
#         return JsonResponse(
#             autos,
#             encoder = AutomobileVOEncoder,
#             safe=False,
#         )