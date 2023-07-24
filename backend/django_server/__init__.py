from .celery import app as celery_app

# Load celery on django startup 
__all__ = ("celery_app",)
