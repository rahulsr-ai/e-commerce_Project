import React from 'react';

const DEALS = [
  {
    id: 1,
    name: "4K Ultra HD Smart TV",
    price: 699.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    price: 249.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Professional Gaming Laptop",
    price: 1299.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Smart Watch Series X",
    price: 399.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
  },
];

export function DealsSlider() {
  return (
    <div className="overflow-hidden py-8 lg:mx-12">
      <div className="relative">
        <div className="flex gap-10 animate-marquee ">
          {DEALS.map((deal) => (
            <div key={deal.id} className="relative rounded-xl mx-10 flex-none w-[300px] group cursor-pointer inline-block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"  />
                <div className="absolute bottom-0 left-0 right-0 p-4 rounded-xl">
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                    Save {deal.discount}%
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{deal.name}</h3>
                  <p className="text-xl font-bold text-indigo-400">
                    ${deal.price.toFixed(2)}
                  </p>
                </div>
                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
          {DEALS.map((deal) => (
            <div key={deal.id + '2'} className="relative rounded-xl mx-10 flex-none w-[300px] group cursor-pointer inline-block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                    Save {deal.discount}%
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{deal.name}</h3>
                  <p className="text-xl font-bold text-indigo-400">
                    ${deal.price.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-xl absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
