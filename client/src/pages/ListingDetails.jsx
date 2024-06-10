import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import '../styles/ListingDetails.css'; 
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const ListingDetails = () => {
    const [loading, setLoading] = useState(true);
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    const getListingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/properties/${listingId}`, {
                method: "GET",
            });

            const data = await response.json();
            setListing(data);
            setLoading(false);
        } catch (err) {
            console.log('Error fetching listing details:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getListingDetails();
    }, [listingId]);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // // Debugging: Log the listing data
    // console.log('Listing:', listing);
    const navigate = useNavigate();
    const customerId = useSelector((state)=> state?.user?._id);

    const handleSubmit = async ()=>{
        try{
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
                totalPrice: listing.price * dayCount,
            }

            const response = await fetch('http://localhost:5000/bookings/create',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(bookingForm)
            });

            if(response.ok){
                navigate(`/${customerId}/trips`);
            }
        }catch(err){
            console.log(err);
        }
    }

    return loading ? (
        <Loader />
    ) : (
        <div className='page-container'>
            <Navbar />
            <div className='listing-details'>
                <div className='title'>
                    <h1>{listing.title}</h1>
                    <div></div>
                </div>

                <div className="photos">
                    {listing.listingPhotoPaths?.map((item, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/${item.replace("public", "")}`}
                            alt="listing photo"
                        />
                    ))}
                </div>

                <h2>{listing.type} in {listing.city}, {listing.state}, {listing.country}</h2>
                <p>
                    {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
                    {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
                </p>
                <hr />
                <div className='profile'>
                    {listing.creator && listing.creator.profileImagePath && (
                        <img
                            src={`http://localhost:5000/${listing.creator.profileImagePath.replace("public", "")}`}
                            alt="profile"
                        />
                    )}
                    {listing.creator && (
                        <h3>
                            Hosted by {listing.creator.firstName} {listing.creator.lastName}
                        </h3>
                    )}
                </div>
                <hr />

                <h3>Description</h3>
                <p>{listing.description}</p>
                <hr />

                <h3>{listing.highlight}</h3>
                <p>{listing.highlightDesc}</p>
                <hr />

                <div className="booking">
                    <div>
                        <h2>What this place offers?</h2>
                        <div className="resource">
                            {listing.resource.map((item, index) => (
                                <div className="facility" key={index}>
                                    <div className="facility_icon">
                                        {facilities.find((facility) => facility.name === item)?.icon}
                                    </div>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2>How long do you want to stay?</h2>
                        <div className='date-range-calendar'>
                            <DateRange ranges={dateRange} onChange={handleSelect} />
                            {dayCount > 1 ? (
                                <h2>₹{listing.price} x {dayCount} days</h2>
                            ) : (
                                <h2>₹{listing.price} x {dayCount} day</h2>
                            )}
                            <h2>Total price: ₹{listing.price * dayCount}</h2>
                            <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                            <p>End Date: {dateRange[0].endDate.toDateString()}</p>

                            <button className="button" type="submit" onClick={handleSubmit}>
                                BOOKING
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ListingDetails;
