import React from "react";
import Cards from "./Cards";
import Carousel from "./Carousel";


export default function Home() {

  return (
	<>
  <div className="bg-gray-100">
    <Carousel/>
    <div className="max-w-[1600px] mx-auto">
      <Cards/>
    </div>
  </div>
  </>
  )
};

