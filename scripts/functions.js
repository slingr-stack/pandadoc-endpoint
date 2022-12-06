////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////


function parse(str) {
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

endpoint.documents = {};

endpoint.documents.details = {};

endpoint.documents.send = {};

endpoint.documents.session = {};

endpoint.documents.download = {};

endpoint.templates = {};

endpoint.templates.details = {};

endpoint.documents.get = function(documentId, httpOptions) {
	for (var i = 0 ; i < arguments.length; i++){
		if (isObject(arguments[i]) && !httpOptions){
			httpOptions = arguments[i];
		}
	}
	var url;
	switch(arguments.length){
		case 0:
			url = parse('/documents');
			break;
		case 1:
			url = parse('/documents/:documentId', [documentId]);
			break;
		default:
			sys.logs.error('Invalid argument received.');
			return;
	}
	sys.logs.debug('[pandadoc] GET from: ' + url);
	return endpoint.get(url, httpOptions);
};

endpoint.documents.post = function(fileId, httpOptions) {
	for (var i = 0 ; i < arguments.length; i++){
		if (isObject(arguments[i]) && !httpOptions){
			httpOptions = arguments[i];
		}
	}
	var url;
	switch(arguments.length){
		case 1:
			url = parse('/documents');
			break;
		case 2:
			url = parse('/documents/:fileId', [fileId]);
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
	return endpoint.post(url, httpOptions);
};

endpoint.documents.details.get = function(documentId, httpOptions) {
	if (!documentId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
		return;
	}
	var url = parse('/documents/:documentId/details', [documentId]);
	sys.logs.debug('[pandadoc] GET from: ' + url);
	return endpoint.get(url, httpOptions);
};

endpoint.documents.send.post = function(documentId, httpOptions) {
	if (!documentId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
		return;
	}
	var url = parse('/documents/:documentId/send', [documentId]);
	sys.logs.debug('[pandadoc] POST from: ' + url);
	return endpoint.post(url, httpOptions);
};

endpoint.documents.session.post = function(documentId, httpOptions) {
	if (!documentId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
		return;
	}
	var url = parse('/documents/:documentId/session', [documentId]);
	sys.logs.debug('[pandadoc] POST from: ' + url);
	let res = endpoint.post(url, httpOptions);
	res.link = 'https://app.pandadoc.com/s/'+res.id;
	return res;
};

endpoint.documents.download.get = function(documentId, fileName) {
	if (!documentId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
		return;
	}
	var url = parse('/documents/:documentId/download', [documentId]);
	sys.logs.debug('[pandadoc] GET from: ' + url);

	var httpOptions = {
		forceDownload: true,
		downloadSync: true,
		fileName: fileName || 'document.pdf'
	};

	return endpoint.get(url, httpOptions);
};

endpoint.templates.get = function(httpOptions) {
	var url = parse('/templates');
	sys.logs.debug('[pandadoc] GET from: ' + url);
	return endpoint.get(url, httpOptions);
};

endpoint.templates.details.get = function(templateId, httpOptions) {
	if (!templateId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [templateId].');
		return;
	}
	var url = parse('/templates/:templateId/details', [templateId]);
	sys.logs.debug('[pandadoc] GET from: ' + url);
	return endpoint.get(url, httpOptions);
};
