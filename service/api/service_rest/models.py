from django.db import models
from django.urls import reverse
from datetime import datetime

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

    def formatted_date_time(self):
        if isinstance(self.date_time, str):
            self.date_time = datetime.strptime(self.date_time, '%Y-%m-%dT%H:%M:%SZ')
        return self.date_time.strftime('%Y-%m-%dT%H:%M:%SZ')

    def toJSON(self):
        return {
            "id": self.id,
            "date_time": self.formatted_date_time(),
            "reason": self.reason,
            "status": self.status,
            "vin": self.vin,
            "customer": self.customer,
            "technician": self.technician_id
        }
