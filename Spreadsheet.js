var Startpoint = 10;
var Startpoint2 = 10; 
var tradingsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradingAPI");
var marketsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MarketDataAPI");

// Get the entered API key
var api_key = tradingsheet.getRange("E4").getValue() ; 
// Check if box is thicked or not. If so, endpoint requests go with paper money. Otherwise, requests take the real money. 
var paperorlive = tradingsheet.getRange("H4").isChecked() ;

// Call positions endpoint
function callPositions(){
  if(paperorlive == true){
    var url = "https://paper-trading.lemon.markets/v1/positions/";
  } else {
    var url = "https://trading.lemon.markets/v1/positions/"
  }
  var headers = {
        "Authorization": "Bearer " + api_key
    };

  var options = {
        "method" : "get",
        "headers" : headers 
    };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  return data.results
}

// Call account endpoint
function callAccount(){
  if(paperorlive == true){
    var url = "https://paper-trading.lemon.markets/v1/account/";
  } else {
    var url = "https://trading.lemon.markets/v1/account/"
  }
  var headers = {
        "Authorization": "Bearer " + api_key
    };
   var options = {
        "method" : "get",
        "headers" : headers 
    };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  return data.results; 
}

// Call instruments endpoint
function callInstruments(){
  var isin = marketsheet.getRange("C4").getValue() ;
  var url = "https://data.lemon.markets/v1/instruments/?search=" + isin
  var headers = {
        "Authorization": "Bearer " + api_key
    };
   var options = {
        "method" : "get",
        "headers" : headers 
    };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  Logger.log(data.results)
  return data.results;  
}

// Call OHLC endpoint 
function callOHLC(){
  try{
  var isin = marketsheet.getRange("F4").getValue() ;
  var hdm  =  marketsheet.getRange("G4").getValue() ;
  var date1 = marketsheet.getRange("H4").getValue() ;
  var new_date1 = date1.toISOString().slice(0,10) ; 
  var date2 = marketsheet.getRange("I4").getValue() ;
  var new_date2 = date2.toISOString().slice(0,10);
  if(hdm == "d1"){
    var url = "https://data.lemon.markets/v1/ohlc/" + hdm + "/?isin=" + isin + "&" + "from=" + new_date1 + "&" + "to=" + new_date2
  };
  if(hdm == "h1"){
    var url = "https://data.lemon.markets/v1/ohlc/h1/" + "/?isin=" + isin + "&" + "from=" + new_date1 
  };
  if(hdm == "m1"){
    var url = "https://data.lemon.markets/v1/ohlc/m1/" + "/?isin=" + isin + "&" + "from=" + new_date1 
  };
  var headers = {
        "Authorization": "Bearer " + api_key
    };
   var options = {
        "method" : "get",
        "headers" : headers 
    };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  return data.results;     
  }
  catch{
     throw new Error( "Invalid OHLC data given. For d1: time range cannot be longer than 60 days. For h1 & m1: you only need one date - no time range consideration." );

  }
}

// Call orders endpoint 
function callOrders(){
  if(paperorlive == true){
    var url = "https://paper-trading.lemon.markets/v1/orders/";
  } else {
    var url = "https://trading.lemon.markets/v1/orders/"
  }
  var headers = {
        "Authorization": "Bearer " + api_key
    };
   var options = {
        "method" : "get",
        "headers" : headers 
    };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  return data.results; 
}

// Placing a trade and making an order 
function makeOrder(isin, expires_at, side, quantity, venue){
  if(paperorlive == true){
    var url = "https://paper-trading.lemon.markets/v1/orders/";
  } else {
    var url = "https://trading.lemon.markets/v1/orders/"
  }
  var body = {
    "isin": isin,
    "expires_at": expires_at,
    "side": side,
    "quantity": quantity,
    "venue": venue,
  }
  var headers = {
        "Authorization": "Bearer " + api_key
    };

  var options = {
        "method" : "post",
         "payload": body,
        "headers" : headers 
    };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  Logger.log(data); 

}



// Receiving input data from the sheet and set them into the makeOrder() function
function OrderSubmission() {
  tradingsheet.getRange("L2").setValue("Sending data...")
  
  var isin = tradingsheet.getRange("K2").getValue()
  var expires_at = tradingsheet.getRange("K3").getValue()
  var side = tradingsheet.getRange("K4").getValue()
  var quantity = tradingsheet.getRange("K5").getValue()
  var venue = tradingsheet.getRange("K6").getValue()

  if(expires_at == "p7d"){
      new_date = expires_at ; 
  } else {
    var new_date = expires_at.toISOString().slice(0,10)
  }

  makeOrder(isin, new_date, side, quantity.toString(), venue);
  tradingsheet.getRange("L2").setValue("Order submitted"); 
}


// Clear all data from last positions endpoint call
function clearPositionsOrders(){

 var deletingRows = tradingsheet.getLastRow() - Startpoint + 1;

 tradingsheet.deleteRows(Startpoint, deletingRows);
 
}


// Clear all data from last instruments endpoint call
function clearInstruments() {

 var deletingRows = marketsheet.getLastRow() - Startpoint2 + 1;

 marketsheet.deleteRows(Startpoint2, deletingRows);

}

// If button "UPDATE" is pressed on Sheets, updateTrading() will feed the sheet with new data
function updateTrading() {
  var positions = callPositions();
  var account = callAccount();
  var orders = callOrders();

  var cc = marketsheet.getRange("A10:S")
  var cell = cc.getCell(10, 13);
  if(!cell.isBlank()){
    clearPositionsOrders()
  } 
  


   for (var i = 0; i < positions.length; i++) {
      var index = Startpoint + i;
      tradingsheet.getRange("A" + index).setValue(positions[i].isin_title).setBackground("white");
      tradingsheet.getRange("B" + index).setValue(positions[i].isin).setBackground("white");
      tradingsheet.getRange("C" + index).setValue(positions[i].buy_price_avg / 10000 + "€").setBackground("white");
      tradingsheet.getRange("D" + index).setValue(positions[i].quantity).setBackground("white");
      tradingsheet.getRange("E" + index).setValue(positions[i].estimated_price / 10000 + "€").setBackground("white");
      tradingsheet.getRange("F" + index).setValue(positions[i].estimated_price_total / 10000 + "€").setBackground("white");
    }


    for (var i = 0; i < orders.length; i++) {
      var index = Startpoint + i;
      var create = orders[i].created_at ;
      var createsplit = create.split("T") ;
      var expire = orders[i].expires_at ;
      var expiresplit = expire.split("T") ;
      tradingsheet.getRange("H" + index).setValue(orders[i].isin_title).setBackground("white");
      tradingsheet.getRange("I" + index).setValue(orders[i].isin).setBackground("white");
      tradingsheet.getRange("J" + index).setValue(orders[i].status).setBackground("white");
      tradingsheet.getRange("K" + index).setValue(orders[i].side).setBackground("white");
      tradingsheet.getRange("L" + index).setValue(orders[i].quantity).setBackground("white");
      tradingsheet.getRange("M" + index).setValue(orders[i].type).setBackground("white");
      tradingsheet.getRange("N" + index).setValue(orders[i].estimated_price_total / 10000 + "€").setBackground("white");
      tradingsheet.getRange("O" + index).setValue(createsplit[0]).setBackground("white");
      tradingsheet.getRange("P" + index).setValue(expiresplit[0]).setBackground("white");
    }
  
  
      tradingsheet.getRange("B2").setValue(account.firstname).setBackground("white");
      tradingsheet.getRange("B3").setValue(account.lastname).setBackground("white");
      tradingsheet.getRange("B4").setValue(account.email).setBackground("white");
      tradingsheet.getRange("B5").setValue(account.balance / 10000 + "€").setBackground("white");
      tradingsheet.getRange("B6").setValue(account.cash_to_invest / 10000 + "€").setBackground("white");
  
}

// If button "UPDATE" is pressed on Sheets, updateMarketData() will feed the sheet with new data
function updateMarketData() {
  var instruments = callInstruments();  
  var ohlc = callOHLC();

  var cc = marketsheet.getRange("A8:N")
  var cell = cc.getCell(8, 12);
  if(!cell.isBlank()){
    clearInstruments()
  }
  


   for (var i = 0; i < instruments.length; i++) {
      var index = Startpoint2 + i;
      var vn = instruments[i].venues ; 
      marketsheet.getRange("A" + index).setValue(instruments[i].isin).setBackground("white");
      marketsheet.getRange("B" + index).setValue(instruments[i].title).setBackground("white");
      marketsheet.getRange("C" + index).setValue(instruments[i].symbol).setBackground("white");
      marketsheet.getRange("D" + index).setValue(instruments[i].type).setBackground("white");
      for(let j=0; j < vn.length; j++){
      marketsheet.getRange("E" + index).setValue(vn[j].mic).setBackground("white");
      }
    }

   var hdm  =  marketsheet.getRange("G4").getValue() ;

  

   for (var i = 0; i < ohlc.length; i++) {
      var index = Startpoint2 + i;
      var time = ohlc[i].t ;
      var timesplit = time.split("T") ;
      var t = timesplit[1].toString(); 
      var hoursplit = t.split(".") ; 
      marketsheet.getRange("H" + index).setValue(ohlc[i].isin).setBackground("white");
      marketsheet.getRange("I" + index).setValue(ohlc[i].o).setBackground("white");
      marketsheet.getRange("J" + index).setValue(ohlc[i].h).setBackground("white");
      marketsheet.getRange("K" + index).setValue(ohlc[i].l).setBackground("white");
      marketsheet.getRange("L" + index).setValue(ohlc[i].c).setBackground("white");
      marketsheet.getRange("M" + index).setValue(ohlc[i].v).setBackground("white");
     // marketsheet.getRange("N" + index).setValue(timesplit[0].toString()).setBackground("white");

      if(hdm == "d1"){
        marketsheet.getRange("N" + index).setValue("'" + timesplit[0].toString() + "'").setBackground("white");
      }
      if(hdm == "h1" || hdm == "m1"){
       marketsheet.getRange("N" + index).setValue("'" + hoursplit[0].toString() + "'").setBackground("white");
      }
  
  }
  


}