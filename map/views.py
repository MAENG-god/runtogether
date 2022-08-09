from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.template import loader
# Create your views here.
from .models import Room
import json

def map(request):
    roomlist = Room.objects.all()
    template = loader.get_template("map/map.html")
    context = {
        "roomlist": roomlist,
    }
    return HttpResponse(template.render(context, request))

def makeroom(request):
    if request.method == "POST":
        markerposition = request.POST["latling"]
        title = request.POST["roomname"]
        who = request.POST["gender"]
        date = request.POST["date"]
        time = request.POST["time"]
        comment = request.POST["comment"]
        Room.objects.create(markerposition=markerposition, title=title, who=who, date=date, time=time, comment=comment)
        return redirect("/")