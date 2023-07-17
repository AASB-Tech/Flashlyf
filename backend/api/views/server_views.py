from django_redis import cache
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(["GET"])
def ping(request):
    payload = {"message": "pong!"}
    return Response(payload, status=status.HTTP_200_OK)
    
# Clears the entire Redis Cache
# Note: this only deletes the data set with cache.set()
# It does not empty the entire Redis database.
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def clear_cache(request):
    cache.clear()
    # for key in cache.keys():
    #    cache.delete(key)
    payload = {"message": "Redis Server cache has been cleared."}
    return Response(payload, status=status.HTTP_200_OK)
