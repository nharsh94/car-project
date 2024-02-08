# Generated by Django 4.0.3 on 2024-02-06 20:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='vehicleSold',
        ),
        migrations.RemoveField(
            model_name='sale',
            name='price',
        ),
        migrations.RemoveField(
            model_name='salesperson',
            name='address',
        ),
        migrations.RemoveField(
            model_name='salesperson',
            name='phone_number',
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='salesperson',
            name='employee_id',
            field=models.CharField(blank=True, max_length=25, unique=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(blank=True, max_length=300, unique=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='salesperson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]
