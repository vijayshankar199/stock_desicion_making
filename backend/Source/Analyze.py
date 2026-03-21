import ta

def analyse(df):
    if df is None or df.empty:
        return None
    close = df['Close'].squeeze()
    df['rsi'] = ta.momentum.RSIIndicator(
        close = close,
        window=14
    ).rsi()
    df['ema20'] = ta.trend.EMAIndicator(
        close=close,
        window=20
    ).ema_indicator()
    df['ema50'] = ta.trend.EMAIndicator(
        close=close,
        window=50
    ).ema_indicator()
    return df