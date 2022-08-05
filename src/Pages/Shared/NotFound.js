import React from 'react';
import Footer from './Footer';
import Header from './Header';
import PageTitle from './PageTitle';

const NotFound = () => {
    return (<>
        <PageTitle title='404 Error'></PageTitle>
        <Header></Header>
        <section className='flex justify-center h-screen'>
            <div className='text-center mt-20'>
                <span className='flex justify-center text-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-40 sm:w-40 w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <h2 className='md:text-7xl sm:text-6xl text-5xl text-gray-400'>404</h2>
                <h1 className='md:text-4xl sm:text-3xl text-2xl text-gray-400'>Result not found...</h1>
            </div>
        </section>
        <Footer></Footer>
    </>);
};

export default NotFound;