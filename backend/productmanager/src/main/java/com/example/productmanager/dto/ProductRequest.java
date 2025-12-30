package com.example.productmanager.dto;

import com.example.productmanager.utils.ValidationMessage;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = ValidationMessage.NAME_REQUIRED)
        String name,

        String description,

        @NotNull(message = ValidationMessage.PRICE_REQUIRED)
        @DecimalMin(
                value = ValidationMessage.PRICE_MIN,
                message = ValidationMessage.PRICE_GREATER_THAN_ZERO
        )
        BigDecimal price,

        @NotNull(message = ValidationMessage.STOCK_REQUIRED)
        @Min(
                value = ValidationMessage.STOCK_MIN,
                message = ValidationMessage.STOCK_NOT_NEGATIVE
        )
        Integer stock
) {
}
