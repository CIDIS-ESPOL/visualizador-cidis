from users.models import Usuario
from django.db import models
from django.forms import ModelForm

# Create your models here.
class Finca(models.Model):
    id = models.IntegerField(primary_key=True,auto_created=True)
    nombre = models.CharField(max_length=200,unique=True)
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    class FincaForm(ModelForm):
        class Meta:
            ordering = ["nombre"]
            verbose_name = "Finca"

    def __str__(self):
        return self.nombre
