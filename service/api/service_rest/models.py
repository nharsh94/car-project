from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("delete_technician", kwargs={"technician_id": self.pk})

    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "employee_id": self.employee_id,
            # You can add more fields here if needed
        }

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

    def to_json(self):
        technician_data = None
        if self.technician:
            technician_data = self.technician.to_json()

        return {
            "id": self.id,
            "date_time": self.date_time,
            "reason": self.reason,
            "status": self.status,
            "vin": self.vin,
            "customer": self.customer,
            "technician": technician_data,
            # Ensure to handle cases where technician is None
        }
