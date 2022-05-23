# SpreadsheetForTrading

## Introduction
This is a public lemon.markets repository that gives you an app script code that you can use for the Spreadsheet for the API. To get a general understanding of the API, please refer to our documentation. The code langauge we're using here is JavaScript. The Spreadsheet-For-Trading template & a walkthrough of this template & the script can be found in our blogpost. 


## Get right into it 
It's not complicated to use the Repo for the Spreadsheet. All you have to do is just download the Spreadsheet template from our blogpost and then copy & paste the code into Apps Script. 
You can the App Script-Tool through the following: Open Spreadsheet file -> Go to "Extensions" -> Click "Apps Script"
Now paste the code and save it. That is it. 

## API usage 

This project uses the lemon.markets API. 

lemon.markets is a brokerage API by developers for developers that allows you to build your own experience at the stock market. We will use the Market Data API and Trading API to retrieve the ISIN (unique identifier) that belongs to a particular financial instrument and to place trades. If you do not have a lemon.markets account yet, you can sign up here. 

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

Configure your environment variables on the Spreadsheet. You just need to insert your API key from the into the Spreadsheet by copying it from the dashboard. Please provide your unique API KEY. You can decide with one click whether you'd like to use the paper money or the real money environment. (This time, you don't need to add environment variables in the code.) :) 
Also, if you order stocks through your spreadsheet, please consider the following variables from the POST request:

```javascript
    "isin": "isin of the stock you'd like to trade",
    "expires_at": "expiration date of your trade (MM-DD-YY)",
    "side": "buy" or "sell"? ,
    "quantity": "how many stocks you'd like to trade (give a number)",
    "venue": mostly "XMUN"
```

## Interested in contributing?

This (and all lemon.markets open source projects) is(are) a work in progress. If you are interested in contributing to this repository, simply create a PR and/or contact us at support@lemon.markets.

Looking forward to building lemon.markets with you :) 

