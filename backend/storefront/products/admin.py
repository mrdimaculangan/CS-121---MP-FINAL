from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'seller')
    readonly_fields = ('seller',)

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.seller = request.user
        obj.save()

admin.site.register(Product, ProductAdmin)