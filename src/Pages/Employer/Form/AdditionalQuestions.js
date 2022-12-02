import { CheckIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';

const AdditionalQuestions = ({
    addQuestions,
    removeQuestion,
    addCTQuestion,
    removeCustomQuestion,
    handleQuestion,
    handleCustomQuestion
}) => {


    return (
        <div className='mt-10'>
            <div className='mb-2'>
                <h2 className='font-medium sm:text-lg text-base'>Add screening questions<span className='ml-1 font-normal'>(optional)</span></h2>
                <p className='text-gray-600 text-base'>Your job post reaches those people who match your requirements.</p>
            </div>

            {/*==================== 
                Question options 
            ====================*/}
            {
                addQuestions.find(q => q === 'bgCheck') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='bgCheck'
                            className='text-base font-medium w-full bg-transparent'
                            value='How many years of work experience do you have using [Tool or Technology] ?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('bgCheck')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <label htmlFor='technology' className='text-base block'>Tool or Technology</label>
                            <input
                                required
                                id='technology'
                                type="text"
                                placeholder="Tool or Technology"
                                className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor='nbTechnology' className='text-base'>Ideal Answer</label>
                            <div className='flex items-center'>
                                <input
                                    id='nbTechnology'
                                    type="number"
                                    placeholder='1'
                                    min={1} required
                                    className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                                <p className='text-sm ml-2'>minimum</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox1' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox1">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'certification') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='certificationQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='Do you have the following certification: [Certification] ?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('certification')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <label htmlFor='certification' className='text-base block'>Certification</label>
                            <input
                                id='certification'
                                type="text"
                                required
                                placeholder="Certification"
                                className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor='nbCertification' className='text-base'>Ideal Answer</label>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox2' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox2">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'drivingLicense') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='drivingLicenseQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='Do you have a valid driving license?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('drivingLicense')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <h2 className='text-base'>Ideal Answer</h2>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox3' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox3">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'drugTest') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='drugTestQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='Are you willing to take a drug test, in accordance with local law/regulations?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('drugTest')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <h2 className='text-base'>Ideal Answer</h2>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox4' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox4">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'education') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='educationQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='Have you completed the following level of education: [Degree] ?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('education')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <label htmlFor='degree' className='text-base block'>Degree</label>
                            <input
                                id='degree'
                                type="text"
                                required
                                placeholder="Degree"
                                className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div>
                            <h2 className='text-base'>Ideal Answer</h2>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox5' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox5">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'gpa') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='gpaQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='What is your university result [GPA] ?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('gpa')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <label htmlFor='gpaPoint' className='text-base'>Ideal Answer</label>
                            <div className='flex items-center'>
                                <input
                                    id='gpaPoint'
                                    type="number"
                                    placeholder='1'
                                    min={1} required
                                    className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                                <p className='text-sm ml-2'>minimum</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox6' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox6">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'hybridWork') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='hybridWorkQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='Are you comfortable working in a hybrid work?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('hybridWork')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <h2 className='text-base'>Ideal Answer</h2>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox7' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox7">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'remoteWork') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='remoteWorkQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='Are you comfortable working in a remote work?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('remoteWork')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <h2 className='text-base'>Ideal Answer</h2>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox8' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox8">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'workExperience') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='workExperienceQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='How many years of [Job title] experience do you have ?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('workExperience')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <label htmlFor='workExperience' className='text-base block'>Job Title</label>
                            <input
                                id='workExperience'
                                type="text"
                                required
                                placeholder="Job Title"
                                className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor='nbExperience' className='text-base'>Ideal Answer</label>
                            <div className='flex items-center'>
                                <input
                                    id='nbExperience'
                                    type="number"
                                    placeholder='1'
                                    min={1} required
                                    className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                                <p className='text-sm ml-2'>minimum</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox9' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox9">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }
            {
                addQuestions.find(q => q === 'urgentHiring') && <div className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <input
                            disabled
                            id='urgentHiringQ'
                            className='text-base font-medium w-full bg-transparent'
                            value='We are hiring urgently, can you join immediately?'
                        ></input>
                        <XIcon
                            onClick={() => removeQuestion('urgentHiring')}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                        <div>
                            <h2 className='text-base'>Ideal Answer</h2>
                            <p className='text-base mt-2'>Yes</p>
                        </div>
                        <div className='flex items-center'>
                            <input id='checkbox10' type="checkbox" className="checkbox rounded bg-white" />
                            <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox10">Must-have qualification</label>
                        </div>
                    </div>
                </div>
            }


            {/*==================== 
                Custom Question 
            ====================*/}
            {addCTQuestion.map((items, index) =>
                <div key={index} className='w-full my-5 border rounded-md'>
                    <div className='flex justify-between bg-accent/20 p-3'>
                        <h3 className='text-base font-medium'>Write a custom screening question.</h3>
                        <XIcon
                            onClick={() => removeCustomQuestion(index)}
                            className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-accent/25'
                        ></XIcon>
                    </div>
                    <div className='px-3 pt-3'>
                        <textarea
                            required
                            id={`customQ${index + 1}`}
                            className='border w-full p-2 border-gray-200 focus:outline-0 focus:shadow-md'
                            placeholder='Ask something here'
                            rows="2"
                        />
                    </div>
                    <div className='p-3'>
                        <label className='text-base'>Ideal Answer</label>
                        <div className='flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                            <select
                                id={`select${index + 1}`}
                                className="px-2 h-9 rounded-none text-base mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                            >
                                <option disabled selected defaultValue="Yes/No">Yes / No</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <p className='text-base'>or</p>
                            <div className='flex items-center'>
                                <input
                                    id={`nbCTQ${index + 1}`}
                                    type="number"
                                    placeholder='1'
                                    min={1}
                                    className="px-2 h-9 rounded-none text-base mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                                <p className='text-sm ml-2'>minimum</p>
                            </div>
                            <div className='flex items-center'>
                                <input id={`checkboxCTQ${index + 1}`} type="checkbox" className="checkbox rounded bg-white" />
                                <label className='text-sm ml-2 cursor-pointer' htmlFor={`checkboxCTQ${index + 1}`}>Must-have qualification</label>
                            </div>
                        </div>
                    </div>
                </div>)}


            {/*==================== 
                 Add Question button 
            ====================*/}
            <div className='flex flex-wrap gap-3'>
                <div onClick={() => handleQuestion('bgCheck')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Background Check</p>
                    {addQuestions.find(q => q === 'bgCheck') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('certification')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Certification</p>
                    {addQuestions.find(q => q === 'certification') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('drivingLicense')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Driving license</p>
                    {addQuestions.find(q => q === 'drivingLicense') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('drugTest')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Drug test</p>
                    {addQuestions.find(q => q === 'drugTest') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('education')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Education</p>
                    {addQuestions.find(q => q === 'education') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('gpa')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>GPA</p>
                    {addQuestions.find(q => q === 'gpa') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('hybridWork')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Hybrid work</p>
                    {addQuestions.find(q => q === 'hybridWork') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('remoteWork')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Remote work</p>
                    {addQuestions.find(q => q === 'remoteWork') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('workExperience')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Work experience</p>
                    {addQuestions.find(q => q === 'workExperience') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                <div onClick={() => handleQuestion('urgentHiring')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                    <p>Urgent hiring</p>
                    {addQuestions.find(q => q === 'urgentHiring') ?
                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                        :
                        <PlusIcon className='w-5 h-5'></PlusIcon>
                    }
                </div>
                {
                    addCTQuestion.length < 5 ?
                        <div onClick={() => handleCustomQuestion('customQuestion')} className='bg-accent/30 flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Custom question</p>
                            {addCTQuestion.find(q => q === 'customQuestion') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        :
                        <div className='bg-accent/30 text-gray-400 flex items-center gap-2 border-2 w-max px-3 py-2'>
                            <p>Custom question</p>
                            {addCTQuestion.find(q => q === 'customQuestion') ?
                                <CheckIcon className='w-5 h-5 text-gray-400'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                }

            </div>
        </div>
    );
};

export default AdditionalQuestions;