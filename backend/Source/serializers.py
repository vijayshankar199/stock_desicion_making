from rest_framework import serializers
from.models import StockDecision

class StockDecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockDecision
        fields = '__all__'