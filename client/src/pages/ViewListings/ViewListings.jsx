import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewListings() {
    const [listings, setListings] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listingsResponse = await fetch(`/api/listing/listings/${username}`);
                const listingsData = await listingsResponse.json();
                console.log(listingsData);
                setListings(listingsData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [username]);

    return (
        <div>
        {Array.isArray(listings) && listings.map((listing) => (
            <div key={listing._id} className='text-gray-100'>
                {listing.name}
            </div>
        ))}
    </div>
    );
}
export default ViewListings;