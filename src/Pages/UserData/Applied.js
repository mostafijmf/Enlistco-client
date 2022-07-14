import React from 'react';

const Applied = () => {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-4/5 mx-auto'>
                <h1 className='text-2xl mt-5 mb-3'>My applied jobs</h1>
                <div className="card w-full border">
                    <div className="card-body items-center">
                        <h2 className="card-title">Cookies!</h2>
                        <p>We are using cookies for no reason.</p>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-ghost">View</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applied;