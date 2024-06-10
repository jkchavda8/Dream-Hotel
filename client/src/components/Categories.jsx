import React from 'react';
import { categories } from "../data";
import { Link } from "react-router-dom";
import "../styles/Categories.css";

const Categories = () => {
  return (
    <div className='categories'>
        <h1>Discover Popular Categories</h1>
        <p>
        Browse through our extensive selection of vacation rentals tailored for every type of traveler. Dive into the local culture, relish the comforts of home, and make unforgettable memories at your dream destination.
        </p>
        <div className='categoriesList'>
            {categories?.slice(1, 7).map((category, index) => (
            <Link to={`/properties/category/${category.label}`} key={index}>
                <div className="category">
                <img src={category.img} alt={category.label} />
                <div className="overlay"></div>
                <div className="category_text">
                    <div className="category_text_icon">{category.icon}</div>
                    <p>{category.label}</p>
                </div>
                </div>
            </Link>
            ))}
        </div>
    </div>
  );
}

export default Categories;
