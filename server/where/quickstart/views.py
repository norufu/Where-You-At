from django.shortcuts import render
from where.quickstart import views
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['POST'])
@csrf_exempt
def index(request):
    data = request.data


    #parse the data here
    #-
    #-


    return HttpResponse('yup')
