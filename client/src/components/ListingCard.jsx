import React, { useState } from 'react';
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from '@mui/icons-material';
import '../styles/ListingCard.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setWishList } from '../redux/state';

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  state,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const formatArrayToString = (arr) => arr.join(', ');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.some((item) => item?._id === listingId);

  const patchWishList = async (e) => {
    e.stopPropagation();
    if (user?._id !== creator._id) {
      const response = await fetch(`http://localhost:5000/users/${user?._id}/${listingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    }
  };

  return (
    <div className='listing-card' onClick={() => navigate(`/properties/${listingId}`)}>
      <div className='slider-container'>
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className='slides'>
              <img
                src={`http://localhost:5000/${photo?.replace('public', '')}`}
                alt={`photo ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className='prev-button' onClick={goToPrevSlide}>
          <ArrowBackIosNew sx={{ fontSize: '15px' }} />
        </div>
        <div className='next-button' onClick={goToNextSlide}>
          <ArrowForwardIos sx={{ fontSize: '15px' }} />
        </div>
      </div>

      <h3>{city}, {state}, {country}</h3>
      <p>{Array.isArray(category) ? formatArrayToString(category) : category}</p>
      {!booking ? (
        <div>
          <p>{Array.isArray(type) ? formatArrayToString(type) : type}</p>
          <p><span>₹{price}</span> per day</p>
        </div>
      ) : (
        <div>
          <p>{startDate} - {endDate}</p>
          <p><span>₹{totalPrice}</span> total</p>
        </div>
      )}

      <button className='favorite_' onClick={patchWishList} disabled={!user}>
        {isLiked ? (
          <Favorite sx={{ color: 'red' }} />
        ) : (
          <Favorite sx={{ color: 'white' }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
