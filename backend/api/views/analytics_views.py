from datetime import datetime, timedelta
from api.models import User, Post, UserLoginHistory, DeletedPostReference, Comment
from django.db.models import Count
from django.db import connection
from django.db.models import Q
from django.db.models.functions import TruncDate, ExtractHour, ExtractWeekDay
from api.constants import user_roles, relationships, genders
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.request import Request

#
# Views for getting analytics about FlashLyf
#

# Returns the total count of current users by role  
@api_view(["GET"])
def get_count_current_users_by_role(request, role):
    if role not in user_roles.LIST:
        payload = {'success': False, "message": f"The role: {role} does not exist."}
        return Response(payload, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    user_count = User.objects.filter(user_role=role).count()
    payload = {'success': True, "total_users": user_count, "role": role, "timestamp": datetime.now()}
    return Response(payload, status=status.HTTP_200_OK)

# Returns the user_id and username of the top Y users ordered from high to low
# most active in the last X hours
# Limit Y = 100
# Limit X = 48 hours
# Most active is defined as combination of created posts and comments
@api_view(["GET"])
def get_most_active_users(request):
    limit_users = int(request.GET.get('limit_users', 5))
    limit_hours = int(request.GET.get('limit_hours', 1))
    # Limit constrictions
    if limit_users < 5:
        limit_users = 5
    if limit_users > 100:
        limit_users = 100
    if limit_hours < 1:
        limit_hours = 1
    if limit_hours > 48:
        limit_hours = 48
    time_threshold = datetime.now() - timedelta(hours=limit_hours)

    # Query the users and annotate their activity count
    users = User.objects.annotate(
        activity_count=Count('post') + Count('comment')
    ).filter(
        Q(post__created_at__gte=time_threshold) | Q(comment__created_at__gte=time_threshold)
    ).order_by('-activity_count')[:limit_users]
    # Response data
    most_active_users = [
            {   "user_id": user.id, 
                "username": user.username, 
                "activity_count": user.activity_count
            }
        for user in users
        ]
    payload = {'success': True, 'most_active_users': most_active_users, 'timestamp': datetime.now()}
    return Response(payload, status=status.HTTP_200_OK)

# Get the total count of logins in the past limit_hours
# TODO: # Country filtering?
@api_view(["GET"])
def get_count_total_login(request):
    # If no limit_hours is given set it to last hour
    limit_hours = int(request.GET.get('limit_hours', 1))
    # Limit the login history count to the last 48 hours
    if limit_hours > 48:
        limit_hours = 48
    time_threshold = datetime.now() - timedelta(hours=limit_hours)
    # Count the login records within the time threshold
    login_count = UserLoginHistory.objects.filter(login_time__gte=time_threshold).count()
    payload = {'success': True, 'login_count': login_count, 'timestamp': datetime.now()}
    return Response(payload, status=status.HTTP_200_OK)

# Get the average login per day, over a period of limit_days
@api_view(["GET"])
def average_logins(request):
    #If no limit_days is given set it to 1 day
    limit_days = int(request.GET.get('limit_days', 1))
    # Limit the login period to the last 30 days
    if limit_days > 30:
        limit_days = 30
    # Calculate the start and end date for the time period
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=limit_days)
    # Query the UserLoginHistory table
    login_count = UserLoginHistory.objects.filter(
        login_time__date__range=(start_date, end_date)
    ).annotate(date=TruncDate('login_time')).values('date').annotate(count=Count('id')).values('date', 'count')
    # Calculate the average logins per day
    average_logins = sum(entry['count'] for entry in login_count) / limit_days
    payload = {"success": True, "average_logins": average_logins, 'timestamp': datetime.now()}
    return Response(payload, status=status.HTTP_200_OK)

# If time is added get total posts in the last X minutes
# If no time is added get total of all posts
@api_view(["GET"])
def get_count_current_posts(request):
    limit_minutes = int(request.GET.get('limit_minutes', 0))
    if limit_minutes == 0:
        post_count = Post.objects.all().count()
    else:
        time_threshold = datetime.now() - timedelta(minutes=limit_minutes)
        post_count = Post.objects.filter(created_at__gte=time_threshold).count()
    payload = {"success": True, "post_count": post_count, "timestamp": datetime.now()}
    return Response(payload, status=status.HTTP_200_OK) 

# Returns how many posts were created on each weekday.
# And how many posts were created per hour per weekday.
# NOTE: This also includes count of created posts that were deleted
@api_view(["GET"])
def count_post_created_per_hour_and_weekday(request):
    limit_days = int(request.GET.get('limit_days', 7))
    # limit_days under 7 days not allowed because we get the data from a full week
    if limit_days < 7:
        limit_days = 7
    # Calculate the start and end date for the limit_day period
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=limit_days)
    # Query the Post table and group the count of posts per hour and weekday
    post_counts = Post.objects.filter(
        created_at__date__range=(start_date, end_date)
    ).annotate(hour=ExtractHour('created_at'), weekday=ExtractWeekDay('created_at')).values('hour', 'weekday').annotate(count=Count('id'))
    # Query the DeletedPostReference table and group the count of deleted posts per hour and weekday
    deleted_post_counts = DeletedPostReference.objects.filter(
        created_at__date__range=(start_date, end_date)
    ).annotate(hour=ExtractHour('created_at'), weekday=ExtractWeekDay('created_at')).values('hour', 'weekday').annotate(count=Count('id'))
    
    # Create a dictionary to store the count of posts per hour and weekday
    data = []
    for weekday in range(1, 6):
        weekday_data = {
            'day': calendar.day_name[weekday],
            'count': 0,
            'hours': []
        }
        for hour in range(24):
            weekday_data['hours'].append({'hour': str(hour).zfill(2), 'count': 0})
        data.append(weekday_data)

    # Add the counts for created posts are did not get deleted
    for entry in post_counts:
        hour = entry['hour']
        weekday = entry['weekday']
        count = entry['count']
        data[weekday - 1]['count'] += count
        data[weekday - 1]['hours'][hour]['count'] = count
    # Add the counts for created posts that got deleted
    for entry in deleted_post_counts:
        hour = entry['hour']
        weekday = entry['weekday']
        count = entry['count']
        data[weekday - 1]['deleted_count'] += count
        data[weekday - 1]['hours'][hour]['deleted_count'] = count

    payload = {"success": True, "weekday_hour_counts": data, "timestamp": datetime.now()}
    return Response(payload, status=status.HTTP_200_OK)

# Returns the count of how many posts were deleted in the past limit_days
# Grouped by delete reason
def count_deleted_posts(request):
    limit_days = int(request.GET.get('limit_days', 1))
    if limit_days < 1:
        limit_days = 1
    # Calculate the date limit_days days ago from today
    time_threshold = datetime.now() - timedelta(days=limit_days)
    # Query the deleted posts and group them by delete_reason
    deleted_counts = (
        DeletedPostReference.objects
        .filter(deleted_at__gte=time_threshold)
        .values('delete_reason')
        .annotate(count=Count('id'))
        .order_by()
    )
    # Calculate the total count of deleted posts
    total_count = sum(count['count'] for count in deleted_counts)
    # Prepare the response
    deleted_post_counts = {
        'user deleted': 0,
        'moderator deleted': 0,
        'auto deleted': 0,
        'total': total_count
    }
    # Update the response dictionary with the counts
    for count in deleted_post_counts:
        deleted_post_counts[count['delete_reason']] = count['count']

    payload = {"success": True, "deleted_post_counts": deleted_post_counts, "timestamp": datetime.now()}
    return Response(payload, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_database_size(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT pg_size_pretty(pg_database_size(current_database()))")
            db_size = cursor.fetchone()[0]
        payload = {"success": True, "database_size": db_size, "timestamp": datetime.now()}
        return Response(payload, status=status.HTTP_200_OK) 
    except Exception("Internal error") as e:
        payload = {"success": True, "message": e}
        return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
