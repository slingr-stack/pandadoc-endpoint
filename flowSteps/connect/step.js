/**
* Sends connect request.
*
* @param {text} url, This is used to config external URL.
* @param {text} body, This is used to send body request.
* @param {text} callbackData, This is used to send callbackData.
* @param {text} callbacks, This is used to send callbacks.
*/
step.connect = function (url, body, callbackData, callbacks) {
	return endpoint.connect(url, body, callbackData, callbacks);
}