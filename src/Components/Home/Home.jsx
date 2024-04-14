import React from "react";
import Footer from "../Footer/Footer";
import FestivalOffer from "./FestivalOffer";
import FlashSale from "./FlashSale";
import Grid from "./Grid";
import Offer from "./Offer";
import Slider from "./Slider";
import SliderComponent from "./SliderComponent";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className=" mt-[4.2rem]">
        <Slider />
      </div>
      <div className=" mt-[18rem] flex justify-center items-center">
        <Grid />
      </div>

      <div className="mt-[2rem]">
        <SliderComponent />
      </div>
      <div>
        <Offer />
      </div>
      <div>
        <FlashSale />
      </div>
      <div>
        <FestivalOffer />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
