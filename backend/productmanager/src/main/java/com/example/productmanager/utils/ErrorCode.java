package com.example.productmanager.utils;

public enum ErrorCode {
    PRODUCT_NOT_FOUND("ERR_404"),
    VALIDATION_ERROR("ERR_400"),
    INTERNAL_SERVER_ERROR("ERR_500");

    private final String code;

    ErrorCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
