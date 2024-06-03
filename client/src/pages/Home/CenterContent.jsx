import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CenterContent = () => {
  const {currentUser} = useSelector((state)=>state.user);
    return (
      <>
        <header className="flex flex-col justify-center bg-indigo-300 w-full dark:bg-sky-900">
          <div className="flex flex-wrap justify-center items-center">
            <div className="p-20 text-2xl font-ubuntu font-semibold text-gray-200 md:w-1/2">
            Welcome to SketchSymphony: Where artists shine and creativity thrives in a vibrant global marketplace. Join us in harmonizing the art community, where every stroke, sketch, and sculpture tells a unique story.
            </div>
            <div className="w-full md:w-1/2 pb-8">
              <img
                src="./src/assets/image3.jpg"
                className="max-h-64 max-w-64 mx-auto lg:mr-20 mt-10"
                alt=""
              />
            </div>
          </div>
  
          <div className="w-full flex flex-col justify-center items-center text-center">
            <div className="w-full h-auto flex flex-col justify-center items-center text-gray-100 font-bold text-2xl ">
              Sell Your ArtWorks
              <div className="w-36 h-1 border-b-4 border-white mt-2 rounded-full"></div>
            </div>
            <div className="w-full flex justify-evenly mt-20 flex-wrap">
              <div className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl transform hover:scale-110 transition-all duration-150 ease-in-out">
                <img src="./src/assets/image4.jpg" className="h-64 w-64" alt="" />
                <div className="text-white font-semibold text-xl text-center uppercase mt-4">Easy to Sell</div>
                <p className="text-gray-100 text-sm uppercase m-4">Sign Up and Upload your Artwork in few clicks</p>
              </div>
              <div className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl transform hover:scale-110 transition-all duration-150 ease-in-out">
                <img src="./src/assets/image1.jpg" className="h-64 w-64" alt="" />
                <div className="text-white font-semibold text-xl text-center uppercase mt-4">Support</div>
                <p className="text-gray-100 text-sm uppercase m-4">Easy to join the community of Sketchers</p>
              </div>
              <div className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl transform hover:scale-110 transition-all duration-150 ease-in-out">
                <img src="./src/assets/image2.jpg" className="h-64 w-64" alt="" />
                <div className="text-white font-semibold text-xl text-center uppercase mt-4">Feedback</div>
                <p className="text-gray-100 text-sm uppercase m-4">Get genuine feedback from CUstomers</p>
              </div>
              
            </div>
            <Link to = "/Profile" className="mt-8 flex gap-2 items-center border bg-slate-200 border-gray-400 px-6 py-2  rounded-lg hover:border-gray-600  ">
          {currentUser?( <div><i class="fa-solid fa-palette"></i>
          <span>My Listings</span>
          <i className="fa-solid fa-arrow-right"></i></div>) :( 
          <div><i class="fa-solid fa-palette"></i>
          <span>Sign Up</span>
          <i className="fa-solid fa-arrow-right"></i></div>)}
        </Link>
            
            
          </div>

          <div className="w-full flex flex-col justify-center items-center text-center my-10">

            <div className="w-full h-auto flex flex-col justify-center items-center text-gray-100 font-bold text-2xl mt-10">
              Hire Artists
              <div className="w-36 h-1 border-b-4 border-white mt-2 rounded-full"></div>
            </div>
            <div className="w-full flex justify-evenly mt-20 flex-wrap">
              <div className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl transform hover:scale-110 transition-all duration-150 ease-in-out">
                <img src="./src/assets/32580.jpg" className="h-64 w-64" alt="" />
                <div className="text-white font-semibold text-xl text-center uppercase mt-4">Genuine Artists</div>
                <p className="text-gray-100 text-sm uppercase m-4">View profile of Artists according to your needs</p>
              </div>
              <div className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl transform hover:scale-110 transition-all duration-150 ease-in-out">
                <img src="./src/assets/6658698.jpg" className="h-64 w-64" alt="" />
                <div className="text-white font-semibold text-xl text-center uppercase mt-4">Better Prices</div>
                <p className="text-gray-100 text-sm uppercase m-4">Thousands of Artists, ready to give better prices</p>
              </div>
              <div className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl transform hover:scale-110 transition-all duration-150 ease-in-out">
                <img src="./src/assets/6655697.jpg" className="h-64 w-64" alt="" />
                <div className="text-white font-semibold text-xl text-center uppercase mt-4">Easy to Connect</div>
                <p className="text-gray-100 text-sm uppercase m-4">Easily connect with your desired Artists</p>
              </div>
            </div> 
            
            <Link to = "/Artists" className=" p-3 border uppercase rounded-md text-gray-100 bg-green-700 mt-6">View All</Link>
            
          </div>
        </header>
      </>
    );
  };
  
  export default CenterContent;
  
  