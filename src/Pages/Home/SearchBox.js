import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

const SearchBox = () => {
    const [check, setCheck] = useState(false);

    return (
        <section className='bg-slate-100'>
            <div className='flex md:justify-between justify-center items-center flex-col md:flex-row gap-5 h-96 lg:w-3/5 md:w-4/5 w-11/12 mx-auto' >
                <div className="form-control w-full">
                    <input type="text" placeholder="Job title, keywords, or company" className="input text-base w-full border border-gray-200 focus:outline-0 focus:shadow-md" />
                </div>
                <div className="form-control w-full relative">
                    {
                        check ? <input readOnly type="text" placeholder='Work from home / Remote' className="input text-base w-full border border-gray-200 focus:outline-0 focus:shadow-md" />
                            :
                            <input type="text" placeholder='City, state, country, or zip code' className="input text-base w-full border border-gray-200 focus:outline-0 focus:shadow-md" />
                    }
                    <div className='md:mt-5 mt-3 absolute top-12 flex items-center'>
                        <input id='checkbox' onChange={() => setCheck(!check)} type="checkbox" className="checkbox bg-white" />
                        <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Work from home / Remote</label>
                    </div>
                </div>
                <button className="btn btn-primary px-8 text-white tracking-widest mt-10 md:mt-0">Search</button>
            </div>
        </section>
    );
};

export default SearchBox;