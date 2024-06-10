import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listing from "../components/Listing";
import Footer from "../components/Footer";
import "../styles/HomePage.css"; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Slide />
      <Categories />
      <Listing />
      <Footer />
    </div>
  );
};

export default HomePage;
