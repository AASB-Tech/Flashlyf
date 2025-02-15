from django.contrib.auth import authenticate, login, logout
#from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.models import User, UserLoginHistory
from api.utils.get_client_ip import get_client_ip
from api.serializers import UserRegisterSerializer

@api_view(["POST"])
def register(request):
    # Serialize, validate and create
    serializer = UserRegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = User.objects.create_user(**serializer.validated_data)
    
    # return success response
    payload = {"message": f"User {user.username} registered successfully."}
    return Response(payload, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@ensure_csrf_cookie
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, username=email, password=password)
    if user:
        login(request, user)
        # Store ip address used to login
        ip_address = get_client_ip(request)
        user.last_ipv4 = ip_address
        user.save()
        user_login_history = UserLoginHistory.objects.create(user=user, login_ipv4=ip_address)
        #user_login_history = UserLoginHistory(user=user, login_ipv4=ip_address)
        #user_login_history.save()
        # Add user data to the user session
        user_info = {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
        request.session.update(user_info) # This does not work???
        request.session['id'] = str(user.id)
        request.session['username'] = user.username
        request.session['email'] = user.email
        request.session['role'] = user.role
        payload = {"data": {"user": user_info},
                    "message": "User logged in."}
        return Response(payload)
    else:
        payload = {"success": False, "message": "Invalid email or password."}
        return Response(payload, status=status.HTTP_403_FORBIDDEN)

@api_view(["POST"])
def logout_view(request):
    logout(request)
    payload = {"message": "Logged out."}
    return Response(payload)

# Check if a user is (already) logged in or not.
# Returns the session info if the user is logged in already.
@api_view(["GET"])
def check_auth(request):
    has_user = request.user.is_authenticated
    has_session = bool(request.session.session_key)
    user = request.user
    isAuth = False
    role = "guest"
    user_id = None
    username = None
    if has_user and has_session and hasattr(user, "user_role"):
        isAuth = True
        role = user.user_role
        user_id = user.id
        username = user.username        
    payload = {
        "data": {
            "isAuth": isAuth,
            "role": role,
            "user_id": user_id,
            "username": username
        }
    }
    return Response(payload, status=status.HTTP_200_OK)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_password(request):
    new_password = request.data.get("newPassword")
    user = request.user
    user.set_password(new_password)
    user.save()
    payload = {"message": "Password changed."}
    return Response(payload, status=status.HTTP_200_OK)
