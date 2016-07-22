# Offer Selector
A javascript component that will allow the user to select an ODRL offer from a set of options.

+ [Acronyms](#acronyms)
+ [Using the Offer Selector](#using-the-offer-selector)
+ [Developing the Offer Selector](#developing-the-offer-selector)

## Acronyms

| Acronym | Description                   |
| :------ | :----------                   |
| ODRL    | Open Digital Rights Language  |

## Using the Offer Selector

### Install
Start by installing the offer-selector via npm:
```
npm install offer-selector --save
```

### Render
The Offer Selector uses bootstrap components and class names. For details on how to customise the css of the Offer Viewer please refer
to the [Bootstrap](http://getbootstrap.com) documentation.

In addition the Offer Selector requires the [swiper](http://idangero.us/swiper) css to be included in the html page.

See [examples/index.html](https://github.com/openpermissions/offer-selector/blob/master/examples/index.html) for sample usage.

**index.js**
```javascript
var OfferSelector = require('offer-selector');
var offerSelector = new OfferSelector();
var source_ids = [{
  source_id_type: 'my-source-id-type',
  source_id: "my-source-id"
}]
offerSelector.loadOffers(source_ids);
```

**index.html**
```html
<html>
    <body>
        <offer-selector></offer-selector>
    </body>
</html>
```

###Configuration

The `OfferSelector` class can be provided with an object containing the
following configuration options:

- **query**: Query Service URL to use to request asset offers.
Default is https://query.copyrighthub.org/v1/query/
- **accounts**: Accounts Service URL to use to request asset theme information.
Default is https://acc.copyrighthub.org/v1/accounts/
- **tag**: HTML element used to position Offer Selector on html page
Default is offer-selector
- **defaults**: Object of default rendering values. Structure of object must match that of default object.
Default is 
{
    'primary_color': '#353866',
    'secondary_color': '#379392',
    price: {unit: 'GBP'}
}


**index.js**
```javascript
var OfferSelector = require('offer-selector');
var config = {
    query: 'https://my-query-url.com',
    accounts: 'https://my-accounts-url.com',
    tag: 'offer'
}
var offerSelector = new OfferSelector(config);
var source_ids = [{
    source_id_type: 'my-source-id-type',
    source_id: "my-source-id"
}]
offerSelector.loadOffers(source_ids);
```

**index.html**
```html
<html>
    <body>
        <offer></offer>
    </body>
</html>
```


## Developing the Offer Selector

The UI is implemented completely in JavaScript using [Riot.js](http://riotjs.com/) as an html templating framework

###  Getting Started

Download & install [node & npm](http://nodejs.org/download/) or use your
package manager of choice e.g.

```bash
brew install node
```

###  Install dependencies

```bash
npm install
```

### Standalone Build

A standalone version of the Offer Selector can be generated. The standalone script will be built in the "dist" directory, and creates a `OfferSelector`
global when the script is included in a web page. To build the standalone script run

```bash
npm run build-standalone
```

or if you require automatic rebuild of the bundle whenever there are file changes, run

```bash
npm run build-standalone:watch
```
or if you require a minified version of the standalone build, run

```bash
npm run build-standalone:min
```


### Running the example

You need a web server to serve examples/index.html. We recommend you use python's HTTP Server e.g: 

```
python -m SimpleHTTPServer
```

You should be able to view the application at
[http://localhost:8000](http://localhost:8000).


### Deployment

#### Publish to npm
The offer-selector has been published to npm under the OpenPermissions account. To publish a new version, increase the version number
in package.json and run

```
npm publish ./
```