def Predict(df):  
    last = df.iloc[-1]
    price = last['Close']
    ema20 = last['ema20']
    ema50 = last['ema50']

    if ema20 > ema50:
        return 'BUY', 80, price * 1.04, price * 0.97
    else:
        return 'SELL', 65, price * 0.96, price * 1.03