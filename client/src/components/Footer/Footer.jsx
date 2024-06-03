import React from "react";
import { Link } from "react-router-dom";
import ContactUs from "../../pages/ContactUs/ContactUs";
// import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Footer = () => {
    // Use useTypewriter hook to generate placeholder text
    // const placeholderText = useTypewriter("Enter Your E-mail");

    const date = new Date().getFullYear();

    return (
        <div className="max-h-screen flex flex-col">
            <footer className="text-white ">
                <div className="bg-gray-900 py-4">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 p-20">
                            <div className="footer-item">
                                <div className="text-xl text-gray-200 uppercase mb-4 font-semibold">Explore</div>
                                <p className="text-md text-gray-200">
                                Our platform is your canvas, offering a vibrant marketplace for artists to showcase their masterpieces and connect with a global audience eager to discover the next stroke of brilliance.                                 </p>
                            </div>
                            <div className="footer-item">
                                <div className="text-xl text-gray-200 uppercase mb-4 font-semibold">Join us</div>
                                <ul className="text-md text-gray-200">
                                    <li className="my-2">Sign In</li>
                                    <li className="my-2">View Artists</li>
                                    <li className="my-2">Know More</li>
                                </ul>
                            </div>
                            <div className="footer-item">
                                <div className="text-xl text-gray-200 uppercase mb-4 font-semibold">Follow us</div>
                                <div className="icons flex space-x-4 my-4">
                                    <a href="https://github.com/Sidd3100" className="text-white hover:text-white transform hover:scale-150 transition-all duration-150 ease-in-out">
                                        <i class="fa-brands fa-github fa-xl"></i>
                                    </a>
                                    <a href="https://www.instagram.com/siddhartha___rai/" className="text-white hover:text-[#d62976] transform hover:scale-150 transition-all duration-150 ease-in-out">
                                        <i class="fa-brands fa-instagram fa-xl"></i>
                                    </a>
                                    <a href="#" className="text-white hover:text-[#128c7e] transform hover:scale-150 transition-all duration-150 ease-in-out">
                                        <i class="fa-brands fa-whatsapp fa-xl"></i>
                                    </a>
                                    <a href="#" className="text-white hover:text-[#0088cc] transform hover:scale-150 transition-all duration-150 ease-in-out">
                                        <i class="fa-brands fa-telegram fa-xl"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="footer-item">
                                <div className="text-xl text-gray-200 uppercase mb-4 font-semibold">Contact us</div>
                                <ul className="text-md text-gray-200">
                                    <li className="my-2"><Link to = "/ContactUs" className="hover:text-red-700 transform hover:scale-110 transition-all duration-150 ease-in-out">Email: siddraimb@gmail.com</Link></li>
                                    <li className="my-2">Phone: +91 6387566061</li>
                                </ul>
                                
                            </div>
                        </div>
                        <div className="mt-20">
                            <div className="h-full flex items-center justify-center mb-5">
                                <form action="" className="w-96 relative hover:text-indigo-300 transform hover:scale-110 transition-all duration-150 ease-in-out">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="w-full text-gray-800 p-4 h-10 rounded-full focus:outline-none focus:border border-indigo-800"
                                    />
                                    
                                    <button
                                        type="Submit"
                                        className="bg-indigo-400 px-8 py-2 rounded-full text-white absolute top-0 right-0 hover:text-gray-700"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <h6 className="text-center">&copy; Copyright to SketchSymphony {date}</h6>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
