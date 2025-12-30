package com.example.productmanager.utils;

public final class ValidationMessage {

    private ValidationMessage() {}

    public static final String NAME_REQUIRED = "Name is required";
    public static final String PRICE_REQUIRED = "Price is required";
    public static final String PRICE_GREATER_THAN_ZERO = "Price must be greater than zero";
    public static final String STOCK_REQUIRED = "Stock is required";
    public static final String STOCK_NOT_NEGATIVE = "Stock cannot be negative";

    public static final String PRICE_MIN = "0.01";
    public static final long STOCK_MIN = 0L;
}
