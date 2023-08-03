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
                    <div className="flex justify-center">
                    <button 
                        className="px-8 mr-12 py-2 bg-FFblue text-white font-bold rounded-full"
                        onClick={() => handleAnswer(true)}
                    >
                        Yes
                    </button>
                    <button 
                        className="px-8 py-2 bg-inactivegrey text-white font-bold rounded-full"
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
