import React, { useEffect, useState } from 'react'

const NewFooter = () => {
    const [isdomloaded, setisdomloaded] = useState(false)

    useEffect(() => {
        setisdomloaded(true)
    }, [])
    return (isdomloaded &&
        <footer className="bg-[var(--background-color)] border-t border-purple-900/30 ">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-[var(--primary-text-color)] font-bold mb-4">About Us</h3>
                        <p className="text-gray-200-400">
                            Premium shopping destination for luxury products and exclusive
                            items.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-[var(--primary-text-color)] font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-200-400">
                            <li>Home</li>
                            <li>Products</li>
                            <li>Categories</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[var(--primary-text-color)] font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-gray-200-400">
                            <li>FAQ</li>
                            <li>Shipping</li>
                            <li>Returns</li>
                            <li>Track Order</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[var(--primary-text-color)] font-bold mb-4">Newsletter</h3>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-purple-900/20 text-[var(--primary-text-color)] px-4 py-2 rounded-l-lg flex-1"
                            />
                            <button className="bg-violet-600 text-[var(--primary-text-color)] px-4 py-2 rounded-r-lg hover:bg-violet-700">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-purple-900/30 text-center text-gray-200-400">
                    © 2024 Your Store. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default NewFooter