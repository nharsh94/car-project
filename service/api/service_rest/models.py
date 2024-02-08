from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("delete_technician", kwargs={"technician_id": self.pk})

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=300, unique=True, blank=True)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("delete_appointment", kwargs={"appointment_id": self.pk})
