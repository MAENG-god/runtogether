from xml.etree.ElementTree import Comment
from django.db import models

# Create your models here.

class Room(models.Model):
    markerposition = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    who = models.CharField(max_length=6)
    date = models.DateField()
    time = models.TimeField()
    comment = models.TextField()