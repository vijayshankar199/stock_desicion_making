import yfinance as yf
import pandas as pd
def stocks(stock_name):
    dataframe = yf.download(stock_name,period='1d',interval='2m')
    if dataframe is None or dataframe.empty:
        return None
    if isinstance(dataframe.columns, pd.MultiIndex):
        dataframe.columns = dataframe.columns.get_level_values(0)
    dataframe.reset_index(inplace =True)
    return dataframe