import React from "react";
import Cards from "./Cards";
import Carousel from "./Carousel";
import Filters from "./Filters";

export default function Home() {

  return (
	<>
  <div className="bg-gray-100">
    <Carousel/>
    <div className="max-w-[1450px] mx-auto pt-[50px] w-full ">
      <div className="flex flex-row ">
        <Filters/>
        <Cards/>
      </div>
    </div>
  </div>
  </>
  )
};



