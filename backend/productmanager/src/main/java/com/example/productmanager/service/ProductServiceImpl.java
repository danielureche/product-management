package com.example.productmanager.service;

import com.example.productmanager.dto.ProductRequest;
import com.example.productmanager.dto.ProductResponse;
import com.example.productmanager.exception.ResourceNotFoundException;
import com.example.productmanager.mapper.IProductMapper;
import com.example.productmanager.model.Product;
import com.example.productmanager.repository.IProductRepository;
import com.example.productmanager.utils.ErrorMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService{

    private final IProductRepository repository;
    private final IProductMapper mapper;

    public ProductServiceImpl(IProductRepository repository, IProductMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public ProductResponse create(ProductRequest request) {
        Product product = mapper.toEntity(request);
        return mapper.toResponse(repository.save(product));
    }

    @Override
    public List<ProductResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public ProductResponse findById(Long id) {
        return mapper.toResponse(getProduct(id));
    }

    @Override
    public List<ProductResponse> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = getProduct(id);
        mapper.updateEntityFromRequest(request, product);
        return mapper.toResponse(repository.save(product));
    }

    @Override
    public void changeStatus(Long id, Boolean active) {
        Product product = getProduct(id);
        product.setActive(active);
        repository.save(product);
    }

    @Override
    public void delete(Long id) {
        repository.delete(getProduct(id));
    }

    private Product getProduct(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                ErrorMessage.PRODUCT_NOT_FOUND.format(id)
                        ));
    }

}
