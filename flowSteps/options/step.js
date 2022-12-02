/**
* Sends options request.
*
* @param {text} url, This is used to config external URL.
* @param {text} body, This is used to send body request.
* @param {text} callbackData, This is used to send callbackData.
* @param {text} callbacks, This is used to send callbacks.
*/
step.options = function (url, body, callbackData, callbacks) {
	return endpoint.options(url, body, callbackData, callbacks);
}