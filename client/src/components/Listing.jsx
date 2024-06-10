import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from "../data";
import "../styles/Listing.css";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { setListings } from "../redux/state";

const Listing = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const listings = useSelector((state) => state.listings);

    const getFeedListings = async () => {
        try {
            const response = await fetch(
                selectedCategory !== "All" 
                ? `http://localhost:5000/properties?category=${selectedCategory}` 
                : "http://localhost:5000/properties",
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch listings");
            }

            const data = await response.json();
            dispatch(setListings({ listings: data }));
            setLoading(false);

        } catch (err) {
            console.log("Fetch Listings failed!", err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getFeedListings();
    }, [selectedCategory, dispatch]);

    return (
        <div>
            <div className='category-list'>
                {categories?.map((category, index) => (
                    <div
                        className={`category ${selectedCategory === category.label ? 'selected' : ''}`}
                        key={index}
                        onClick={() => setSelectedCategory(category.label)}
                    >
                        <div className='category_icon'>{category.icon}</div>
                        <p>{category.label}</p>
                    </div>
                ))}
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="listings">
                    {listings.map(({
                        _id, creator, listingPhotoPaths, city, state, country, category, type, price, booking = false
                    }) => (
                        <ListingCard
                            key={_id}
                            listingId={_id}
                            creator={creator}
                            listingPhotoPaths={listingPhotoPaths}
                            city={city}
                            state={state}
                            country={country}
                            category={category}
                            type={type}
                            price={price}
                            booking={booking}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Listing;
