import React, { useState, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
}

const productUrl = "https://fakestoreapi.com/products";

const PaginationExample: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;
    const [items, setItems] = useState<Product[]>([]);  // Array of Product objects

    const fetchProducts = async (): Promise<void> => {
        try {
            const response = await fetch(productUrl);

            if (!response.ok) {
                console.log("Couldn't fetch products");
                return;
            }

            const products: Product[] = await response.json();
            setItems(products);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const totalPages: number = Math.ceil(items.length / itemsPerPage);

    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentItems: Product[] = items.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {currentItems.map(item => (
                    <li key={item.id}>{item.title}</li>  // 'id' is used as the key
                ))}
            </ul>

            <div>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationExample;
