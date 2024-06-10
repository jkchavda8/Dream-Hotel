import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setTripList } from '../redux/state';
import ListingCard from '../components/ListingCard';
import "../styles/TripList.css";
import Footer from '../components/Footer';

const TripList = () => {
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id);
    const tripList = useSelector((state) => state.user.tripList);
    const dispatch = useDispatch();

    const getTripList = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${userId}/trips`, {
                method: "GET"
            });
            const data = await response.json();
            dispatch(setTripList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch triplist is failed!", err.message);
        }
    };

    useEffect(() => {
        getTripList();
    }, []);

    return (
        <div className="page-container">
            <Navbar />
            <div className="content">
                <h1 className='title-list'>Your Trip List</h1>
                <div className="list">
                    {loading ? (
                        <Loader />
                    ) : (
                        tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
                            <ListingCard
                                key={listingId._id}
                                listingId={listingId._id}
                                creator={hostId._id}
                                listingPhotoPaths={listingId.listingPhotoPaths}
                                city={listingId.city}
                                state={listingId.state}
                                country={listingId.country}
                                category={listingId.category}
                                startDate={startDate}
                                endDate={endDate}
                                totalPrice={totalPrice}
                                booking={booking}
                            />
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TripList;
