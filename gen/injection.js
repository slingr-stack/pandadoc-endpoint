documentsPost = () => {
    //INIT_INJECTION
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
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
    //END_INJECTION
}

documentsSessionPost = () => {
    //INIT_INJECTION
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/session', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    var res = endpoint._post(options);
    res.link = 'https://app.pandadoc.com/s/'+res.id;
    return res;
    //END_INJECTION
}

documentsDownloadGet = () => {
    //INIT_INJECTION
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/download', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);

    var httpOptions = {
        path:url,
        forceDownload: true,
        downloadSync: true,
        fileName: fileName || 'document.pdf'
    };

    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
    //END_INJECTION
}


module.exports = {
    documentsPost,
    documentsSessionPost,
    documentsDownloadGet
}