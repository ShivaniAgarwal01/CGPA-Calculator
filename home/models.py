from django.db import models

# Create your models here.
class Subjects(models.Model):
    name = models.CharField(max_length=50)
    grade =models.CharField(max_length=2)
    credit = models.IntegerField()

    # grade = models.
    
    def __str__(self) :
        return self.name
    class Meta:
        app_label = 'home' 