from rest_framework.response import Response
from rest_framework.views import APIView
import yfinance as yf
from datetime import date as dt
from .Fetch import stocks
from .Analyze import analyse
from .predict import Predict
from .models import StockDecision
from .serializers import StockDecisionSerializer

class source(APIView):
    def get(self,request,stock):
        dataframe = stocks(stock)
        if dataframe is None:
            return Response(
                {"error": "No data available for this stock"},
                status=400
    )
        dataframe = analyse(dataframe)
        signal, confidence, target, stop_loss = Predict(dataframe)
        price = round(dataframe.iloc[-1].Close,2)
        StockDecision.objects.create(
            name=stock,
            price=price,
            signal=signal,
            confidence=confidence,
            target=round(target, 2),
            stop_loss=round(stop_loss, 2),
        )

        return Response({
            "STOCK_NAME": stock,
            "PRICE": price,
            "DECISON": signal,
            "RATE OF CONFIDENCE": confidence,
            "TARGET": target,
            "STOP": stop_loss,
        })

class Data(APIView):
    def get(self, request, stock):
        try:
            data = yf.download(stock, start="2024-01-01", end=dt.today())
            if data.empty:
                return Response({"error": "No data found"},status=400)
            data = data.reset_index()
            return Response({
                "dates": data["Date"].astype(str).tolist(),
                "close": data["Close"].values.flatten().tolist()
            })
        except Exception as e:
            return Response({"error": str(e)},status=400)
        
class History(APIView):
    def get(self,request):
        data = StockDecision.objects.all()
        serializer = StockDecisionSerializer(data,many = True)
        return Response(serializer.data)


        
