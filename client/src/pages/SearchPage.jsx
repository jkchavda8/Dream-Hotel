import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/state';
import Loader from '../components/Loader';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const SearchPage = () => {
    const [ loading, setLoading] = useState(true);
    const { search } = useParams();
    const listings = useSelector((state) => state.listings);
    const dispatch = useDispatch();
    const getSearchListings = async () => {
        try{
            const response = await fetch(`http://localhost:5000/properties/search/${search}`,{
                method: "GET"
            });
            const data = await response.json();
            dispatch(setListings({ listings: data}));
            setLoading(false);
        }catch(err){
            console.log("Fetch search list falied",err.message);
        }
    }

    useEffect(() => {
        getSearchListings()
    },[search]);
  return loading ? <Loader /> : (
    <div className='page-container'>
        <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings?.map(
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
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage