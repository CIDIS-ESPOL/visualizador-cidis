from django.db import models
from django.utils.dateparse import parse_date
from django.forms import ModelForm
from django.contrib.auth.models import User

# Create your models here.
class Usuario(models.Model):
    bucket_name = models.CharField(max_length=200)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None,null=True)

    class UsuarioForm(ModelForm):
        class Meta:
            ordering = ["user.username","bucket_name"]
            verbose_name = "Usuario"

    def __str__(self):
        return self.user.first_name + ' - ' + self.user.last_name
