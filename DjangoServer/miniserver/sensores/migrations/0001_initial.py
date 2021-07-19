# Generated by Django 3.1.3 on 2021-07-14 21:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cultivo', '0004_auto_20210714_2131'),
        ('users', '0002_usuario_cultivos'),
        ('finca', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('latitud', models.FloatField()),
                ('longitud', models.FloatField()),
                ('cultivo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cultivo.cultivo')),
                ('finca', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finca.finca')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='RaspBerry',
            fields=[
                ('id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('cultivo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cultivo.cultivo')),
                ('finca', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finca.finca')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.usuario')),
            ],
        ),
    ]
