import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_celery.settings")
# Create the Celery app instance
app = Celery("django_server")
# The namespace=CELERY so every setting related to celery in settings.py needs to be prefixed with CELERY_
app.config_from_object("django.conf:settings", namespace="CELERY")
# Find celery tasks in tasks.py
app.autodiscover_tasks()
