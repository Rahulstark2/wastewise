import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

function Scheduling() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchData = () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        fetch('https://backend-zeta-ashen.vercel.app/api/v1/schedule/info', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const SkeletonLoader = () => (
        <div className="w-full px-4 py-6 mx-auto max-w-screen-xl">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-6 animate-pulse"></div>
            <div className="overflow-hidden rounded-lg shadow-md w-full">
                <div className="bg-gray-700 p-3 hidden md:flex">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-1/5 h-6 bg-gray-600 rounded animate-pulse"></div>
                    ))}
                </div>
                {[...Array(5)].map((_, rowIndex) => (
                    <div key={rowIndex} className="border-b border-opacity-100 border-gray-700 bg-gray-900 flex flex-col md:flex-row p-3 space-y-2 md:space-y-0">
                        {[...Array(5)].map((_, colIndex) => (
                            <div key={colIndex} className="md:w-1/5 h-6 bg-gray-800 rounded animate-pulse"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="w-full px-4 py-6 mx-auto max-w-screen-xl">
            {data ? (
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-center md:text-left">
                        Hey {data.firstName}! 👋
                    </h1>
                    {data.schedules && data.schedules.length > 0 ? (
                        <div className="text-white">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mb-4 text-center md:text-left">
                                Your schedules:
                            </h2>
                            <div className="overflow-hidden rounded-lg shadow-md w-full">
                                <div className="bg-gray-700 p-2 md:p-3 hidden md:flex">
                                    <div className="w-1/5 font-semibold">License</div>
                                    <div className="w-1/5 font-semibold">Driver</div>
                                    <div className="w-1/5 font-semibold">Pickup Date</div>
                                    <div className="w-1/5 font-semibold text-center">Status</div>
                                    <div className="w-1/5 font-semibold text-center">Action</div>
                                </div>
                                {data.schedules.map(schedule => {
                                    const scheduleDate = new Date(schedule.selectedDate);
                                    const today = new Date();
                                    scheduleDate.setHours(0, 0, 0, 0);
                                    today.setHours(0, 0, 0, 0);
                                    let status = scheduleDate >= today ? 'Scheduled' : 'Completed';

                                    return (
                                        <div key={schedule._id} className="border-b border-opacity-100 border-gray-700 bg-gray-900 flex flex-col md:flex-row p-2 md:p-3 space-y-2 md:space-y-0">
                                            <div className="md:w-1/5">
                                                <span className="md:hidden font-semibold">License: </span>
                                                {schedule.selectedTruck.license}
                                            </div>
                                            <div className="md:w-1/5">
                                                <span className="md:hidden font-semibold">Driver: </span>
                                                {schedule.selectedTruck.driver}
                                            </div>
                                            <div className="md:w-1/5">
                                                <span className="md:hidden font-semibold">Pickup Date: </span>
                                                {scheduleDate.toLocaleDateString()}
                                            </div>
                                            <div className="md:w-1/5 md:text-center">
                                                <span className=" md:hidden font-semibold">Status: </span>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-md ${status === 'Scheduled' ? 'bg-violet-600' : 'bg-green-600'} text-gray-50`}>
                                                    {status}
                                                </span>
                                            </div>
                                            <div className="md:w-1/5 md:text-center">
                                            <span className="md:hidden font-semibold">Action: </span>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                                    onClick={() => {
                                                        const token = localStorage.getItem('token');
                                                        fetch('https://backend-zeta-ashen.vercel.app/api/v1/schedule/remove', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Authorization': `Bearer ${token}`,
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({ scheduleId: schedule._id })
                                                        })
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            toast({
                                                                title: 'Schedule removed',
                                                                description: 'Removed successfully.',
                                                                status: 'success',
                                                                duration: 2000,
                                                                isClosable: true,
                                                            });
                                                            fetchData();
                                                        })
                                                        .catch(error => console.error('Error:', error));
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mt-6 text-center md:text-left">
                            You have not requested any Waste pickup. Please schedule a pickup.
                        </h2>
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl">No data available</p>
                </div>
            )}
        </div>
    );
}

export default Scheduling;