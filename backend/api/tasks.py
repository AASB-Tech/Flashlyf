from datetime import datetime, timedelta
from django.utils import timezone
#from __future__ import absolute_import
from django_server.celery import app
from celery import shared_task
from api.models import Post, DeletedPostReference
#from django.core.mail import send_mail

#@shared_task(name='delete_expired_posts')
# This task runs on a schedule
@app.task
def delete_expired_posts():
    # Get the posts that have expired.
    posts = Post.objects.filter(expires_at__lte=timezone.now())
    for post in posts:
        # Save a reference of the deleted post for analytics usage
        deleted_post_ref = DeletedPostReference.objects.create(
                                                user=post.user, 
                                                post_id=post.id,
                                                delete_reason="post expired",
                                                time_added=post.time_added,
                                                time_removedd=post.time_removed,
                                                created_at=post.created_at,
                                                )
        post.delete()
    
    return True

# Test if celery is working
@shared_task(name='test_task')
def test_task():
    print(f"Hello from Celery task worker/scheduler @ {timezone.now}")
    return True

# @shared_task(name='email_task')
# def email_task(arg1, arg2):
#     # For example, you can send an email or perform some background processing
#     send_mail('Subject', 'Message', 'from@example.com', ['to@example.com'])
