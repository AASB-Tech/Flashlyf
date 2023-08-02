"use client";

export default function PopUpDiscardPost({ handleAnswer }) {

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p 
                        className="text-black text-base mb-4"
                    >
                        Are you sure you want to discard this post?
                    </p>
                    <div className="flex justify-between gap-2">
                    <button 
                        className="px-8 py-2 FFred text-black font-bold rounded-full"
                        onClick={() => handleAnswer(true)}
                    >
                        Yes
                    </button>
                    <button 
                        className="px-8 py-2 FFgreen text-black font-bold rounded-full"
                        onClick={() => handleAnswer(false)}
                    >
                        No
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}
