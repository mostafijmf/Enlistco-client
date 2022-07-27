import React from 'react';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';
import AllJobs from './AllJobs';
import SearchBox from './SearchBox';

const Home = () => {
    return (
        <>
            <Header></Header>
            <div>
                <SearchBox></SearchBox>
                <hr />
                <AllJobs></AllJobs>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Home;