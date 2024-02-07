from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=300, unique=True, blank=True)
    vin = models.CharField(max_length=100)
    year = models.PositiveSmallIntegerField()
    color = models.CharField(max_length=50)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

class Salesperson(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    employee_id = models.CharField(max_length=25, unique=True, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
class Customer(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name = "sales",
        on_delete=models.PROTECT,
    )
    price = models.CharField(max_length=50)
    
    def __str__(self):
        return f'{self.salesperson} {self.automobile} {self.customer}'
