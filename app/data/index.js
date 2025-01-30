export const brands = [
    {
        name: "Nike",
        logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4f3.png",
    },
    {
        name: "Adidas",
        logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c486.png",
    },
    {
        name: "Puma",
        logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4c0.png",
    },
    {
        name: "Under Armour",
        logo: "https://assets.stickpng.com/images/584297c4a6515b1e0ad75aca.png",
    },
    {
        name: "New Balance",
        logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4ae.png",
    },
];


export const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Fashion Enthusiast",
        content:
            "StoreX has completely transformed my shopping experience. The quality of products and customer service is unmatched!",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Tech Reviewer",
        content:
            "As a tech enthusiast, I'm impressed by the range of premium electronics available. Fast shipping and great prices!",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    },
];





export const usp = [
    {
        icon: <Truck size={24} />,
        title: "Free Shipping",
        subHeading: "On orders over $100",
    },
    {
        icon: <Shield size={24} />,
        title: "Secure Payment",
        subHeading: "100% secure payment",
    },
    {
        icon: <Clock size={24} />,
        title: "24/7 Support",
        subHeading: "Dedicated support",
    },
    {
        icon: <TrendingUp size={24} />,
        title: "Best Prices",
        subHeading: "Quality products",
    },
];

 /// -----------------------------------------------------

export const CategoriesNameandSubData = {
    "categories": [
      {
        "name": "Electronics",
        "subcategories": [
          "Mobiles & Accessories",
          "Laptops & PCs",
          "Smartwatches",
          "Headphones & Audio",
          "Gaming & Consoles"
        ]
      },
      {
        "name": "Fashion",
        "subcategories": [
          "Mens Wear",
          "Womens Wear",
          "Footwear",
          "Watches & Accessories",
          "Bags & Wallets"
        ]
      },
      {
        "name": "Home & Living",
        "subcategories": [
          "Furniture",
          "Home Decor",
          "Kitchen & Dining",
          "Smart Home",
          "Storage & Organizers"
        ]
      },
      {
        "name": "Beauty & Personal Care",
        "subcategories": [
          "Skincare & Makeup",
          "Haircare",
          "Grooming",
          "Fragrances",
          "Health & Wellness"
        ]
      },
      {
        "name": "Sports & Fitness",
        "subcategories": [
          "Sportswear",
          "Gym & Fitness",
          "Sports Shoes",
          "Yoga & Wellness",
          "Outdoor & Adventure"
        ]
      }
    ]
  }


// Electronic Category Data
 export const ElectronicsCategoryData =  {
    "category": "Electronics",
    "subcategories": [
      {
        "name": "Mobile Phones",
        "products": [
          {
            "name": "Samsung Galaxy S21",
            "price": 799,
            "image": "https://link_to_image.com/samsung-galaxy-s21.jpg",
            "description": "Latest model with 5G connectivity",
            "ratings": 4.5,
            "availability": "In Stock"
          },
          {
            "name": "iPhone 13",
            "price": 999,
            "image": "https://link_to_image.com/iphone-13.jpg",
            "description": "Apple's flagship phone with A15 Bionic chip",
            "ratings": 4.7,
            "availability": "In Stock"
          },
          {
            "name": "OnePlus 9 Pro",
            "price": 1069,
            "image": "https://link_to_image.com/oneplus-9-pro.jpg",
            "description": "High-end flagship with AMOLED display",
            "ratings": 4.6,
            "availability": "In Stock"
          },
          {
            "name": "Google Pixel 6",
            "price": 599,
            "image": "https://link_to_image.com/google-pixel-6.jpg",
            "description": "Google's latest phone with Tensor chip",
            "ratings": 4.4,
            "availability": "In Stock"
          },
          {
            "name": "Xiaomi Mi 11",
            "price": 749,
            "image": "https://link_to_image.com/xiaomi-mi-11.jpg",
            "description": "Flagship phone with Snapdragon 888",
            "ratings": 4.3,
            "availability": "Out of Stock"
          }
        ]
      },
      {
        "name": "Laptops",
        "products": [
          {
            "name": "MacBook Pro 14",
            "price": 1999,
            "image": "https://link_to_image.com/macbook-pro.jpg",
            "description": "Apple's latest laptop with M1 Pro chip",
            "ratings": 4.8,
            "availability": "Out of Stock"
          },
          {
            "name": "Dell XPS 13",
            "price": 1299,
            "image": "https://link_to_image.com/dell-xps-13.jpg",
            "description": "Powerful ultrabook with Intel i7",
            "ratings": 4.6,
            "availability": "In Stock"
          },
          {
            "name": "HP Spectre x360",
            "price": 1599,
            "image": "https://link_to_image.com/hp-spectre-x360.jpg",
            "description": "Convertible ultrabook with 4K display",
            "ratings": 4.7,
            "availability": "In Stock"
          },
          {
            "name": "Asus ZenBook 13",
            "price": 999,
            "image": "https://link_to_image.com/asus-zenbook-13.jpg",
            "description": "Slim laptop with Intel Core i5",
            "ratings": 4.5,
            "availability": "In Stock"
          },
          {
            "name": "Lenovo ThinkPad X1 Carbon",
            "price": 1750,
            "image": "https://link_to_image.com/lenovo-thinkpad-x1-carbon.jpg",
            "description": "Business laptop with Intel Core i7",
            "ratings": 4.6,
            "availability": "Out of Stock"
          }
        ]
      },
      {
        "name": "Headphones",
        "products": [
          {
            "name": "Sony WH-1000XM4",
            "price": 349,
            "image": "https://link_to_image.com/sony-wh-1000xm4.jpg",
            "description": "Noise-canceling headphones with excellent sound",
            "ratings": 4.8,
            "availability": "In Stock"
          },
          {
            "name": "Bose QuietComfort 35 II",
            "price": 299,
            "image": "https://link_to_image.com/bose-quietcomfort-35-ii.jpg",
            "description": "Comfortable noise-canceling headphones",
            "ratings": 4.7,
            "availability": "In Stock"
          },
          {
            "name": "Sennheiser Momentum 3",
            "price": 399,
            "image": "https://link_to_image.com/sennheiser-momentum-3.jpg",
            "description": "High-quality sound with active noise cancellation",
            "ratings": 4.6,
            "availability": "Out of Stock"
          },
          {
            "name": "Apple AirPods Max",
            "price": 549,
            "image": "https://link_to_image.com/apple-airpods-max.jpg",
            "description": "Premium over-ear headphones with spatial audio",
            "ratings": 4.5,
            "availability": "In Stock"
          },
          {
            "name": "Jabra Elite 85h",
            "price": 249,
            "image": "https://link_to_image.com/jabra-elite-85h.jpg",
            "description": "Noise-canceling headphones with great battery life",
            "ratings": 4.4,
            "availability": "In Stock"
          }
        ]
      },
      {
        "name": "Smart Watches",
        "products": [
          {
            "name": "Apple Watch Series 7",
            "price": 399,
            "image": "https://link_to_image.com/apple-watch-series-7.jpg",
            "description": "Smart watch with ECG, blood oxygen, and fitness tracking",
            "ratings": 4.9,
            "availability": "In Stock"
          },
          {
            "name": "Samsung Galaxy Watch 4",
            "price": 249,
            "image": "https://link_to_image.com/samsung-galaxy-watch-4.jpg",
            "description": "Wear OS smartwatch with fitness tracking features",
            "ratings": 4.7,
            "availability": "In Stock"
          },
          {
            "name": "Garmin Venu 2",
            "price": 399,
            "image": "https://link_to_image.com/garmin-venu-2.jpg",
            "description": "Advanced fitness tracking with AMOLED display",
            "ratings": 4.6,
            "availability": "Out of Stock"
          },
          {
            "name": "Fitbit Sense",
            "price": 299,
            "image": "https://link_to_image.com/fitbit-sense.jpg",
            "description": "Health-focused smartwatch with stress management",
            "ratings": 4.5,
            "availability": "In Stock"
          },
          {
            "name": "Amazfit GTR 3",
            "price": 179,
            "image": "https://link_to_image.com/amazfit-gtr-3.jpg",
            "description": "Affordable smartwatch with long battery life",
            "ratings": 4.4,
            "availability": "In Stock"
          }
        ]
      }
    ]
  }
  

  // Fashion Category Data
export const FashionCategoryData = {
    category: "Fashion",
    subcategories: [
      {
        name: "Men’s Wear",
        products: [
          {
            name: "Men’s Casual Shirt",
            price: 29.99,
            image: "https://link_to_image.com/mens-casual-shirt.jpg",
            description: "Comfortable casual shirt in various sizes",
            ratings: 4.4,
            availability: "In Stock"
          },
          {
            name: "Slim Fit Jeans",
            price: 49.99,
            image: "https://link_to_image.com/slim-fit-jeans.jpg",
            description: "Stylish slim fit jeans for a modern look",
            ratings: 4.6,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Women’s Wear",
        products: [
          {
            name: "Women’s Floral Dress",
            price: 59.99,
            image: "https://link_to_image.com/womens-floral-dress.jpg",
            description: "Elegant floral dress for casual or semi-formal occasions",
            ratings: 4.7,
            availability: "In Stock"
          },
          {
            name: "High-Waisted Trousers",
            price: 45.99,
            image: "https://link_to_image.com/high-waisted-trousers.jpg",
            description: "Perfect for office or casual wear",
            ratings: 4.5,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Footwear",
        products: [
          {
            name: "Nike Air Max 270",
            price: 129.99,
            image: "https://link_to_image.com/nike-air-max-270.jpg",
            description: "Stylish and comfortable sneakers for everyday wear",
            ratings: 4.8,
            availability: "In Stock"
          },
          {
            name: "Adidas Ultraboost",
            price: 179.99,
            image: "https://link_to_image.com/adidas-ultraboost.jpg",
            description: "High-performance running shoes with Boost cushioning",
            ratings: 4.7,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Watches & Accessories",
        products: [
          {
            name: "Rolex Submariner",
            price: 7999.99,
            image: "https://link_to_image.com/rolex-submariner.jpg",
            description: "Luxury dive watch with stainless steel case",
            ratings: 4.9,
            availability: "In Stock"
          },
          {
            name: "Casio G-Shock",
            price: 99.99,
            image: "https://link_to_image.com/casio-g-shock.jpg",
            description: "Durable and stylish digital watch",
            ratings: 4.6,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Bags & Wallets",
        products: [
          {
            name: "Leather Briefcase",
            price: 149.99,
            image: "https://link_to_image.com/leather-briefcase.jpg",
            description: "Elegant leather briefcase for professionals",
            ratings: 4.5,
            availability: "In Stock"
          },
          {
            name: "Canvas Backpack",
            price: 39.99,
            image: "https://link_to_image.com/canvas-backpack.jpg",
            description: "Durable and stylish backpack for everyday use",
            ratings: 4.4,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      }
    ]
  };
  
  // Sports & Fitness Category Data
  export const SportsAndFitnessCategoryData = {
    category: "Sports & Fitness",
    subcategories: [
      {
        name: "Sportswear",
        products: [
          {
            name: "Nike Dri-FIT T-Shirt",
            price: 34.99,
            image: "https://link_to_image.com/nike-dri-fit-tshirt.jpg",
            description: "Comfortable and breathable sports T-shirt",
            ratings: 4.6,
            availability: "In Stock"
          },
          {
            name: "Adidas Training Shorts",
            price: 29.99,
            image: "https://link_to_image.com/adidas-training-shorts.jpg",
            description: "Stretchable and lightweight shorts for training",
            ratings: 4.5,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Gym & Fitness",
        products: [
          {
            name: "Resistance Bands Set",
            price: 25.99,
            image: "https://link_to_image.com/resistance-bands-set.jpg",
            description: "Versatile resistance bands for home workouts",
            ratings: 4.7,
            availability: "In Stock"
          },
          {
            name: "Yoga Mat",
            price: 19.99,
            image: "https://link_to_image.com/yoga-mat.jpg",
            description: "Non-slip yoga mat for stability during workouts",
            ratings: 4.8,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Sports Shoes",
        products: [
          {
            name: "Nike Air Zoom Pegasus 38",
            price: 119.99,
            image: "https://link_to_image.com/nike-air-zoom-pegasus-38.jpg",
            description: "Durable running shoes for all levels of athletes",
            ratings: 4.6,
            availability: "In Stock"
          },
          {
            name: "Adidas Ultraboost 21",
            price: 180.99,
            image: "https://link_to_image.com/adidas-ultraboost-21.jpg",
            description: "Comfortable and responsive running shoes",
            ratings: 4.7,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Yoga & Wellness",
        products: [
          {
            name: "Yoga Block Set",
            price: 12.99,
            image: "https://link_to_image.com/yoga-block-set.jpg",
            description: "Set of foam yoga blocks for enhanced flexibility",
            ratings: 4.4,
            availability: "In Stock"
          },
          {
            name: "Aromatherapy Diffuser",
            price: 29.99,
            image: "https://link_to_image.com/aromatherapy-diffuser.jpg",
            description: "Create a relaxing atmosphere with essential oils",
            ratings: 4.5,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Outdoor & Adventure",
        products: [
          {
            name: "Camping Tent",
            price: 129.99,
            image: "https://link_to_image.com/camping-tent.jpg",
            description: "Compact and easy-to-setup tent for outdoor adventures",
            ratings: 4.6,
            availability: "In Stock"
          },
          {
            name: "Hiking Backpack",
            price: 69.99,
            image: "https://link_to_image.com/hiking-backpack.jpg",
            description: "Durable and spacious backpack for hiking trips",
            ratings: 4.5,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      }
    ]
  };


  // Beauty & Personal Care Category Data
export const BeautyAndPersonalCareCategoryData = {
    category: "Beauty & Personal Care",
    subcategories: [
      {
        name: "Skin Care",
        products: [
          {
            name: "Moisturizing Face Cream",
            price: 19.99,
            image: "https://link_to_image.com/moisturizing-face-cream.jpg",
            description: "Hydrating face cream for all skin types",
            ratings: 4.7,
            availability: "In Stock"
          },
          {
            name: "Vitamin C Serum",
            price: 29.99,
            image: "https://link_to_image.com/vitamin-c-serum.jpg",
            description: "Brightening serum with antioxidants for youthful skin",
            ratings: 4.8,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Hair Care",
        products: [
          {
            name: "Anti-Hair Loss Shampoo",
            price: 15.99,
            image: "https://link_to_image.com/anti-hair-loss-shampoo.jpg",
            description: "Shampoo that strengthens hair and prevents hair loss",
            ratings: 4.6,
            availability: "In Stock"
          },
          {
            name: "Hair Growth Oil",
            price: 18.99,
            image: "https://link_to_image.com/hair-growth-oil.jpg",
            description: "Nourishing oil that promotes healthy hair growth",
            ratings: 4.7,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Makeup",
        products: [
          {
            name: "Matte Liquid Lipstick",
            price: 14.99,
            image: "https://link_to_image.com/matte-liquid-lipstick.jpg",
            description: "Long-lasting, smudge-proof liquid lipstick",
            ratings: 4.8,
            availability: "In Stock"
          },
          {
            name: "Waterproof Mascara",
            price: 12.99,
            image: "https://link_to_image.com/waterproof-mascara.jpg",
            description: "Clump-free waterproof mascara for voluminous lashes",
            ratings: 4.6,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Fragrances",
        products: [
          {
            name: "Eau de Parfum - Floral Bouquet",
            price: 39.99,
            image: "https://link_to_image.com/eau-de-parfum-floral-bouquet.jpg",
            description: "Luxurious floral fragrance with notes of rose and jasmine",
            ratings: 4.7,
            availability: "In Stock"
          },
          {
            name: "Citrus Fresh Cologne",
            price: 24.99,
            image: "https://link_to_image.com/citrus-fresh-cologne.jpg",
            description: "Refreshing cologne with a blend of citrus fruits",
            ratings: 4.5,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Personal Care",
        products: [
          {
            name: "Electric Toothbrush",
            price: 49.99,
            image: "https://link_to_image.com/electric-toothbrush.jpg",
            description: "High-performance electric toothbrush for a deep clean",
            ratings: 4.6,
            availability: "In Stock"
          },
          {
            name: "Body Scrub",
            price: 19.99,
            image: "https://link_to_image.com/body-scrub.jpg",
            description: "Exfoliating body scrub for smooth and glowing skin",
            ratings: 4.7,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      }
    ]
  };
  

  // Home & Living Category Data
  export const HomeLivingCategoryData = {
    category: "Home & Living",
    subcategories: [
      {
        name: "Furniture",
        products: [
          {
            name: "Sofa Set",
            price: 799.99,
            image: "https://link_to_image.com/sofa-set.jpg",
            description: "Comfortable and modern sofa set for living rooms",
            ratings: 4.7,
            availability: "In Stock"
          },
          {
            name: "Dining Table",
            price: 499.99,
            image: "https://link_to_image.com/dining-table.jpg",
            description: "Elegant dining table with six chairs",
            ratings: 4.6,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Home Decor",
        products: [
          {
            name: "Wall Art Canvas",
            price: 39.99,
            image: "https://link_to_image.com/wall-art-canvas.jpg",
            description: "Beautiful canvas painting for home decor",
            ratings: 4.5,
            availability: "In Stock"
          },
          {
            name: "Floor Lamp",
            price: 59.99,
            image: "https://link_to_image.com/floor-lamp.jpg",
            description: "Stylish floor lamp to brighten your room",
            ratings: 4.4,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Kitchen & Dining",
        products: [
          {
            name: "Cookware Set",
            price: 149.99,
            image: "https://link_to_image.com/cookware-set.jpg",
            description: "Durable non-stick cookware set for all your cooking needs",
            ratings: 4.7,
            availability: "In Stock"
          },
          {
            name: "Dining Plates Set",
            price: 59.99,
            image: "https://link_to_image.com/dining-plates-set.jpg",
            description: "Elegant dinnerware set for family meals",
            ratings: 4.5,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Smart Home",
        products: [
          {
            name: "Smart Thermostat",
            price: 149.99,
            image: "https://link_to_image.com/smart-thermostat.jpg",
            description: "Smart thermostat for efficient temperature control",
            ratings: 4.6,
            availability: "In Stock"
          },
          {
            name: "Smart Light Bulbs",
            price: 29.99,
            image: "https://link_to_image.com/smart-light-bulbs.jpg",
            description: "Color-changing light bulbs with app control",
            ratings: 4.7,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      },
      {
        name: "Storage & Organizers",
        products: [
          {
            name: "Closet Organizer Set",
            price: 69.99,
            image: "https://link_to_image.com/closet-organizer-set.jpg",
            description: "Set of storage boxes to organize your closet",
            ratings: 4.5,
            availability: "In Stock"
          },
          {
            name: "Under-Bed Storage Bins",
            price: 39.99,
            image: "https://link_to_image.com/under-bed-storage-bins.jpg",
            description: "Space-saving storage bins for under the bed",
            ratings: 4.4,
            availability: "In Stock"
          },
          // Add more products as needed
        ]
      }
    ]
  };
  

/// -----------------------------------------------------





 const dummyData =  {
    "categories": [
      {
        "category": "Electronics",
        "subcategories": [
          {
            "name": "Mobiles & Accessories",
            "products": [
              {
                "name": "Samsung Galaxy S21",
                "price": 799,
                "image": "https://link_to_image.com/samsung-galaxy-s21.jpg",
                "description": "Latest model with 5G connectivity",
                "ratings": 4.5,
                "availability": "In Stock"
              },
              {
                "name": "iPhone 13",
                "price": 999,
                "image": "https://link_to_image.com/iphone-13.jpg",
                "description": "Apple's flagship phone with A15 Bionic chip",
                "ratings": 4.7,
                "availability": "In Stock"
              },
              {
                "name": "OnePlus 9 Pro",
                "price": 1069,
                "image": "https://link_to_image.com/oneplus-9-pro.jpg",
                "description": "High-end flagship with AMOLED display",
                "ratings": 4.6,
                "availability": "In Stock"
              },
              {
                "name": "Xiaomi Mi 11",
                "price": 749,
                "image": "https://link_to_image.com/xiaomi-mi-11.jpg",
                "description": "Flagship phone with Snapdragon 888",
                "ratings": 4.3,
                "availability": "Out of Stock"
              },
              {
                "name": "Google Pixel 6",
                "price": 599,
                "image": "https://link_to_image.com/google-pixel-6.jpg",
                "description": "Google's latest phone with Tensor chip",
                "ratings": 4.4,
                "availability": "In Stock"
              }
            ]
          },
          {
            "name": "Laptops & PCs",
            "products": [
              {
                "name": "MacBook Pro 14",
                "price": 1999,
                "image": "https://link_to_image.com/macbook-pro.jpg",
                "description": "Apple's latest laptop with M1 Pro chip",
                "ratings": 4.8,
                "availability": "Out of Stock"
              },
              {
                "name": "Dell XPS 13",
                "price": 1299,
                "image": "https://link_to_image.com/dell-xps-13.jpg",
                "description": "Powerful ultrabook with Intel i7",
                "ratings": 4.6,
                "availability": "In Stock"
              },
              {
                "name": "Asus ZenBook 13",
                "price": 999,
                "image": "https://link_to_image.com/asus-zenbook-13.jpg",
                "description": "Slim laptop with Intel Core i5",
                "ratings": 4.5,
                "availability": "In Stock"
              },
              {
                "name": "HP Spectre x360",
                "price": 1599,
                "image": "https://link_to_image.com/hp-spectre-x360.jpg",
                "description": "Convertible ultrabook with 4K display",
                "ratings": 4.7,
                "availability": "In Stock"
              },
              {
                "name": "Lenovo ThinkPad X1 Carbon",
                "price": 1750,
                "image": "https://link_to_image.com/lenovo-thinkpad-x1-carbon.jpg",
                "description": "Business laptop with Intel Core i7",
                "ratings": 4.6,
                "availability": "Out of Stock"
              }
            ]
          },
          {
            "name": "Smartwatches",
            "products": [
              {
                "name": "Apple Watch Series 7",
                "price": 399,
                "image": "https://link_to_image.com/apple-watch-series-7.jpg",
                "description": "Smart watch with ECG, blood oxygen, and fitness tracking",
                "ratings": 4.9,
                "availability": "In Stock"
              },
              {
                "name": "Samsung Galaxy Watch 4",
                "price": 249,
                "image": "https://link_to_image.com/samsung-galaxy-watch-4.jpg",
                "description": "Wear OS smartwatch with fitness tracking features",
                "ratings": 4.7,
                "availability": "In Stock"
              },
              {
                "name": "Garmin Venu 2",
                "price": 399,
                "image": "https://link_to_image.com/garmin-venu-2.jpg",
                "description": "Advanced fitness tracking with AMOLED display",
                "ratings": 4.6,
                "availability": "Out of Stock"
              },
              {
                "name": "Fitbit Sense",
                "price": 299,
                "image": "https://link_to_image.com/fitbit-sense.jpg",
                "description": "Health-focused smartwatch with stress management",
                "ratings": 4.5,
                "availability": "In Stock"
              },
              {
                "name": "Amazfit GTR 3",
                "price": 179,
                "image": "https://link_to_image.com/amazfit-gtr-3.jpg",
                "description": "Affordable smartwatch with long battery life",
                "ratings": 4.4,
                "availability": "In Stock"
              }
            ]
          }
        ]
      },
      {
        "category": "Fashion",
        "subcategories": [
          {
            "name": "Mens Wear",
            "products": [
              {
                "name": "Slim Fit Jeans",
                "price": 40,
                "image": "https://link_to_image.com/slim-fit-jeans.jpg",
                "description": "Comfortable slim-fit denim jeans",
                "ratings": 4.5,
                "availability": "In Stock"
              },
              {
                "name": "Graphic T-Shirt",
                "price": 25,
                "image": "https://link_to_image.com/graphic-tshirt.jpg",
                "description": "Stylish t-shirt with cool graphic design",
                "ratings": 4.6,
                "availability": "In Stock"
              },
              {
                "name": "Casual Sneakers",
                "price": 60,
                "image": "https://link_to_image.com/casual-sneakers.jpg",
                "description": "Comfortable sneakers for daily wear",
                "ratings": 4.7,
                "availability": "In Stock"
              },
              {
                "name": "Formal Shirt",
                "price": 45,
                "image": "https://link_to_image.com/formal-shirt.jpg",
                "description": "Stylish shirt for business casual wear",
                "ratings": 4.4,
                "availability": "In Stock"
              },
              {
                "name": "Leather Jacket",
                "price": 120,
                "image": "https://link_to_image.com/leather-jacket.jpg",
                "description": "High-quality leather jacket",
                "ratings": 4.8,
                "availability": "Out of Stock"
              }
            ]
          },
          {
            "name": "Women’s Wear",
            "products": [
              {
                "name": "Summer Dress",
                "price": 35,
                "image": "https://link_to_image.com/summer-dress.jpg",
                "description": "Light and airy dress perfect for summer",
                "ratings": 4.7,
                "availability": "In Stock"
              },
              {
                "name": "Blouse Top",
                "price": 30,
                "image": "https://link_to_image.com/blouse-top.jpg",
                "description": "Elegant blouse for formal or casual wear",
                "ratings": 4.6,
                "availability": "In Stock"
              },
              {
                "name": "Flats Sandals",
                "price": 25,
                "image": "https://link_to_image.com/flats-sandals.jpg",
                "description": "Comfortable sandals for summer wear",
                "ratings": 4.5,
                "availability": "In Stock"
              },
              {
                "name": "High Heels",
                "price": 50,
                "image": "https://link_to_image.com/high-heels.jpg",
                "description": "Stylish heels for evening wear",
                "ratings": 4.8,
                "availability": "In Stock"
              },
              {
                "name": "Denim Skirt",
                "price": 40,
                "image": "https://link_to_image.com/denim-skirt.jpg",
                "description": "Comfortable denim skirt for everyday wear",
                "ratings": 4.3,
                "availability": "Out of Stock"
              }
            ]
          }
        ]
      }
    ]
  }
  
  