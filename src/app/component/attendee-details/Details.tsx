'use client';

import Upload from '../uploadImage/Upload';
import React, { useState, useEffect } from 'react';

//component prop
interface componentProp {
    onNext?: () => void;
    onPrev?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface FormErrors {
    name?: string;
    email?: string;
    imageUrl?: string;
}

const Details = ({ onNext, onPrev }: componentProp) => {
    //states
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            name: '',
            email: '',
            request: '',
            imageUrl: '',
        };
    });

    //save data to localStorage
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    //get data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    //handle input and textarea change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    //handle image upload
    const handleImageUpload = (url: string) => {
        setFormData({
            ...formData,
            imageUrl: url,
        });
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'Profile photo is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onNext?.();
        }
    };
    return (
        <main>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                <div>
                    <Upload
                        onImageUpload={handleImageUpload}
                        value={formData.imageUrl || ''}
                    />
                    {errors.imageUrl && <span className="text-red-500">{errors.imageUrl}</span>}
                </div>
                <span className="hr"></span>
                <section className=' space-y-[20px]'>
                    <div className='flex flex-col'>
                        <label className='text-white text-[12px]' htmlFor="name">Enter your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none border mt-[10px] border-1 p-[8px] rounded-[9px] border-[#07373F] text-white"
                            aria-label="Name"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby="nameError"
                        />
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-white text-[12px]' htmlFor="email">Enter your email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none border mt-[10px] border-1 p-[8px] rounded-[9px] border-[#07373F] text-white"
                            aria-label="Email"
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby="emailError"
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-white text-[12px]' htmlFor="request">Special Request?</label>
                        <textarea
                            id="request"
                            name="request"
                            value={formData.request}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none border mt-[10px] border-1 p-[8px] rounded-[9px] border-[#07373F] text-white"
                            aria-label="Description"
                            aria-required="false"
                            rows={3}
                        />
                    </div>
                </section>
                <section className="flex md:flex-row flex-col-reverse items-center justify-between gap-[10px]">
                    <button onClick={onPrev} className="w-full border border-1 border-[#24A0B5] text-[#24A0B5] rounded-md py-[8px]">Back</button>
                    <button type='submit' className="w-full disabled:cursor-not-allowed disabled:bg-[#249fb563] disabled:text-[#a09f9f91] bg-[#24A0B5] text-white rounded-md py-[8px]">Get My Free Ticket</button>
                </section>
            </form>
        </main>
    )
};
export default Details
