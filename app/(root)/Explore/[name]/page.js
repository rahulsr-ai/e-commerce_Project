import React from 'react'
import { notFound } from 'next/navigation';


const ExplorePage = ({ params }) => {
    const { name } = params;

    if (!name) {
        notFound()
    }
    return (
        <div className="p-6 mt-36">
            <h1 className="text-2xl font-bold capitalize">{name} of ExplorePage</h1>
            <p>Showing products for {name}</p>
        </div>
    );
}

export default ExplorePage