from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='product_images/')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # default to superuser

    def __str__(self):
        return self.name
