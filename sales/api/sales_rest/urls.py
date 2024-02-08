from django.urls import path
from .views import api_list_salespeople, api_list_customers, api_delete_salesperson, api_list_sales, api_delete_customer, api_change_sale

urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:id>/", api_delete_salesperson, name="api_delete_salesperson"),
    path("customers/", api_list_customers, name="api_list_customer"),
    path("customers/<int:id>/", api_delete_customer, name="api_delete_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>", api_change_sale, name="api_change_sale")
]