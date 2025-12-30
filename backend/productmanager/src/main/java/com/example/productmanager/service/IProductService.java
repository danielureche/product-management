package com.example.productmanager.service;

import com.example.productmanager.dto.ProductRequest;
import com.example.productmanager.dto.ProductResponse;

import java.util.List;

public interface IProductService {
    ProductResponse create(ProductRequest request);
    List<ProductResponse> findAll();
    ProductResponse findById(Long id);
    List<ProductResponse> searchByName(String name);
    ProductResponse update(Long id, ProductRequest request);
    void changeStatus(Long id, Boolean active);
    void delete(Long id);
}
