# Javascript API

The Javascript API of the pandadoc endpoint has three pieces:

- **HTTP requests**: These allows to make regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the endpoint usage in SLINGR.

## HTTP requests
You can make `GET`,`POST` requests to the [pandadoc API](API_URL_HERE) like this:
```javascript
var response = app.endpoints.pandadoc.get('/documents/:documentId/download')
var response = app.endpoints.pandadoc.post('/documents', body)
```

Please take a look at the documentation of the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint#javascript-api)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the endpoint:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/documents'
* HTTP Method: 'GET'
```javascript
app.endpoints.pandadoc.documents.get()
```
---
* API URL: '/documents/:documentId'
* HTTP Method: 'GET'
```javascript
app.endpoints.pandadoc.documents.get(documentId)
```
---
* API URL: '/documents/:documentId/details'
* HTTP Method: 'GET'
```javascript
app.endpoints.pandadoc.documents.details.get(documentId)
```
---
* API URL: '/documents/:documentId/download'
* HTTP Method: 'GET'
```javascript
app.endpoints.pandadoc.documents.download.get(documentId)
```
---
* API URL: '/templates'
* HTTP Method: 'GET'
```javascript
app.endpoints.pandadoc.templates.get()
```
---
* API URL: '/templates/:templateId/details'
* HTTP Method: 'GET'
```javascript
app.endpoints.pandadoc.templates.details.get(templateId)
```
---
* API URL: '/documents'
* HTTP Method: 'POST'
```javascript
app.endpoints.pandadoc.documents.post(body)
```
---
* API URL: '/documents/:fileId'
* HTTP Method: 'POST'
```javascript
app.endpoints.pandadoc.documents.post(body, fileId)
```
---
* API URL: '/documents/:documentId/send'
* HTTP Method: 'POST'
```javascript
app.endpoints.pandadoc.documents.send.post(body, documentId)
```
---
* API URL: '/documents/:documentId/session'
* HTTP Method: 'POST'
```javascript
app.endpoints.pandadoc.documents.session.post(body, documentId)
```
---

</details>

For more information about how shortcuts work, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*