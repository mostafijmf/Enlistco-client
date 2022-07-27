import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-secondary'>
            <div className='w-11/12 mx-auto text-center'>
                <p className='p-5 m-0 mt-5 text-white tracking-wider'><small className='text-light mr-2'>&copy; Copyright {new Date().getFullYear()} </small> Job Portal</p>
            </div>
        </footer>
    );
};

export default Footer;