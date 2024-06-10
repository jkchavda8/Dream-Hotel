import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <h1 className='title-list'>Your Wish List</h1>
        <div className="list">
          {wishList?.map((listing) => (
            <ListingCard
              key={listing._id} // Added key prop
              listingId={listing._id}
              creator={listing.creator}
              listingPhotoPaths={listing.listingPhotoPaths}
              city={listing.city}
              state={listing.state}
              country={listing.country}
              category={listing.category}
              type={listing.type}
              price={listing.price}
              booking={listing.booking}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
