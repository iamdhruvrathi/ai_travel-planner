import React from 'react'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((item, index) => (
                    <div>
                        <img src="/placeholder.jpg" className='rounded-xl'></img>
                        <div className='my-3'>
                            <h2>{trip?.hotelOptions?.hotelName}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hotels