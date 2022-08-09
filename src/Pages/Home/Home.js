import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';
import JobDetails from './JobDetails';
import PostList from './PostList';

const Home = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchingPost, setSearchingPost] = useState([]);

    // search title input state
    const [check, setCheck] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [titleData, setTitleData] = useState([]);
    const [focusTitle, setFocusTitle] = useState(false);
    const [titleSelect, setTitleSelect] = useState('');

    // search address input state
    const [addressValue, setAddressValue] = useState('');
    const [addressData, setAddressData] = useState([]);
    const [focusAddress, setFocusAddress] = useState(false);
    const [addressSelect, setAddressSelect] = useState('');

    // search bar
    useEffect(() => {
        axios.get('https://boiling-beach-14928.herokuapp.com/post')
            .then(res => {
                setLoading(false)
                const data = res.data;
                const titleText = titleValue?.target?.value?.toLowerCase();
                const addessText = addressValue?.target?.value?.toLowerCase();

                // title bar
                if (titleText) {
                    const inputMatch = data.filter(d => d.permission ?
                        d.jobTitle.toLowerCase().includes(titleText) ||
                        d.company.toLowerCase().includes(titleText) ||
                        d.skillTags.some(e => e.toLowerCase().includes(titleText)) ||
                        d._id.slice(0, 25).toLowerCase().includes(titleText)
                        : ''
                    );

                    if (inputMatch.length === 0) {
                        setTitleData([]);
                        setAllPost(data)
                    } else {
                        setTitleData(inputMatch);
                    }
                } else {
                    setAllPost(data);
                    setTitleData(data);
                }

                // address bar
                if (addessText) {
                    const inputMatch = data.filter(d => d.permission ?
                        d.jobLocation.toLowerCase().includes(addessText) ||
                        d.workplace.toLowerCase().includes(addessText)
                        : ''
                    );
                    if (inputMatch.length === 0) {
                        setAddressData([]);
                        setAllPost(data)
                    } else {
                        setAddressData(inputMatch);
                    }
                } else {
                    setAllPost(data);
                    setAddressData(data);
                }
            })
            .catch(err => { setLoading(false) });
    }, [allPost, titleValue, addressValue]);


    // search button
    const handleSearch = (e) => {
        e.preventDefault();
        const titleText = titleValue?.target?.value?.toLowerCase();
        const addessText = addressValue?.target?.value?.toLowerCase();

        const titleMatch = titleText && allPost.filter(d => d.permission ?
            d.jobTitle.toLowerCase().includes(titleText) ||
            d.company.toLowerCase().includes(titleText) ||
            d.skillTags.some(e => e.toLowerCase().includes(titleText)) ||
            d._id.slice(0, 25).toLowerCase().includes(titleText)
            : ''
        );
        const addressMatch = addessText && allPost.filter(d => d.permission ?
            d.jobLocation.toLowerCase().includes(addessText) ||
            d.workplace.toLowerCase().includes(addessText)
            : ''
        );
        const checkMatch = check && allPost.filter(items =>
            items.workplace.toLowerCase().includes('remote')
        );

        let data;
        if (check) {
            data = titleMatch ? titleMatch.filter(items =>
                checkMatch.indexOf(items) > -1) : checkMatch;
        } else if (addessText) {
            data = titleMatch ? titleMatch.filter(items => {
                return addressMatch.indexOf(items) > -1;
            }) : addressMatch
        } else {
            data = titleMatch;
        }

        if (data.length !== 0) {
            setSearchingPost(data);
        } else {
            setSearchingPost(titleMatch);
        }
    };


    const aPost = searchingPost.length === 0 ? allPost.filter(ap => ap.permission) : searchingPost.filter(ap => ap.permission);



    return (<>
        <PageTitle title='Home'></PageTitle>
        <Header></Header>
        <main onClick={() => {
            setFocusTitle(false);
            setFocusAddress(false)
        }}>

            {/* ----------------search box---------------- */}
            <section className='bg-slate-100'>
                <form onSubmit={handleSearch}
                    className='flex md:justify-between justify-center items-center flex-col md:flex-row gap-5 h-96 lg:w-3/5 md:w-4/5 w-11/12 mx-auto' >
                    <div className="form-control w-full relative">
                        <input
                            onChange={e => {
                                setTitleValue(e);
                                setFocusTitle(true);
                                setTitleSelect()
                            }}
                            value={titleSelect}
                            type="text"
                            placeholder="Job title, keywords, or company"
                            className="input h-11 text-base w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                        {focusTitle &&
                            <ul className='absolute z-20 top-10 left-0 w-full h-auto bg-white border border-t-0 rounded-b-md shadow-xl'>
                                {titleData.length === 0 ? <li className='p-5 text-base text-gray-500'>
                                    Result not found</li>
                                    : titleData.slice(0, 15).map(p => <li key={p._id}
                                        onClick={() => setTitleSelect(p.jobTitle)} >
                                        <div className='cursor-pointer px-5 py-2 hover:bg-slate-100 duration-300'>
                                            <h2 className='text-lg font-medium relative'>
                                                {p.jobTitle}
                                                <span className='absolute top-2 right-0 text-sm font-normal'>{p.workplace}</span>
                                            </h2>
                                            <p className='text-sm leading-none'>{p.company} -
                                                <span className='text-xs text-gray-500 ml-2'>{p.jobLocation}</span>
                                            </p>
                                        </div>
                                    </li>)
                                }</ul>
                        }
                    </div>
                    <div className="form-control w-full relative">
                        {check ?
                            <input
                                readOnly type="text"
                                placeholder='Work from home / Remote'
                                className="input h-11 text-base w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                            : <>
                                <input
                                    onChange={e => {
                                        setAddressValue(e);
                                        setFocusAddress(true);
                                        setAddressSelect()
                                    }}
                                    value={addressSelect}
                                    type="text"
                                    placeholder='City, state, or country'
                                    className="input h-11 text-base w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                                {focusAddress && <ul className='absolute z-10 top-10 left-0 w-full h-auto bg-white border border-t-0 rounded-b-md shadow-xl'>{addressData.length === 0 ? <li className='p-5 text-base text-gray-500'>
                                    Result not found
                                </li>
                                    : addressData.slice(0, 15).map(p => <li key={p._id} onClick={() => setAddressSelect(p.jobLocation)}>
                                        <div className='px-5 py-2 hover:bg-slate-100 duration-300'>
                                            <p className='text-base leading-none'>{p.jobLocation}</p>
                                        </div>
                                    </li>)
                                }

                                </ul>
                                }
                            </>}
                        <div className='md:mt-5 mt-3 absolute top-12 flex items-center'>
                            <input
                                id='checkbox'
                                onChange={() => setCheck(!check)}
                                type="checkbox"
                                className="checkbox bg-white"
                            />
                            <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Work from home / Remote</label>
                        </div>
                    </div>
                    <button
                        type='sumbit'
                        className="btn btn-primary min-h-0 h-11 px-8 text-white tracking-wider mt-10 md:mt-0">
                        Search
                    </button>
                </form>
            </section>

            <hr />

            {/* ----------------All job post---------------- */}
            {loading ? <div className='w-full mt-20 mb-96 flex items-center justify-center'>
                <Spinner></Spinner>
            </div>
                :
                <section>
                    <h1 className='text-center md:text-5xl sm:text-4xl text-3xl my-10 relative'>All Jobs
                        <span className='sm:text-base text-sm bg-accent text-white md:px-2 px-1 md:py-1 absolute top-3 ml-3 rounded-md'>{aPost.length}</span>
                    </h1>
                    <div className='md:w-4/5 sm:w-10/12 w-11/12 mx-auto flex justify-between gap-5 mb-10'>
                        <div className={`lg:block w-full ${pathname !== '/' ? 'hidden' : 'block'}`}>
                            {
                                aPost?.map(post => <PostList key={post._id} post={post}></PostList>)
                            }
                        </div>
                        <div className={`w-full lg:block ${pathname !== '/' ? 'block' : 'hidden'} relative`}>
                            <button
                                onClick={() => navigate(-1)}
                                className='btn btn-outline h-8 min-h-0 rounded-md absolute -top-16 left-0 lg:hidden'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <JobDetails open={aPost[0]}></JobDetails>
                        </div>
                    </div>
                </section>
            }
        </main>
        <Footer></Footer>
    </>);
};

export default Home;