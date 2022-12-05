/**
* Sends head request.
*
* @param {text} url, This is used to config external URL.
* @param {text} body, This is used to send body request.
* @param {text} callbackData, This is used to send callbackData.
* @param {text} callbacks, This is used to send callbacks.
*/
step.head = function (url, body, callbackData, callbacks) {
	return endpoint.head(url, body, callbackData, callbacks);
}