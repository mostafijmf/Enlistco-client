import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountryList from '../Shared/CountryList';
import PageTitle from '../Shared/PageTitle';

const UserInfoForm = () => {
    const navigate = useNavigate();

    const handleContact = async (event) => {
        event.preventDefault();
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const phone = event.target.phone.value;
        const country = event.target.country.value;
        const address = event.target.streetAddress.value;
        const state = event.target.state.value;
        const zip = event.target.zipCode.value;

        localStorage.setItem('userInfo', JSON.stringify({
            firstName,
            lastName,
            phone,
            country,
            address,
            state,
            zip
        }));
        navigate('/user-role');
    };

    return (<>
        <PageTitle title='Contact Information'></PageTitle>
        <div className="flex justify-center bg-slate-100 pt-2 pb-5">
            <div className='lg:w-1/2 md:w-3/5 sm:w-11/12 w-full sm:mx-auto mx-2 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mt-6 mb-10 rounded-xl border shadow-lg'>
                <h1 className='text-center sm:text-3xl text-2xl font-semibold sm:mb-8 mb-5'>Contact information</h1>
                <form onSubmit={handleContact}>
                    <div>
                        <div className='flex items-center justify-between gap-5'>
                            <div>
                                <label
                                    htmlFor='firstName'
                                    className='font-medium sm:text-lg text-base'
                                >
                                    First name<span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    id='firstName'
                                    placeholder="Enter your first name"
                                    className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='lastName'
                                    className='font-medium sm:text-lg text-base'
                                >
                                    Last name<span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    id='lastName'
                                    placeholder="Enter your last name"
                                    className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <label
                                htmlFor='phone'
                                className='font-medium sm:text-lg text-base'
                            >
                                Phone<span className='text-orange-600 ml-1'>*</span>
                            </label>
                            <input
                                required
                                id='phone'
                                type="number"
                                placeholder="Ex: +12345678900"
                                className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div className='mt-5'>
                            <label
                                htmlFor='streetAddress'
                                className='font-medium sm:text-lg text-base'
                            >
                                Street address<span className='text-orange-600 ml-1'>*</span>
                            </label>
                            <input
                                required
                                id='streetAddress'
                                type="text"
                                placeholder="Your address"
                                className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div className='mt-5'>
                            <label
                                htmlFor='state'
                                className='font-medium sm:text-lg text-base'
                            >
                                City / State<span className='text-orange-600 ml-1'>*</span>
                            </label>
                            <input
                                required
                                id='state'
                                type="text"
                                placeholder="Your city / state"
                                className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div className='flex items-center justify-between gap-5 mt-5'>
                            <div>
                                <label
                                    htmlFor='country'
                                    className='font-medium sm:text-lg text-base'
                                >
                                    Country<span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <select
                                    required
                                    id='country'
                                    className="select bg-slate-100 min-h-0 h-11 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                >
                                    <option value=''>Select country</option>
                                    <CountryList></CountryList>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor='zipCode'
                                    className='font-medium sm:text-lg text-base'
                                >
                                    Zip code<span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <input
                                    required
                                    id='zipCode'
                                    type="number"
                                    placeholder="Zip code"
                                    className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 flex justify-center'>
                        <button
                            type='submit'
                            className='sm:w-max w-full btn btn-primary px-6 normal-case sm:text-lg text-base text-white h-11 min-h-0'>
                            Save and continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
};

export default UserInfoForm;