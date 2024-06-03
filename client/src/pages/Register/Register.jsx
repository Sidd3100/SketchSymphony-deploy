import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import  OAuth  from "../../components/OAuth/OAuth.jsx";
import { useDispatch,useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";

function Register() {
      const [formData, setFormData]=useState({});
      const {loading,error} = useSelector((state)=>state.user);
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const handleChange = (e)=>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value,
        });
      };
      
      const handleSubmit = async (e)=>{
          e.preventDefault();
          try{ 

          

          dispatch(signInStart());
          const res = await fetch('api/auth/Register',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),

          });
          const data = await res.json();
          console.log(data);

          if(data.success === false){
            dispatch(signInFailure(data.message))
            return;
          }
          dispatch(signInSuccess(data));
          navigate('/Profile')

        }catch(error){
          dispatch(signInFailure(error.message));
        }
      };
    
  return (
    <>
      <div className="p-3 max-w-lg mx-auto shadow-lg rounded-lg my-16 bg-slate-200">
        <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <label class="relative">
            <input
              type="text"
              class="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit"
            />

            <span class="absolute left-0 top-2 px-1 text-lg uppercase tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-gray-200 ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
              username
            </span>
          </label> */}
           <input
            id="username"
            type="text"
            className="border-b-2 p-3 bg-gray-100 border-slate-700 rounded-lg"
            placeholder="Enter username" onChange={handleChange}
          />
          <input
            id="email"
            type="text"
            className="border-b-2 p-3 bg-gray-100 border-slate-700 rounded-lg"
            placeholder="Enter email" onChange={handleChange}
          />
          <input
            id="password"
            type="text"
            className="border-b-2 p-3 bg-gray-100 border-slate-700 rounded-lg"
            placeholder="Enter password" onChange={handleChange}
          />
          <button disabled={loading} className="text-gray-100 shadow-lg p-3 bg-indigo-700 hover:border-gray-100 border-gray-700 rounded-lg w-full items-center hover:bg-black hover:text-gray-100 my-4 uppercase">
            {loading?'Loading':'Sign Up'}
          </button>
          <OAuth/>
          
        </form>

        <div className="flex gap-2 my-3">
          <p className="text-gray-700">Have an account?</p>
          <Link to="/Login">
            <span className="text-blue-800 hover:text-orange-700 ">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-600 mt-5">{error}</p>}
      </div>
    </>
  );

}
export default Register;
