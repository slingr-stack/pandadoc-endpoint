/**
 * This flow step will send generic request.
 *
 * @param {text} method, This is used to config method.
 * @param {object} path, This is used to config external URL.
 * @param {text} headers, This is used to config external URL.
 * @param {text} params, This is used to config external URL.
 * @param {text} body, This is used to send body request.
 * @param {text} callbackData, This is used to send callback data.
 * @param {text} callbacks, This is used to send callbacks.
 */
step.generic = function (method, path, headers,params, body, callbackData, callbacks) {

    body = {
        path: path,
        headers:headers,
        params:params,
		body:body
    };

    switch (method) {
    	case 'get':
    		return endpoint._get(body, callbackData, callbacks);
    	case 'post':
    		return endpoint._post(body, callbackData, callbacks);
    	case 'delete':
    		return endpoint._delete(body, callbackData, callbacks);
    	case 'put':
    		return endpoint._put(body, callbackData, callbacks);
    	case 'connect':
    		return endpoint._connect(body, callbackData, callbacks);
    	case 'head':
    		return endpoint._head(body, callbackData, callbacks);
    	case 'options':
    		return endpoint._options(body, callbackData, callbacks);
    	case 'patch':
    		return endpoint._patch(body, callbackData, callbacks);
    	case 'trace':
    		return endpoint._trace(body, callbackData, callbacks);
    	default:
            return null;
    }

};