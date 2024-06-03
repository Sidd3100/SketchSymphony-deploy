import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

import {
  updateStart,
  updateFailure,
  updateSuccess,
  deletUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserFailure,
  signoutUserSuccess,
  signoutUserStart
} from "../../redux/user/userSlice";
import { Link } from "react-router-dom";

function Profile(props) {
  const [userListings, setUserListings] = useState([])
  const [userListingError, setUserListingError] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});

  const [successMsg, setSuccessMsg] = useState(false);

  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePercentage, setFilePercentage] = useState(null);
  console.log(filePercentage);

  console.log(formData);

  console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
      };
  const fileRef = useRef(null);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
      setSuccessMsg(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  //delete function

    const handleDelete = async () => {
    try {
        dispatch(deletUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
};

//handle signout

const handleSignout = async () => {
    try {
        dispatch(signoutUserStart());
      const res = await fetch(`api/auth/signout`, {
        method: "GET",
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
};

const handleShowListings = async()=>{
    try{
      setUserListingError(false)
        const res = await fetch(`api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if(data.success === false){
            setUserListingError(true);
            return;
        }
        setUserListings(data);
    }catch(error)
    {
      setUserListingError(true);
    }
}

const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};
  return (
    <>
      <div className="w-full">
        <div className="text-white flex flex-col justify-between border rounded-lg max-w-[26rem] h-auto items-justify mx-auto bg-slate-100 p-4 my-8 gap-3">
          <h2 className="text-2xl uppercase text-gray-100 py-4 mx-auto">
            Welcome User
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              accept="image/*"
              hidden
            ></input>
            <div>
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="Profile"
                className="cursor-pointer mx-auto rounded-full h-14 w-14"
              ></img>
            </div>
            <p>
              {fileUploadError ? (
                <span className="text-red-700">Error Uploading Image</span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className="text-slate-700">
                  Uploading {filePercentage}%
                </span>
              ) : filePercentage === 100 ? (
                <span className="text-green-700">Uploaded !</span>
              ) : null}
            </p>
            <input
              onChange={handleChange}
              defaultValue={currentUser.username}
              type="text"
              id="username"
              placeholder="Username"
              className="text-slate-700 p-3 border rounded-lg"
            ></input>
            <input
              onChange={handleChange}
              defaultValue={currentUser.email}
              type="email"
              id="email"
              placeholder="E-mail"
              className="text-slate-700 p-3 border rounded-lg"
            ></input>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              placeholder="Password"
              className="text-slate-700 p-3 border rounded-lg"
            ></input>
            <button
              type=""
                disabled={loading}
              className="p-3 mt-3 bg-slate-700 text-gray-100 uppercase rounded-lg hover:opacity-95 opacity:65"
            >
              {loading?'Loading...':'Update user'}
            </button>
            <Link to={'/create-listing'} className="bg-green-700 text-center uppercase rounded-lg p-3">Create Listing</Link>
          </form>
          <p className="text-red-700 mt-3">{error?error:''}</p>
          <p className="text-green-600">{successMsg?'Update Successful':''}</p>
          <div className="flex justify-between">
            <span onClick={handleDelete} className="text-red-700 font-semibold cursor-pointer opacity-95 hover:opacity-65">Delete account</span>
            <span onClick={handleSignout}className="text-red-700 font-semibold cursor-pointer">Sign Out</span> 
          </div>

          {/* <p>Name:{currentUser.username} </p>
            <p>Age: </p>
            <p>Ratings: </p>
            <p>Mobile No.: </p>
            <p className='text-sm text-yellow-400'>Description: </p> */}
        </div>
        
        <div className="w-full flex justify-center">
  <button onClick={handleShowListings} className= "font-semibold text-green-700 cursor-pointer border p-3 min-w-xl rounded-full bg-slate-100 flex items-center justify-center mb-8">
    <span className="mr-2">Show listings</span>
    <i className="fa-solid fa-arrow-right text-gray-900"></i>
  </button>
</div>
        <p className="text-red-700 font-semibold">{userListingError?'Error in showing Listings':""}</p>
        {userListings && userListings.length > 0 && (
          
        <div className='flex flex-wrap w-full gap-4 my-8 py-8 justify-center'>
          
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex flex-col justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-24 object-contain'
                />
              </Link>
              <Link
                className='text-slate-200 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center gap-2'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase border p-2 rounded-lg hover:bg-red-700 hover:text-white w-full text-center'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase border p-2 rounded-lg hover:bg-green-700 hover:text-white w-full text-center'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
      )}
      </div>
    </>
  );
}

export default Profile;