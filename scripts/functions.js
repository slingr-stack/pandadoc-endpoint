/////////////////////
// Public API
/////////////////////

endpoint.listDocuments = function(params) {
    return endpoint.get('/documents', {params: params})
};

endpoint.createDocumentFromTemplate = function(body) {
    return endpoint.post('/documents', body);
};

endpoint.createDocumentFromPdf = function(fileId, body) {
    return endpoint.post({
        path: '/documents',
        multipart: true,
        parts: [
            {
                name: 'file',
                type: 'file',
                fileId: fileId
            },
            {
                name: 'data',
                type: 'other',
                contentType: 'application/json',
                content: body
            }
        ]
    });
};

endpoint.getDocumentStatus = function(documentId) {
    return endpoint.get('/documents/'+documentId);
};

endpoint.getDocumentDetails = function(documentId) {
    return endpoint.get('/documents/'+documentId+'/details');
};

endpoint.sendDocument = function(documentId, body) {
    return endpoint.post('/documents/'+documentId+'/send')
};

endpoint.createDocumentLink = function(documentId, body) {
    var res = endpoint.post('/documents/'+documentId+'/session', body);
    res.link = 'https://app.pandadoc.com/s/'+res.id;
    return res;
};

endpoint.downloadDocument = function(documentId, fileName) {
    var request = {
        path: '/documents/'+documentId+'/download',
        forceDownload: true,
        downloadSync: true,
        fileName: fileName || 'document.pdf'
    };
    return endpoint.get(request);
};

endpoint.listTemplates = function(params) {
    return endpoint.get('/templates', {params: params})
};

endpoint.getTemplateDetails = function(templateId) {
    return endpoint.get('/templates/'+templateId+'/details');
};

///////////////////////////////////
// Public API - Generic Functions
//////////////////////////////////

endpoint.get = function(url, options) {
    var options = checkHttpOptions(url, options);
    return endpoint._get(options);
};

endpoint.post = function(url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options);
};

/////////////////////////////
//  Private helpers
/////////////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);