import React from 'react'
import { notFound } from 'next/navigation';


const CategoryPage = ({ params }) => {
    const { name } = params;

    if (!name) {
        notFound()
    }
    return (
        <div className="p-6 mt-36">
            <h1 className="text-2xl font-bold capitalize">{name} Category</h1>
            <p>Showing products for {name}</p>
        </div>
    );
}

export default CategoryPage