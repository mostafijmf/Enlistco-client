import React from 'react';
import AllJobs from './AllJobs';
import SearchBox from './SearchBox';

const Home = () => {
    return (
        <div>
            <SearchBox></SearchBox>
            <hr />
            <AllJobs></AllJobs>
        </div>
    );
};

export default Home;