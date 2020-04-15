# cbrrates-as-promised

### Overview

This module allows to retrieve currency rates of Central Bank of Russia. 
You may get all available live of historical exchange rates for various currencies to Russian rouble.
CBR official rates resource is used to get the data. 

Rates request returns a native nodejs promise.

### Usage 

First you need to install the module via `npm`.

```
npm i cbrrates-as-promised
```

Use the `load` method to get the rates. You may pass the exact date as a parameter to retrieve historical rates.
Calling with no params results to a list of current exchange rates.

```
// Get current exchange rates
const cbr = require('cbrrates-as-promised');
cbr.load().then(res => {
    console.log(res);
});


// Get historical rates
cbr.load('2020-02-10').then(res => {
    console.log(res);
});


// You may use the Date object as well
cbr.load(new Date('2020-02-10')).then(res => {
    console.log(res);
});

```

#### Response

`cbrrates-as-promised` returns a `Map` of all available rates to RUB in the following format:

```

Map {
  'USD' => { value: 63, par: 1 },
  'EUR' => { value: 69, par: 1 },
  'JPY' => { value: 57, par: 100 }
}

``` 