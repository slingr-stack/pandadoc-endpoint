---
title: PandaDoc endpoint
keywords: 
last_updated: December 02, 2022
tags: []
summary: "Detailed description of the API of the PandaDoc endpoint."
---

## Overview

The PandaDoc endpoint has the following features:
 
- Authorization and generation of OAuth tokens
- Automatic refresh of tokens when they expire
- Access to the whole REST API
- Uploading and downloading of files integrated with SLINGR's features

Please make sure you take a look at the documentation from PandaDoc as features are based on its API:

- [API Reference](https://developers.pandadoc.com/v1/reference)

## Quick start

Once you configured the endpoint and authorized the endpoint, you can list current documents with this call:

```js
var docs = app.endpoints.pandadoc.listDocuments({count: 5});
log('docs: '+JSON.stringify(docs));
```

You can create a new document from a template like this:

```js
var res = app.endpoints.pandadoc.createDocumentFromTemplate({
  name: 'Test document 1',
  template_uuid: 'JkVkR9jrKKBKdRe2z3fMqU',
  recipients: [  
    {  
      email: 'user@test.com',
      first_name: 'User',
      last_name: 'Test'
    }
  ],
  fields: {  
    name: {  
      value: "test name"
    }
  },
  metadata: {  
    test: true
  }
});
log(JSON.stringify(res));
```

Or you can also create a document from a PDF file you have stored in a SLINGR app:

```js
var record = sys.data.findOne('contracts', {number: 4});
var res = pandadoc.createDocumentFromPdf(record.field('file').id(), {
  name: 'Test document 1',
  recipients: [  
    {  
      email: 'user@test.com',
      first_name: 'User',
      last_name: 'Test'
    }
  ],
  fields: {  
    name: {  
      value: "test name"
    }
  },
  metadata: {  
    test: true
  }
});
log(JSON.stringify(res));
```

## Configuration

Before configuring the endpoint you will need to create an application in PandaDoc:

https://app.pandadoc.com/developers/

Once you have your application you will be able to configure the endpoint.

### Client ID

The client ID of the PandaDoc application. This field needs to be entered before clicking on `Request token`.

### Client Secret

The client secret of the PandaDoc application. This field needs to be entered before clicking on `Request token`.

### Access token

In order to get this token you need to click on the button `Request token`. Once you complete the authorization process
this field will be set.

### Refresh token

In order to get this token you need to click on the button `Request token`. Once you complete the authorization process
this field will be set.

### Webhooks shared key

This field is optional. If you put a key here, webhooks will be validated according to this key.

At the moment this endpoint was created shared keys was only available for the webhooks integrations in the main
PandaDoc application and wasn't available for webhooks defined in applications created by external developers. So if
you don't want users to setup the webhooks integrations by themselves, you should leave this field empty and be
aware that there won't be validations on incoming webhooks.

### Webhook URL

This is the URL you should configure in the webhook of your PandaDoc application or users would need to configure
in the webhooks integration.

## Javascript API

The Javascript API of the endpoint is based on the [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference),
so you should see their documentation for details on parameters and data formats.

### List documents

```js
app.endpoints.pandadoc.listDocuments(params);
```

Returns a list of documents for the given parameters.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Create document from template

```js
app.endpoints.pandadoc.createDocumentFromTemplate(body);
```

Creates a new document based on an existing template.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Create document from PDF

```js
app.endpoints.pandadoc.createDocumentFromPdf(fileId, body);
```

Creates a new document from a PDF file. The parameter `fileId` is the ID of a file in the SLINGR app, while the `body` are
the details of the document to create. 

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Get document status

```js
app.endpoints.pandadoc.getDocumentStatus(documentId);
```

Returns the status of the document with the given ID.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Get document details

```js
app.endpoints.pandadoc.getDocumentDetails(params);
```

Returns the details fo the document with the given ID.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Send document

```js
app.endpoints.pandadoc.sendDocument(documentId, body);
```

Sends a document to people, where `documentId` is the ID of the document to send and `body` contains the details of the
request.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Create document link

```js
app.endpoints.pandadoc.createDocumentLink(documentId, body);
```

Creates a public link to a document, where `documentId` is the ID of the document to reference and `body` contains the 
details of the request.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Download document

```js
app.endpoints.pandadoc.downloadDocument(documentId);
```

Downloads a document as a PDF file you can store in a SLINGR app. For example:

```js
var res = app.endpoints.pandadoc.downloadDocument('nLAgqZY5xiVEQY7DuxUxRm', 'test.pdf');
var record = sys.data.createRecord('contracts');
record.field('file').val({
  id: res.fileId,
  name: res.fileName,
  contentType: res.contentType
});
sys.data.save(record);
```

### List templates

```js
app.endpoints.pandadoc.listTemplates(params);
```

Returns a list of templates for the given parameters.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

### Get template details

```js
app.endpoints.pandadoc.getTemplateDetails(templateId);
```

Returns the details of the template with the given ID.

Check [REST API of PandaDoc](https://developers.pandadoc.com/v1/reference) for more details about the request and response.

## Events

### Webhook

If webhooks were configured, you will receive events when the status of documents changes. You can find more information
about the format of events in the [PandaDoc's documentation](https://developers.pandadoc.com/v1/reference#on-document-status-change).

The only difference is that the endpoint will send events individually instead of sending a list of events. This way you
should process events like this in your listeners:

```js
sys.logs.info('doc name: '+event.data.data.name);
sys.logs.info('doc status: '+event.data.data.status);
switch (event.data.event) {
    case 'recipient_completed':
        // do something
    ...
}
```

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.


# PandaDoc V2.0.1 

## Javascript API

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
app.endpoints.pandadoc.documents.post(fileId, body)
```
---
* API URL: '/documents/:documentId/send'
* HTTP Method: 'POST'
```javascript
app.endpoints.pandadoc.documents.send.post(documentId, body)
```
---
* API URL: '/documents/:documentId/session'
* HTTP Method: 'POST'
```javascript
app.endpoints.pandadoc.documents.session.post(documentId, body)
```
---

</details>

For more information about how shortcuts work, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).