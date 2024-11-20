import React from 'react';

function Hotels({ trip }) {
    return (
        <div className='p-4'>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + hotel?.hotelAddress}>
                        <div className='hover:scale-105 transition-all cursor-pointer'>
                            <img src={hotel?.imageURL || "/placeholder.jpg"} alt="Hotel" className='rounded-xl w-full h-40 object-cover' />
                            <div className='my-2 flex flex-col gap-1'>
                                <h2 className='font-bold text-lg'>{hotel?.hotelName}</h2>
                                <h2 className='text-sm text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                                <h2 className='text-sm '>💰 {hotel?.price}</h2>
                                <h2 className='text-sm '>⭐ {hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
