from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Product
from .serializers import ProductSerializer
from rest_framework.exceptions import PermissionDenied

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def perform_update(self, serializer): #edit/update
        if serializer.instance.seller != self.request.user:
            raise PermissionDenied("You do not have permission to edit this product.")
        serializer.save()

    def perform_destroy(self, instance): #delete
        if instance.seller != self.request.user:
            raise PermissionDenied("You do not have permission to delete this product.")
        instance.delete()
