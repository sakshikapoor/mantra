import { Header } from './Header.js';
import { useEffect, useState } from 'react';
import { FilterBox } from './FilterBox.js';
import { ProductShowcase } from './ProductShowcase.js';
import './Products.css';

function getFilters(products) {

    const brands = new Set([]);
    const gender = new Set([]);
    const category = new Set([]);

    products.forEach(product => {
        brands.add(product.brand);
        gender.add(product.gender);
        category.add(product.category);
    })

    return {
        brands: [...brands],
        gender: [...gender],
        category: [...category]
    }
}



export function Product() {

    const [products, setProducts] = useState([]);
    const [availableFilters, setFilters] = useState({});
    const [showcase, setShowcase] = useState([]);
    const [resetFilters, setResetFilters] = useState(false);

    function filterBySearch(filter) {
        if (filter.trim().toLowerCase() === "") {
            setShowcase(products);
        } else {
            const filteredItems = [...products].filter(product =>
                product.productName.toLowerCase().includes(filter.trim().toLowerCase())
            )
            setShowcase(filteredItems);
        }
        setResetFilters(true);
    }


    function addFilter(filters) {
        setResetFilters(false);
        if (Object.values(filters).length) {

            let filteredList;
            //filter by brand
            filteredList = filters.brands.length ? [...products].filter(product =>
                filters.brands.includes(product.brand)

            ) : [...products];

            //filter by category
            filteredList = filters.category.length ? [...filteredList].filter(product =>
                filters.category.includes(product.category)

            ) : [...filteredList];

            //filter by gender
            filteredList = filters.gender.length ? [...filteredList].filter(product =>
                filters.gender.includes(product.gender)

            ) : [...filteredList];
            setShowcase(filteredList)
        }
    }

    useEffect(() => {
        fetch('https://demo7242716.mockable.io/products', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                setProducts(response.products);
                setShowcase(response.products)
                if (response.products && response.products.length) {
                    setFilters(getFilters(response.products));
                }
            })

    }, []);


    return (
        <div>
            <Header filterBySearch={filterBySearch} />
            <div className="main-wrapper">
                <FilterBox filters={availableFilters} resetFilters={resetFilters} addFilter={addFilter} />
                <ProductShowcase products={showcase} />
            </div>

        </div>
    )
}