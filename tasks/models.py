from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200) # Indicamos que este campo es un texto (Restringimos caracteres)
    description = models.TextField(blank=True) # Texto, donde inicialmente el campo esta vacio.
    done = models.BooleanField(default=False) # Boleano
    
    def __str__(self):
        return self.title