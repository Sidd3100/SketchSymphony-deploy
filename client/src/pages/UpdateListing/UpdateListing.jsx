import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    dimensions: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    imageUrls: [],
});
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: type === 'checkbox' ? checked : value,
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          email: currentUser.email,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='mx-auto max-w-4xl p-3'>
        <h1 className='text-center text-3xl font-semibold text-slate-100'>Update Listing</h1>
        <form  onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 justify-center'>
        <div className='flex flex-col gap-4 flex-1'>
        <input onChange={handleChange} value={formData.name} type="text" id= "name" placeholder ="Name" required maxLength='62' minLength = '6' className='bg-slate-100 p-3 border rounded-lg'/>
        <textarea onChange={handleChange } value={formData.description} type="text" id= "description" placeholder ="Description" required maxLength='62' minLength = '6' className='bg-slate-100 p-3 border rounded-lg'/>
        
        <div className='flex justify-between '>
        <input onChange={handleChange} value={formData.category} type="text" id= "category" placeholder ="Category" required maxLength='62' minLength = '6' className='bg-slate-100 p-3 border rounded-lg w-1/2 mr-2'/>
        <input onChange={handleChange} value={formData.dimensions} type="text" id = "dimensions" placeholder ="Dimensions" required maxLength='62' minLength = '6' className='bg-slate-100 p-3 border rounded-lg w-1/2 ml-2'/>
        </div>

        <div className='flex justify-between flex-wrap '>
            <div className='flex gap-2'>
                <input onChange={handleChange} checked={formData.offer} type="checkbox" id='offer' className='w-5' />
                <span className='text-slate-100 p-3'>Offer</span>
            </div>
            <div className='flex gap-2 items-center'>
            <input onChange={handleChange} min='1' max='100000' value={formData.regularPrice} type='number' id = 'regularPrice' required className='bg-slate-100 p-3 border rounded-lg w-1/3'/>
                <span className='text-slate-100 p-3'>Regular Price</span>
            </div>
            {formData.offer && (<div className='flex gap-2 items-center'>
            <input onChange={handleChange} min='1' max='100000' value={formData.discountedPrice} type='number' id = 'discountedPrice' required className='text-slate-700 bg-slate-100 p-3 border rounded-lg w-1/3'/>
                <span className='text-slate-100 p-3'>Discounted Price</span>
            </div>)}
            
                
                
            
        </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
            <p className='text-slate-100 font-semibold'>Images: 
            <span className='text-slate-200 font-normal'> The first image will be the cover 
            </span></p>
            <div className='flex gap-4'>
            <input
onChange={(e) => setFiles(Array.from(e.target.files))}
className="text-slate-900 p-3 border border-gray-300 rounded w-full"
type="file"
id='images'
accept='image/*'
multiple
/>
            <button disabled = {uploading} onClick={handleImageUpload} type='button' className='p-3 bg-slate-100 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading? 'Uploading...': 'Upload'}</button>
            </div>
            <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                    <div key={url} className='flex justify-between p-3 border bg-slate-200 items-center rounded-lg'>
                    <img src={url} alt='listing image' className='w-20 h-20 object-contain bg-slate-100 rounded-lg'/>
                    <button type='button' onClick = {()=>handleRemoveImage(index)} className='p-3 text-red-600 rounded-lg uppercase hover:opacity-75'>Delete</button>
                    </div>
                ))
            
            }
            <button disabled={loading||uploading} className='p-3 border rounded-lg text-gray-100 bg-slate-600 hover:opacity-95 uppercase disabled:opacity-65'>{loading?'Updating...':'Update Listings' }</button>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>

        
     </form>
    </main>
);
}
