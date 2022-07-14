import React from 'react';
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
        </>
    );
};

export default Home;