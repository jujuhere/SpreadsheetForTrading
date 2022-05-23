# SheetsForTrading
Code Snippet which is part of the Google Sheets implementation to execute trading on the stock market with Google's spreadsheet including the lemon.markets API.


## Introduction
This is a public lemon.markets repository that gives you an app script code that you can use for the Spreadsheet for the API. To get a general understanding of the API, please refer to our [documentation](https://docs.lemon.markets). The code langauge we're using here is [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). The Spreadsheet-For-Trading template & a walkthrough of this template & the script can be found in our blogpost. 


## Get right into it 
It's not complicated to use the repo for the Spreadsheet. All you have to do is just download the Spreadsheet template from our blogpost and then copy & paste the code into [Apps Script](https://developers.google.com/apps-script). 
You can use the Apps Script-Tool through the following: Open Spreadsheet file -> Go to "Extensions" -> Click "Apps Script"
Now paste the code and save it. That is it. 

## API usage 

This project uses the lemon.markets API. 

lemon.markets is a brokerage API by developers for developers that allows you to build your own experience at the stock market. We will use the Market Data API and Trading API to retrieve the ISIN (unique identifier) that belongs to a particular financial instrument and to place trades. If you do not have a lemon.markets account yet, you can sign up [here](https://login.lemon.markets/u/login/identifier?state=hKFo2SA4RmVaaUpPWmtxcXdrb3NEeUdWVWpYY0VuejJtRU1Sd6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGFwV3RZM0RWblo4OHRmek9mSGNPQ09iSDh0Ylp1eUpmo2NpZNkgY0swQlhzc1V2U3lybUtVSVo3YTJLdmVvZ1F6eVNWSWo). 

## usage of Google Sheets

In addition to that, we're using [Google Sheets](https://www.google.com/sheets/about/) as a tool. Sheets is a free program to create & edit spreadsheets online. If you're familiar with Microsoft Excel, you will not have issues with using Sheets. The huge advantage of Sheets is that collaborative work through real-time sharing via cloud-hosting is easier than ever before. 

We are using the following endpoints URL of the lemon.markets API: 
```javascript
TRADING_URL= "https://paper-trading.lemon.markets/v1/"
MARKET_URL= "https://data.lemon.markets/v1/"
POSITIONS_URL= "https://paper-trading.lemon.markets/v1/positions/" or "https://data.lemon.markets/v1/positions/"
ACCOUNT_URL= "https://paper-trading.lemon.markets/v1/account/" or "https://data.lemon.markets/v1/account/"
INSTRUMENTS_URL= "https://paper-trading.lemon.markets/v1/instruments/" or "https://data.lemon.markets/v1/instruments/"
OHLC_URL= "https://paper-trading.lemon.markets/v1/ohlc/" or "https://data.lemon.markets/v1/ohlc/"
ORDERS_URL= "https://paper-trading.lemon.markets/v1/orders/" or "https://data.lemon.markets/v1/orders/"
```

Configure your environment variables on the Spreadsheet. You just need to insert your API key into the Spreadsheet by copying it from the dashboard. Please provide your unique API KEY. You can decide with one tick/click whether you'd like to use the paper money or the real money environment on the sheet. (This time, you don't need to add environment variables in the code.) :) 
Also, if you order stocks through your spreadsheet, please consider the following variables from the POST request while inserting the data into Sheets (TradingAPI tab):

```javascript
    "isin": "isin of the stock you'd like to trade",
    "expires_at": "expiration date of your trade (MM-DD-YY)",
    "side": "buy" or "sell"? ,
    "quantity": "how many stocks you'd like to trade (give a number)",
    "venue": mostly "XMUN"
```

In the MarketDataAPI tab, there are the following areas where you can insert data while working with the /instruments & /ohlc endpoints:

```javascript
    SEARCH_STOCK = "Find instruments by typing the name of the stock, e.g. Coinbase"
    SEARCH_ISIN = "Find ohlc data from a specific stock by typing the ISIN of the stock, e.g. LU1778762911 for Spotify"
    h1_m1_d1 = "Would you like to receive data in a hourly, minutely or daily rhythm?" 
    date_from = "Type the date of when the daily track of the data should begin"
    date_to = "Type the date of when the daily track of history data should stop. You don't need to fill this section if you're using h1 or m1 for time tracking" 
```

## Interested in contributing?

This (and all lemon.markets open source projects) is(/are) work in progress. If you are interested in contributing to this repository, simply create a PR and/or contact us at support@lemon.markets.

Looking forward to building lemon.markets with you :) 

