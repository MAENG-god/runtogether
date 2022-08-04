from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
# Create your views here.

def map(request):
    template = loader.get_template("map/map.html")
    context = {
        
    }
    return HttpResponse(template.render(context, request))