import { CheckCircleIcon, ExclamationIcon, PhoneIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess('');
            }, 4000);
        }
    }, [success]);


    // ===================Scrolling top===================
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    // Contact button
    const handleContact = async (e) => {
        e.preventDefault();
        setLoading(true);

        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const message = e.target.message.value;

        // Send Message us
        await axios.post('https://api.enlistco.co.in/contact_us',
            { name, email, phone, message },
            {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                if (res.data) {
                    setLoading(false);
                    setSuccess('Your message has been successfully sent.')
                }
            })
            .catch(err => {
                const { message } = err.response.data;
                setError(message);
                setLoading(false);
            });
    };

    return (<>
        <PageTitle title='Contact Us'></PageTitle>
        <Header></Header>
        <div className='w-full bg-white'>
            <h1 className='text-center py-24 sm:text-5xl text-4xl bg-slate-100'>Contact us</h1>
            <hr />
            <div className='py-10 xl:w-4/5 md:w-11/12 w-[95%] mx-auto'>
                <h1 className='md:text-4xl text-3xl font-medium text-center text-primary'>Get In Touch</h1>
                <p className='text-xl font-medium text-center mt-3'>
                    Give us a call or send us an email and we will get back to you.
                </p>
                <div className='mt-10 grid md:grid-cols-3 grid-cols-1 md:w-full sm:w-4/5 w-full mx-auto gap-5'>
                    <div className='border rounded p-7'>
                        <PhoneIcon
                            className='w-14 h-14 mx-auto p-3 rounded-full bg-accent text-white'
                        />
                        <p className='text-center text-lg font-medium mt-5'>
                            Have questions? Call Us.
                        </p>
                        <p className='text-center text-base mt-3'>
                            <a href='tel:+12486771972'>
                                +1 2486771972
                            </a>
                        </p>
                    </div>
                    <div className='border rounded p-7'>
                        <svg
                            className='w-14 h-14 mx-auto p-3 rounded-full bg-accent text-white'
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className='text-center text-lg font-medium mt-5'>
                            Email Us
                        </p>
                        <p className='text-center text-base mt-3'>
                            <a href='mailto:sales@ecerasystem.com'>
                                sales@ecerasystem.com
                            </a>
                        </p>
                    </div>
                    <div className='border rounded p-7'>
                        <svg
                            className='w-14 h-14 mx-auto p-3 rounded-full bg-accent text-white'
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>

                        <p className='text-center text-lg font-medium mt-5'>
                            Address
                        </p>
                        <p className='text-center text-base mt-3'>
                            4813 Woodland Ave Royal Oak, Michigan - 48073, USA
                        </p>
                    </div>
                </div>
            </div>

            <div className='m-20 sm:w-4/5 w-[95%] md:px-8 md:py-12 px-5 py-8 mx-auto border-[3px] border-primary rounded-xl relative'>
                <div className='absolute -top-12 left-0 right-0 w-max mx-auto bg-white border-primary border-[3px] rounded-xl p-5'>
                    <h1 className='text-center md:text-4xl text-3xl font-medium'>Follow Us</h1>
                </div>
                <p className='text-lg text-center font-medium lg:mx-24 mt-5'>
                    Our Goal Is To Help Our Companies Maintain Or Achieve Best- In-Class Positions In Their Respective Industries And Our Team Works.
                </p>
                <ul className='list-none flex items-center justify-center gap-10 mt-10'>
                    <li>
                        <a
                            href="https://www.facebook.com/ecerasystem/"
                            target="blank"
                        >
                            <i className="fa-brands fa-facebook text-5xl text-blue-600"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/company/ecera/"
                            target="blank"
                        >
                            <i className="fa-brands fa-linkedin-in text-5xl text-[#0A66C2]"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/ecerasystem/"
                            target="blank"
                        >
                            <i className="fa-brands fa-instagram text-5xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div className='pt-8 pb-14 lg:w-4/5 md:w-3/5 sm:w-4/5 w-[95%] mx-auto grid lg:grid-cols-2 grid-cols-1 gap-y-10'>
                <div>
                    <h2 className='text-2xl text-primary font-medium'>Email Addresses</h2>
                    <ul className='list-none'>
                        <li className='text-base font-semibold mt-5'>
                            General Inquires -
                            <a
                                className='font-normal ml-2 text-primary'
                                href="mailto:info@ecerasystem.com">
                                info@ecerasystem.com
                            </a>
                        </li>
                        <li className='text-base font-semibold mt-5'>
                            Jobs -
                            <a
                                className='font-normal ml-2 text-primary'
                                href="mailto:careers@ecerasystem.com">
                                careers@ecerasystem.com
                            </a>
                        </li>
                        <li className='text-base font-semibold mt-5'>
                            Sales and Services -
                            <a
                                className='font-normal ml-2 text-primary'
                                href="mailto:sales@ecerasystem.com">
                                sales@ecerasystem.com
                            </a>
                        </li>
                        <li className='text-base font-semibold mt-5'>
                            Potential Investors -
                            <a
                                className='font-normal ml-2 text-primary'
                                href="mailto:sales@ecerasystem.com">
                                sales@ecerasystem.com
                            </a>
                        </li>
                        <li className='text-base font-semibold mt-5'>
                            Alumni -
                            <a
                                className='font-normal ml-2 text-primary'
                                href="mailto:info@ecerasystem.com">
                                info@ecerasystem.com
                            </a>
                        </li>
                        <li className='text-base font-semibold mt-5'>
                            Partners & Alliances -
                            <a
                                className='font-normal ml-2 text-primary'
                                href="mailto:sales@ecerasystem.com">
                                sales@ecerasystem.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-2xl text-primary font-medium'>Write Us</h2>
                    <p className='text-base mt-2'>
                        Any question? Reach out to us and we’ll get back to you shortly.
                    </p>
                    <form onSubmit={handleContact} className='mt-5'>
                        <label
                            htmlFor='name'
                            className='font-medium text-base'
                        >
                            Your name<span className='text-orange-600 ml-1'>*</span>
                            <input
                                id='name'
                                type="text" required
                                placeholder=""
                                className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </label>
                        <label
                            htmlFor='email'
                            className='font-medium text-base block mt-3'
                        >
                            Email address<span className='text-orange-600 ml-1'>*</span>
                            <input
                                id='email'
                                type="email" required
                                placeholder=""
                                className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </label>
                        <label
                            htmlFor='phone'
                            className='font-medium text-base block mt-3'
                        >
                            Phone number<span className='text-orange-600 ml-1'>*</span>
                            <input
                                id='phone'
                                type="number" required
                                placeholder=""
                                className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </label>
                        <label
                            htmlFor='message'
                            className='font-medium text-base block mt-3'
                        >
                            Your Message<span className='text-orange-600 ml-1'>*</span>
                            <textarea
                                id='message'
                                rows="5" required
                                className='w-full mt-2 py-2 px-4 font-normal border border-gray-200 bg-slate-100 focus:outline-0 focus:shadow-md rounded-md'
                            ></textarea>
                        </label>
                        {
                            error && <p className='text-base text-red-600 mt-2'>
                                <ExclamationIcon className='w-5 h-5 inline-block mr-2' />
                                {error}
                            </p>
                        }
                        <div className='mt-5'>
                            <button
                                disabled={loading}
                                type="submit"
                                className='btn btn-primary sm:w-max w-full px-8 min-h-0 h-11 normal-case text-white text-lg'
                            >
                                {
                                    loading ? <Spinner className={'px-9'} /> : 'Send message'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div
            className={`fixed top-16 sm:right-8 right-5 z-30 bg-neutral px-5 py-4 rounded-lg duration-300 
                ${success ? 'translate-x-0' : 'translate-x-96'}
                `}
        >
            <div className='flex items-center'>
                <CheckCircleIcon className='w-6 h-6 text-success mr-2' />
                <p className='text-sm text-white'>{success}</p>
            </div>
        </div>
        <Footer></Footer>
    </>);
};

export default ContactUs;