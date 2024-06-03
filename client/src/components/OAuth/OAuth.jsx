import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo:result.user.photoURL }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/Profile')
        } catch (error) {
            console.log('Could not login with Google', error);
        }
    };

    return (
        <>
            <button onClick={handleGoogleLogin} type='button' className="text-gray-100 shadow-lg p-3 bg-red-800 hover:border-gray-100 border-gray-700 rounded-lg w-full items-center hover:bg-black hover:text-gray-100  uppercase"> Signin with Google
                </button>
        </>
    )
}

export default OAuth;