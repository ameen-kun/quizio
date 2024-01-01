package com.example.demo.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HasherUtil {
	public static String hashPassword(String password, String algorithm) {
        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Unsupported hashing algorithm: " + algorithm, e);
        }
    }

    public static boolean verifyPassword(String candidatePassword, String hashedPassword, String algorithm) {
        String candidateHash = hashPassword(candidatePassword, algorithm);
        return candidateHash.equals(hashedPassword);
    }

    public static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
        }
        return result.toString();
    }
}
