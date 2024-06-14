////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

endpoint.documents = {};

endpoint.documents.details = {};

endpoint.documents.send = {};

endpoint.documents.session = {};

endpoint.documents.download = {};

endpoint.templates = {};

endpoint.templates.details = {};

endpoint.documents.get = function(documentId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
            url = parse('/documents');
            break;
        case 1:
            url = parse('/documents/:documentId', [documentId]);
            break;
        default:
            throw new Error('Invalid argument received.');
    }
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.documents.post = function(fileId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
            }
        }
    }
    var url;
    switch(arguments.length){
        case 1:
            url = parse('/documents');
            break;
        case 2:
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
                        content: httpOptions
                    }
                ]
            });
        default:
            throw new Error('Invalid argument received.');
    }
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.documents.details.get = function(documentId, httpOptions) {
    if (!documentId) {
        throw new Error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
    }
    var url = parse('/documents/:documentId/details', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.documents.send.post = function(documentId, httpOptions) {
    if (!documentId) {
        throw new Error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
    }
    var url = parse('/documents/:documentId/send', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.documents.session.post = function(documentId, httpOptions) {
    if (!documentId) {
        throw new Error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
    }
    var url = parse('/documents/:documentId/session', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    var res = endpoint._post(options);
    res.link = 'https://app.pandadoc.com/s/'+res.id;
    return res;
};

endpoint.documents.download.get = function(documentId, fileName) {
    if (!documentId) {
        throw new Error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
    }
    var url = parse('/documents/:documentId/download', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    if (fileName) {
        if (!fileName.includes(".pdf")) {
            fileName = fileName + ".pdf";
        }
    }
    var httpOptions = {
        path: url,
        forceDownload: true,
        downloadSync: true,
        fileName: fileName || 'document.pdf'
    };

    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.templates.get = function(httpOptions) {
    var url = parse('/templates');
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.templates.details.get = function(templateId, httpOptions) {
    if (!templateId) {
        throw new Error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [templateId].');
    }
    var url = parse('/templates/:templateId/details', [templateId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

endpoint.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options, callbackData, callbacks);
};

endpoint.post = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options, callbackData, callbacks);
};

endpoint.put = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options, callbackData, callbacks);
};

endpoint.patch = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._patch(options, callbackData, callbacks);
};

endpoint.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options, callbackData, callbacks);
};

endpoint.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._head(options, callbackData, callbacks);
};

endpoint.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._options(options, callbackData, callbacks);
};

endpoint.utils = {};

endpoint.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

endpoint.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

///////////////////////
//  Private helpers  //
///////////////////////

var mergeJSON = function (json1, json2) {
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}

var concatQuery = function (url, key, value) {
    return url + ((!url || url.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
};

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

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}