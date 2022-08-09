import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-neutral'>
            <div className='w-11/12 mx-auto text-center'>
                <p className='p-5 m-0 mt-5 text-white tracking-wider'>&copy; <small className='text-light mr-2'>Copyright {new Date().getFullYear()} </small> Enlistco - All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;