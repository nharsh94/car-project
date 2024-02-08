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

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist."})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=id).update(**content)
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer, 
                encoder=CustomerEncoder,
                safe=False,
            )
        except: 
            return JsonResponse(
                {"message": "Invalid customer"},
                status=500
            )
        
@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer, 
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "Customer does not exist"}
                )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        salespeople = Customer.objects.get(id=id)
        return JsonResponse(
            salespeople,
            encoder=CustomerEncoder,
            safe=False,
        ) 
    
@require_http_methods(["GET", "POST"])
def api_list_sales(request, employee_id=None):
    if request.method == "GET":
       sales = Sale.objects.all()
       return JsonResponse(
           {"sales": sales},
           encoder=SaleEncoder,
           safe=False
       )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist."},
                status=400
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist."},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    
@require_http_methods(["DELETE"])
def delete_sale(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )

@require_http_methods(["GET"])
def api_list_automobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse({
            "automobile": automobiles},
            encoder=AutomobileVOEncoder
            )