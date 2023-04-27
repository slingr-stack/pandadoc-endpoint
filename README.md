---
title: PandaDoc endpoint
keywords: 
last_updated: April 27, 2023
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
var docs = app.endpoints.pandadoc.documents.get(null, {count: 5});
log('docs: '+JSON.stringify(docs));
```

You can create a new document from a template like this:

```js
var res = app.endpoints.pandadoc.documents.post({
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
var res = pandadoc.documents.post(record.field('file').id(), {
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

### API Key

This field is optional. If you put a key here, all requests to the API will be authenticated with this key. This is not recommended for production environments.

### Webhooks shared key

This field is optional. If you put a key here, webhooks will be validated according to this key.

At the moment this endpoint was created shared keys was only available for the webhooks integrations in the main
PandaDoc application and wasn't available for webhooks defined in applications created by external developers. So if
you don't want users to setup the webhooks integrations by themselves, you should leave this field empty and be
aware that there won't be validations on incoming webhooks.

### Webhook URL

This is the URL you should configure in the webhook of your PandaDoc application or users would need to configure
in the webhooks integration.


# Javascript API

The Javascript API of the pandadoc endpoint has three pieces:

- **HTTP requests**: These allow to make regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the endpoint usage in SLINGR.

## HTTP requests
You can make `GET`,`POST` requests to the [pandadoc API](API_URL_HERE) like this:
```javascript
var response = app.endpoints.pandadoc.get('/templates')
var response = app.endpoints.pandadoc.post('/documents/:fileId', body)
var response = app.endpoints.pandadoc.post('/documents/:fileId')
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
app.endpoints.pandadoc.documents.get()
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

## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the endpoint:
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>



### Generic Flow Step

Generic flow step for full use of the entire endpoint and its services.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the endpoint. <br>
            Possible values are: <br>
            <i><strong>GET,POST</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this endpoint will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/documents<br>/documents/{documentId}<br>/documents/{documentId}/details<br>/documents/{documentId}/download<br>/templates<br>/templates/{templateId}/details<br>/documents<br>/documents/{fileId}<br>/documents/{documentId}/send<br>/documents/{documentId}/session<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

For more information about how shortcuts or flow steps works, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>


### Create Document From Pdf

Description of Custom Flow Steps

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*

### Download Document

Description of Custom Flow Steps

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*

### List Documents

Description of Custom Flow Steps

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*

### Send Document

Description of Custom Flow Steps

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*


</details>

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*


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
