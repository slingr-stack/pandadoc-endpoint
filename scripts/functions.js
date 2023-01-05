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
	if(!httpOptions){
		for (var i = 0 ; i < arguments.length; i++){
			if (isObject(arguments[i])){
				httpOptions = arguments[i];
			}
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
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._post(options);
};

endpoint.documents.details.get = function(documentId, httpOptions) {
	if (!documentId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
		return;
	}
	var url = parse('/documents/:documentId/details', [documentId]);
	sys.logs.debug('[pandadoc] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.documents.send.post = function(documentId, httpOptions) {
	if (!documentId) {
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
		return;
	}
	var url = parse('/documents/:documentId/send', [documentId]);
	sys.logs.debug('[pandadoc] POST from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._post(options);
};

endpoint.documents.session.post = function(documentId, httpOptions) {
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
		sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [templateId].');
		return;
	}
	var url = parse('/templates/:templateId/details', [templateId]);
	sys.logs.debug('[pandadoc] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};


 ///////////////////////
 //  Private helpers  //
 ///////////////////////

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
