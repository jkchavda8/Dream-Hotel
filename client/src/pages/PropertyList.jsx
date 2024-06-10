import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import { setPropertyList } from '../redux/state';
import Loader from "../components/Loader";
import Footer from '../components/Footer';

const PropertyList = () => {

    const [loading,setLoading] = useState(true);
    const user = useSelector((state)=> state.user);
    const propertyList = user?.propertyList;
    const dispatch = useDispatch();

    const getPropertyList = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${user._id}/properties`, {
                method: "GET"
            });
            const data = await response.json();
            dispatch(setPropertyList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch all properties failed!", err.message);
        }
    };

    useEffect(() => {
        getPropertyList();
    }, []);

    return (
        <div className="page-container">
            <Navbar />
            <div className="content">
                <h1 className='title-list'>Your Property List</h1>
                <div className="list">
                    {loading ? (
                        <Loader />
                    ) : (
                        propertyList?.map(
                            ({
                                _id,
                                creator,
                                listingPhotoPaths,
                                city,
                                state,
                                country,
                                category,
                                type,
                                price,
                                booking = false,
                            }) => (
                                <ListingCard
                                    key={_id} // Added key prop
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
                            )
                        )
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyList;
