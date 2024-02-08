import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
from service_rest.models import AutomobileVO
# from service_rest.models import Something


def poll():
    while True:
        print('Service poller polling for data')
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = response.json()
            # print(content)
            autos = content.get("autos", [])
            for automobile in autos:
                # print("auto being saved", automobile)
                AutomobileVO.objects.update_or_create(
                    import_href=automobile["href"],
                    vin=automobile["vin"],
                    defaults={
                        "sold":automobile["sold"]
                    }
                )

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)
if __name__ == "__main__":
    poll()
