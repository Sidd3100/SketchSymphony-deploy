import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Artists() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/user/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div className="w-full h-auto flex flex-col justify-center items-center text-gray-100 font-bold text-2xl mt-10">
                View All Artists
                <div className="w-36 h-1 border-b-4 border-white mt-2 rounded-full"></div>
            </div>
            <div className='w-full flex justify-evenly my-20 flex-wrap'>
                {users.map((user) => (
                    <div key={user._id} className="w-64 overflow-hidden flex flex-col justify-center items-center border-gray-50 border-2 rounded-xl hover:shadow-3xl m-3">
                        <img src={user.avatar} alt={user.username} className="h-64 w-64"/>
                        <p className="text-gray-100 text-sm uppercase m-4">{user.username}</p>
                        <p className="text-gray-100 text-sm uppercase m-4">{user.email}</p>
                        <Link to={`/artistDetails/${user.username}`} className="text-blue-500 hover:text-blue-800">View Artwork</Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Artists;