import React, { useEffect } from 'react';
import './about.css';
import Header from '../Shared/Header/Header';
import award from '../../images/icons/award.png';
import technical_support from '../../images/icons/technical-support.png';
import about from '../../images/banner/about.png'
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';

const About = () => {

    // ===================Scrolling top===================
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (<>
        <PageTitle title='About Us'></PageTitle>
        <Header></Header>
        <div className='w-full bg-white'>
            <h1 className='text-center py-24 sm:text-5xl text-4xl bg-slate-100'>About us</h1>
            <hr />
            <div className='xl:w-4/5 w-11/12 mx-auto flex md:flex-row flex-col items-center justify-center lg:gap-x-14 md:gap-x-10 gap-y-20 my-14'>
                <div className='md:w-1/2 w-full'>
                    <img src={about} alt="about icon" className='max-w-full max-h-full' />
                </div>
                <div className='md:w-1/2 w-full'>
                    <h2 className='text-lg font-medium text-primary mb-5'>
                        ABOUT ECERA SYSTEM PVT. LTD
                    </h2>
                    <h1 className='sm:text-4xl text-3xl font-medium'>
                        You Can not Use Up Creativity.
                    </h1>
                    <p className='my-5 text-base'>
                        Does any industry face a more complex audience journey and marketing sales process than B2B technology? Consider the number of people who influence a sale, the length of the decision-making cycle, the competing interests of the people who purchase, implement, manage, and use the technology. It’s a lot meaningful content here.
                    </p>
                    <div className='flex items-start gap-5 my-10'>
                        <div>
                            <img
                                className='w-12 h-12'
                                src={award}
                                alt="award icon"
                            />
                        </div>
                        <div>
                            <h5 className='text-lg font-medium'>Experience</h5>
                            <p className='text-base '>
                                Our great team of more than 1400 software experts.
                            </p>
                        </div>
                    </div>
                    <div className='flex items-start gap-5 my-10'>
                        <div>
                            <img
                                className='w-12 h-12'
                                src={technical_support}
                                alt="technical support icon"
                            />
                        </div>
                        <div>
                            <h5 className='text-lg font-medium'>Quick Support</h5>
                            <p className='text-base '>
                                We’ll help you test bold new ideas while sharing your.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-max w-full py-14 mb-20 about_banner flex justify-center" >
                <div className='z-10 xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12'>
                    <h2 className='text-lg font-medium text-center text-gray-50'>ABOUT ECERASYSTEM</h2>
                    <h1 className='sm:text-4xl text-3xl font-medium text-center my-5 text-gray-50'>
                        We offer innovative technology solutions.
                    </h1>
                    <p className='mt-6 text-base text-gray-100'>
                        EceraSystem is a full-service digital marketing agency with a long history of delivering great results for our clients. We take an individualized approach to every customer project. In some cases we may focus more on SEO, while in others we’ll dig more into PPC, social media or conversion optimization.
                    </p>
                    <div className='mt-16'>
                        <div className='flex items-center justify-between font-medium text-gray-50'>
                            <h5>UI/UX Design</h5>
                            <h5>93%</h5>
                        </div>
                        <div
                            className='h-1 w-full bg-white mt-2 relative after:absolute after:top-0 after:left-0 after:w-[93%] after:h-full after:bg-orange-500'
                        >
                            <div className='absolute left-[93%] -top-0.5 w-2 h-2 bg-orange-500 border border-white' />
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center justify-between font-medium text-gray-50'>
                            <h5>App Development</h5>
                            <h5>80%</h5>
                        </div>
                        <div
                            className='h-1 w-full bg-white mt-2 relative after:absolute after:top-0 after:left-0 after:w-[80%] after:h-full after:bg-orange-500'
                        >
                            <div className='absolute left-[80%] -top-0.5 w-2 h-2 bg-orange-500 border border-white' />
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center justify-between font-medium text-gray-50'>
                            <h5>Web Development</h5>
                            <h5>73%</h5>
                        </div>
                        <div
                            className='h-1 w-full bg-white mt-2 relative after:absolute after:top-0 after:left-0 after:w-[73%] after:h-full after:bg-orange-500'
                        >
                            <div className='absolute left-[73%] -top-0.5 w-2 h-2 bg-orange-500 border border-white' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>);
};

export default About;