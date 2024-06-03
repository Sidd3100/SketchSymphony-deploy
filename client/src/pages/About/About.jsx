import React from "react";
import image4 from "../../assets/image4.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-us text-slate-200 text-center flex flex-col gap-8 p-8">
        <div className="font-semibold item-center w-full uppercase text-4xl">About Us</div>
        <div className="md:flex justify-center">
        
        <div className="w-full md:w-1/2"> <img src={image4} alt="about" className=" image-cover"/> </div>
        <div className="flex flex-col gap-2 justify-around w-full md:w-1/2">
        <div className=" text-justify  p-8">
          At SketchSymphony, we believe in the power of art to inspire, connect,
          and transform. Our platform provides a dynamic space for artists to
          showcase their talents and for art enthusiasts to discover and collect
          unique creations from around the world. Founded on the principle of
          fostering creativity and community, SketchSymphony is dedicated to
          empowering artists to share their passion while offering a seamless
          experience for buyers to explore and purchase remarkable artwork. Join
          us as we celebrate the diversity and beauty of artistic expression,
          uniting creators and collectors in a symphony of creativity.
        </div>
        <Link to = "/Register" className = "p-3 border text-gray-100 bg-green-700 uppercase mx-8 rounded-md">Join Us</Link>
        </div>
        
      </div>
      
    </div>
  );
}

export default About;
