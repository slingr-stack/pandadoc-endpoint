package io.slingr.endpoints.pandadoc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;

public class WebhooksUtils {
    private static final Logger logger = LoggerFactory.getLogger(WebhooksUtils.class);
    private static final String ALGORITHM = "HmacSHA256";

    public static boolean verifySignature(String payload, String signature, String secret) {
        boolean isValid = false;

        try {
            SecretKeySpec signingKey = new SecretKeySpec(secret.getBytes("UTF-8"), ALGORITHM);
            Mac mac = Mac.getInstance(ALGORITHM);
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(payload.getBytes());
            String hash = new String(hex(rawHmac));

            isValid = hash.equals(signature);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException | InvalidKeyException e) {
            logger.error("Error validating webhook signature", e);
        }

        return isValid;
    }

    private static String hex(byte[] bytes) {
      StringBuilder result = new StringBuilder();
      for (byte aByte : bytes) {
        result.append(String.format("%02x", aByte));
      }
      return result.toString();
    }
}