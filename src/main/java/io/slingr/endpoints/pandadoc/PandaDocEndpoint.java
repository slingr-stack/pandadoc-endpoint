package io.slingr.endpoints.pandadoc;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.exceptions.ErrorCode;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.services.rest.RestMethod;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * PandaDoc endpoint
 *
 * Created by dgaviola on 10/25/17.
 */
@SlingrEndpoint(name = "pandadoc", functionPrefix = "_")
public class PandaDocEndpoint extends HttpEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(PandaDocEndpoint.class);

    private static final String PANDADOC_API_URL = "https://api.pandadoc.com/public/v1";
    private static final String PANDADOC_REFRESH_TOKEN_URL = "https://api.pandadoc.com/oauth2/access_token";

    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointProperty
    private String authenticationMethod;

    @EndpointProperty
    private String clientId;

    @EndpointProperty
    private String clientSecret;

    @EndpointProperty
    private String accessToken;

    @EndpointProperty
    private String refreshToken;

    @EndpointProperty
    private String apiKey;

    @EndpointProperty
    private String webhooksSharedKey;

    @Override
    public String getApiUri() {
        return PANDADOC_API_URL;
    }

    @Override
    public void endpointStarted() {
        httpService().setAllowExternalUrl(true);
    }

    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        try {
            setRequestHeaders(request);
            return defaultGetRequest(request);
        } catch (EndpointException restException) {
            if (restException.getHttpStatusCode() == 401 && authenticationMethod.equals("oAuth2")) {
                // we might need to refresh the token
                generateNewAccessToken();
                setRequestHeaders(request);
                return defaultGetRequest(request);
            } else {
                throw restException;
            }
        }
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        try {
            setRequestHeaders(request);
            return defaultPostRequest(request);
        } catch (EndpointException restException) {
            if (restException.getHttpStatusCode() == 401 && authenticationMethod.equals("oAuth2")) {
                // we might need to refresh the token
                generateNewAccessToken();
                setRequestHeaders(request);
                return defaultPostRequest(request);
            } else {
                throw restException;
            }
        }
    }

    @EndpointWebService(path = "/", methods = RestMethod.POST)
    public String webhookProcessor(WebServiceRequest request){
        String signature = request.getParameter("signature");
        if (!StringUtils.isBlank(webhooksSharedKey)) {
            if (!WebhooksUtils.verifySignature(request.getRawBody(), signature, webhooksSharedKey)) {
                throw EndpointException.permanent(ErrorCode.ARGUMENT, "Invalid signature");
            }
        }
        Json body = request.getJsonBody();
        for (Json event : body.jsons()) {
            events().send("webhook", event);
        }
        return "ok";
    }

    private void setRequestHeaders(FunctionRequest request) {
        Json body = request.getJsonParams();
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        if (authenticationMethod.equals("apiKey")) {
            headers.set("Authorization", "API-Key " + apiKey);
        } else {
            headers.set("Authorization", "Bearer " + accessToken);
        }
        headers.set("Content-Type", "application/json");
        if (headers.isEmpty("Accept")) {
            headers.set("Accept", "application/json");
        }
        body.set("headers", headers);
    }

    private void generateNewAccessToken() {

        Json requestBody = Json.map();
        requestBody.set("path", PANDADOC_REFRESH_TOKEN_URL);
        requestBody.set("body", Json.map()
                .set("grant_type", "refresh_token")
                .set("client_id", clientId)
                .set("client_secret", clientSecret)
                .set("refresh_token", refreshToken)
                .set("scope", "read+write")
        );
        requestBody.set("headers", Json.map()
                .set("Content-Type", "x-www-form-urlencoded")
        );
        FunctionRequest request = new FunctionRequest(requestBody);
        try {
            Json res = post(request);
            accessToken = res.string("access_token");
        } catch (Exception e) {
            appLogger.error(String.format("Error refreshing token for client ID [%s]. You might need to get a new refresh token.", clientId));
            throw e;
        }
    }
}