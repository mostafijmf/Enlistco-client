import { PencilIcon, XIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';

const JobAppSettingForm = ({ setOpenSettingForm, appOptions }) => {
    const [applyTypeState, setApplyTypeState] = useState('');
    const [openTagInput, setOpenTagInput] = useState(false);
    const redirectLinkRef = useRef();
    const skillRef = useRef();

    useEffect(() => {
        if (appOptions.applyType !== 'easyApply') {
            setApplyTypeState('redirectSite')
        }
    }, []);


    // ==================Add skill==================
    const [skillTagsState, setSkillTagsState] = useState([]);
    const addSkillTags = () => {
        if (skillRef.current.value) {
            setSkillTagsState([...skillTagsState, skillRef.current.value])
        }
    };
    const removeSkillTags = indexToRemove => {
        setSkillTagsState(skillTagsState.filter((_, index) => index !== indexToRemove))
    };


    // ==================Update button==================
    const handleSubmit = (e) => {
        e.preventDefault();
        const applicationTypes = e.target.applicationTypes.value;
        const applyType = applicationTypes === 'easyApply' ? 'easyApply' : redirectLinkRef.current.value;
        const receiveEmail = e.target.email.value;
        const skillTags = openTagInput ? skillTagsState : appOptions.skillTags;

        localStorage.setItem('appOptions', JSON.stringify({
            receiveEmail: receiveEmail,
            salary: appOptions.salary,
            skillTags: skillTags,
            email: appOptions.email,
            applyType: applyType,
            bgCheck: appOptions.bgCheck,
            certification: appOptions.certification,
            drivingLicense: appOptions.drivingLicense,
            drugTest: appOptions.drugTest,
            education: appOptions.education,
            gpa: appOptions.gpa,
            hybridWork: appOptions.hybridWork,
            remoteWork: appOptions.remoteWork,
            workExperience: appOptions.workExperience,
            urgentHiring: appOptions.urgentHiring,
            customQuestion: appOptions.customQuestion,
        }));
        setOpenSettingForm(false);
    };

    return (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center sm:items-center items-start bg-black/50 z-30 overflow-y-auto scrollBar-sm'>
            <form
                onSubmit={handleSubmit}
                className='2xl:w-[900px] xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full mx-2 sm:my-0 my-10 bg-white sm:p-8 p-5 rounded-md relative'
            >
                <div
                    onClick={() => setOpenSettingForm(false)}
                    className='absolute top-5 sm:right-5 right-4 w-max p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'
                >
                    <XIcon className='w-7 h-7'></XIcon>
                </div>
                <h1 className='text-2xl font-medium text-center'>Update Application settings</h1>
                <ul className='list-none mt-5'>
                    <li className='mt-2'>
                        <h2 className='text-lg font-medium'>
                            Application Types<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </h2>
                        <label htmlFor="easyApply" className='text-base text-gray-500 font-medium cursor-pointer flex items-center gap-2 w-max ml-4 my-2'>
                            <input
                                required
                                type="radio"
                                defaultChecked={appOptions && appOptions.applyType === 'easyApply'}
                                name="applicationTypes"
                                id="easyApply"
                                value="easyApply"
                                className="radio radio-sm radio-accent"
                                onChange={(e) => {
                                    setApplyTypeState(e.target.value);
                                }}
                            />
                            Easy Apply
                        </label>
                        <label htmlFor="redirectSite" className='text-base text-gray-500 font-medium cursor-pointer flex items-center gap-2 w-max ml-4 my-2'>
                            <input
                                required
                                type="radio"
                                name="applicationTypes"
                                defaultChecked={appOptions && appOptions.applyType !== 'easyApply'}
                                id="redirectSite"
                                value="redirectSite"
                                className="radio radio-sm radio-accent"
                                onChange={(e) => {
                                    setApplyTypeState(e.target.value);
                                }}
                            />
                            Redirect to our site
                        </label>
                        {
                            applyTypeState === 'redirectSite' &&
                            <input
                                required
                                ref={redirectLinkRef}
                                defaultValue={
                                    (appOptions && appOptions.applyType !== 'easyApply') ?
                                        appOptions?.applyType : ""
                                }
                                id='companyLink' type="text"
                                placeholder="Enter company site link. ex: www.example.com"
                                className="input h-11 text-base font-normal w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        }
                    </li>
                    <li className='mt-8'>
                        <label
                            htmlFor='email'
                            className='font-medium text-lg'
                        >
                            Provide an email to receive your applicants
                            <span className='text-orange-600 ml-1'>*</span> :
                        </label>
                        <input
                            id='email'
                            defaultValue={appOptions?.receiveEmail}
                            type="email" required
                            placeholder="Enter an email"
                            className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-8'>
                        <h1 className='text-lg font-medium'>
                            Add skillTags<span className='ml-1 font-normal'>(optional)</span> :
                        </h1>

                        {appOptions?.skillTags.length < 0 || openTagInput ? <div className='relative'>
                            <XIcon
                                onClick={() => setOpenTagInput(!openTagInput)}
                                className='absolute -top-7 right-0 w-8 h-8 text-secondary hover:bg-secondary hover:text-white duration-300 rounded-full p-1 cursor-pointer'
                            />
                            <p className='text-base text-gray-600'>
                                Add skill keywords or tags so your job can reach more accurate candidates.
                            </p>
                            <div className='flex items-center flex-wrap gap-1 w-full'>
                                {
                                    skillTagsState.map((skill, index) =>
                                        <div key={index} className='w-max flex items-center justify-between bg-secondary text-white rounded-md px-1 cursor-pointer' onClick={() => removeSkillTags(index)}>
                                            <span className='mr-1'>{skill}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" strokeWidth="2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>)
                                }
                            </div>
                            <div className='flex items-center border hover:shadow mt-2 pl-2 rounded-lg'>
                                <input
                                    type="text"
                                    placeholder="Add skill"
                                    className="h-11 w-full rounded-lg text-base pl-2 border-none focus:outline-0"
                                    ref={skillRef}
                                />
                                <div
                                    onClick={addSkillTags}
                                    className='bg-accent text-white rounded-tr-md rounded-br-md py-3 px-5 cursor-pointer'
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                            :
                            <div className='flex items-center gap-2 mt-1 relative' >
                                {
                                    appOptions?.skillTags.map((skill, index) =>
                                        <span
                                            key={index}
                                            className='bg-secondary text-white rounded-md px-1'
                                        >
                                            {skill}
                                        </span>
                                    )
                                }
                                <PencilIcon
                                    onClick={() => setOpenTagInput(!openTagInput)}
                                    className='absolute -top-8 right-0 w-8 h-8 text-secondary hover:bg-secondary hover:text-white duration-300 rounded-full p-1 cursor-pointer'
                                />
                            </div>
                        }
                    </li>
                    <li className='mt-8 text-lg text-center'>
                        <button
                            type='submit'
                            className='btn btn-outline btn-accent normal-case text-lg px-16 min-h-0 h-11 sm:w-max w-full hover:text-white'
                        >
                            Update
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default JobAppSettingForm;