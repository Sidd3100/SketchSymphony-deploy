import React from 'react'
import { useRef, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import emailjs from '@emailjs/browser'



function ContactUs(props) {

    const form = useRef();

    const [formData, setFormData]=useState({});
    const {loading,error} = useSelector((state)=>state.user);

    const handleChange = (e)=>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value,
        });
      };

      const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_oqzs6sk', 'template_d7tpr06', form.current, {
            publicKey: 'syUlovC3drHfT3CmA',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
          e.target.reset();
      };
    

    return (
        <>
        <div className="p-3 max-w-lg mx-auto shadow-lg rounded-lg my-16 bg-slate-200">
          <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">Contact Us</h1>
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
           
             <input
              name="username"
              type="text"
              className="border-b-2 p-3 bg-gray-100 border-slate-700 rounded-lg"
              placeholder="Enter username" onChange={handleChange}
            />
            <input
              name="email"
              type="text"
              className="border-b-2 p-3 bg-gray-100 border-slate-700 rounded-lg"
              placeholder="Enter email" onChange={handleChange}
            />
            <textarea onChange={handleChange } value={formData.description} type="text" name= "message" placeholder ="Enter Your Message" required maxLength='250' minLength = '6' className='bg-slate-100 p-3 border rounded-lg h-44'/>

            <button disabled={loading} className="text-gray-100 shadow-lg p-3 bg-indigo-700 hover:border-gray-100 border-gray-700 rounded-lg w-full items-center hover:bg-black hover:text-gray-100 my-4 uppercase">
              {loading?'Sending':'Send Message'}
            </button>
           
            
          </form>

        </div>
      </>
    )
}

export default ContactUs;