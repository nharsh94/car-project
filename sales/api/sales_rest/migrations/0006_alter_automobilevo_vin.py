# Generated by Django 4.0.3 on 2024-02-10 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_remove_automobilevo_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17, unique=True),
        ),
    ]