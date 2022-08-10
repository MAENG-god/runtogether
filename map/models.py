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
    
    def to_json(self):
        return{
            "markerposition": self.markerposition,
            "title": self.title,
            "who": self.who,
            "date": self.date,
            "time": self.time,
            "comment": self.comment
        }