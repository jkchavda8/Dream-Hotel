import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from 'react-icons/io';
import { BiTrash } from 'react-icons/bi';
import "../styles/CreateListing.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CreateListing = () => {
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [typesSelected, setTypesSelected] = useState([]);
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: ""
  });
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [resource, setResource] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0
  });

  const handleCategorySelect = (category) => {
    setCategoriesSelected((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  const handleTypeSelect = (type) => {
    setTypesSelected((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((item) => item !== type)
        : [...prevTypes, type]
    );
  };

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value
    });
  };

  const handleSelectResource = (facility) => {
    setResource((prevResource) =>
      prevResource.includes(facility)
        ? prevResource.filter((option) => option !== facility)
        : [...prevResource, facility]
    );
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value
    });
  };

  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", JSON.stringify(categoriesSelected));
      listingForm.append("type", JSON.stringify(typesSelected));
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("state", formLocation.state);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("resource", JSON.stringify(resource));
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      const response = await fetch("http://localhost:5000/properties/create", {
        method: "POST",
        body: listingForm
      });

      if (response.ok) {
        console.log("Listing created successfully!");
        navigate("/");
      } else {
        console.error("Failed to create listing:", await response.text());
      }
    } catch (err) {
      console.error("Error in handlePost:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='create-listing'>
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className='create-listing-step1'>
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${categoriesSelected.includes(item.label) ? "selected" : ""}`}
                  key={index}
                  onClick={() => handleCategorySelect(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${typesSelected.includes(item.name) ? "selected" : ""}`}
                  key={index}
                  onClick={() => handleTypeSelect(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className='full'>
              <div className='location'>
                <p>Street Address</p>
                <input type="text" placeholder='Street Address' name='streetAddress' value={formLocation.streetAddress} onChange={handleChangeLocation} required />
              </div>
            </div>

            <div className='half'>
              <div className='location'>
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input type="text" placeholder='Apartment, Suite, etc. (if applicable)' name='aptSuite' value={formLocation.aptSuite} onChange={handleChangeLocation} />
              </div>
              <div className="location">
                <p>City</p>
                <input type="text" placeholder="City" name="city" value={formLocation.city} onChange={handleChangeLocation} required />
              </div>
            </div>

            <div className='half'>
              <div className='location'>
                <p>State</p>
                <input type="text" placeholder='State' name='state' value={formLocation.state} onChange={handleChangeLocation} required />
              </div>
              <div className="location">
                <p>Country</p>
                <input type="text" placeholder="Country" name="country" value={formLocation.country} onChange={handleChangeLocation} required />
              </div>
            </div>

            <h3>Share some basics about place</h3>
            <div className='basics'>
              <div className='basic'>
                <p>Guests</p>
                <div className='basicCount'>
                  <RemoveCircleOutline onClick={() => { guestCount > 1 && setGuestCount(guestCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                  <p>{guestCount}</p>
                  <AddCircleOutline onClick={() => { setGuestCount(guestCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                </div>
              </div>
              <div className='basic'>
                <p>Bedrooms</p>
                <div className='basicCount'>
                  <RemoveCircleOutline onClick={() => { bedroomCount > 1 && setBedroomCount(bedroomCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline onClick={() => { setBedroomCount(bedroomCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                </div>
              </div>
              <div className='basic'>
                <p>Beds</p>
                <div className='basicCount'>
                  <RemoveCircleOutline onClick={() => { bedCount > 1 && setBedCount(bedCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                  <p>{bedCount}</p>
                  <AddCircleOutline onClick={() => { setBedCount(bedCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                </div>
              </div>
              <div className='basic'>
                <p>Bathrooms</p>
                <div className='basicCount'>
                  <RemoveCircleOutline onClick={() => { bathroomCount > 1 && setBathroomCount(bathroomCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline onClick={() => { setBathroomCount(bathroomCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred }, }} />
                </div>
              </div>
            </div>
          </div>

          <div className='create-listing-step2'>
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className='resource'>
              {facilities?.map((item, index) => (
                <div className={`facility ${resource.includes(item.name) ? "selected" : ""}`} key={index} onClick={() => handleSelectResource(item.name)}>
                  <div className='facility_icon'>{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId='photos_' direction='horizontal'>
                {(provided) => (
                  <div className='photos_' {...provided.droppableProps} ref={provided.innerRef}>
                    {photos.length < 1 && (
                      <div>
                        <input id='image' type="file" style={{ display: 'none' }} accept='image/*' onChange={handleUploadPhotos} multiple />
                        <label htmlFor="image" className='alone'>
                          <div className='icon'>
                            <IoIosImages />
                            <p>Upload from your device</p>
                          </div>
                        </label>
                      </div>
                    )}
                    {photos.length >= 1 && (
                      <div>
                        {photos.map((photo_, index) => (
                          <Draggable key={index} draggableId={index.toString()} index={index}>
                            {(provided) => (
                              <div className="photo_" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <img src={URL.createObjectURL(photo_)} alt="place" />
                                <button type="button" onClick={() => handleRemovePhoto(index)}>
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input id="image" type="file" style={{ display: "none" }} accept="image/*" onChange={handleUploadPhotos} multiple />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <h3>What makes your place attractive and exciting?</h3>
          <div className='description'>
            <p>Title</p>
            <input type="text" placeholder='Title' name='title' value={formDescription.title} onChange={handleChangeDescription} required />
            <p>Description</p>
            <textarea type="text" placeholder='Description' name='description' value={formDescription.description} onChange={handleChangeDescription} required />
            <p>Highlight</p>
            <input type="text" placeholder='Highlight' name='highlight' value={formDescription.highlight} onChange={handleChangeDescription} required />
            <p>Highlight details</p>
            <textarea type="text" placeholder='Highlight details' name='highlightDesc' value={formDescription.highlightDesc} onChange={handleChangeDescription} required />
            <p>Now: set your Price</p>
            <span>₹</span>
            <input type="number" placeholder='500' name='price' value={formDescription.price} className='price' onChange={handleChangeDescription} required />
          </div>

          <button className='submit_btn' type='submit'>Create your Listing</button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
