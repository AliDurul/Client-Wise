'use client';
import React, { useState } from 'react'
import ProductTable from './ProductTable';
import ProductGrid from './ProductGrid';
import { useAppSelector } from '@/lib/hooks';
import { selectProductModal } from '@/lib/features/products/productSlice';
import ProductModal from './ProductModal';
import ProductHeaderBtns from './ProductHeaderBtns';

export default function ProductDisplay({ products }: { products: any }) {

    // hooks
    const [uiType, setUiType] = useState('list');
    const isOpen = useAppSelector(selectProductModal);


    return (
        <>
            <ProductHeaderBtns uiType={uiType} setUiType={setUiType} />

            {uiType === 'list'
                ? <ProductTable products={products} />
                : <ProductGrid products={products.result} />
            }
            {isOpen && <ProductModal />}
        </>
    )
}
