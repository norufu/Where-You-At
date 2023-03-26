from django.shortcuts import render
from where.quickstart import views
from django.http import HttpResponse

# Create your views here.

# @api_view(['POST'])
def index(test):
    print("index call")

    # if(request.method == 'POST'):
    #     print('post')
    return HttpResponse('yup')
