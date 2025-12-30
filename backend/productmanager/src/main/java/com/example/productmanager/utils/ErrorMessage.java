package com.example.productmanager.utils;

public enum ErrorMessage {
    PRODUCT_NOT_FOUND("Product not found with id: %s"),
    VALIDATION_FAILED("Validation failed"),
    INTERNAL_SERVER_ERROR("Internal server error");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String format(Object... args) {
        return String.format(message, args);
    }

    public String getMessage() {
        return message;
    }
}
