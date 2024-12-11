import React from 'react';
import { IoIosSend } from 'react-icons/io';
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {
    return (
        <div className="container mx-auto px-4 md:px-20 lg:px-44">
            <img
                src="/placeholder.jpg"
                className="w-full object-cover rounded-xl aspect-[16/9]"
                alt="Trip Cover"
            />
            <div className="flex justify-between items-center mt-5">
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location?.label || 'Unknown Location'}
                    </h2>
                    <div className="flex gap-5 flex-wrap">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip?.userSelection?.noOfDays || 'N/A'} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💰 {trip?.userSelection?.budget || 'N/A'} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🥂 No. Of Travelers: {trip?.userSelection?.traveller || 'N/A'}
                        </h2>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button>
                        <IoIosSend />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
