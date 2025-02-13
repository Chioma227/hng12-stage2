'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Upload from '../uploadImage/Upload';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../../../../styles/Home.module.css'

//component prop
interface componentProp {
    onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onPrev?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

//yup schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    imageUrl: yup.string().required('Profile photo is required'),
});

const Details = ({ onNext, onPrev }: componentProp) => {
    //states
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
          name: '',
          email: '',
          request: '',
          imageUrl: '',
        };
      });

    //set up form state
    const {
        formState: { errors },
        reset,
        handleSubmit,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formData,
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
            reset(JSON.parse(savedData));
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

    useEffect(() => {
        localStorage.setItem(
            'formData',
            JSON.stringify({ ...getValues() })
        );
    }, [getValues]);

    const onSubmit = () => {
        console.log('Form submitted:');
    };
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[25px]">
                <div>
                    <Upload
                        onImageUpload={handleImageUpload}
                        value={formData.imageUrl}
                    />
                    {/* {errors.imageUrl && (
                        <span id="imageUrlError" className={styles.error}>
                            {errors.imageUrl.message}
                        </span>
                    )} */}
                </div>
                <span className="hr"></span>
                <>
                    <div className='mb-[10px] flex flex-col'>
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
                        {/* {errors.name && (
                            <span id="nameError" className={styles.error}>
                                {errors.name.message}
                            </span>
                        )} */}
                    </div>
                    <div className='mb-[10px] flex flex-col'>
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
                        {/* {errors.email && (
                            <span id="emailError" className={styles.error}>
                                {errors.email.message}
                            </span>
                        )} */}
                    </div>
                    <div className='mb-[10px] flex flex-col'>
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
                </>
                <section className="flex md:flex-row flex-col-reverse items-center justify-between gap-[10px]">
                    <button onClick={onPrev} className="w-full border border-1 border-[#24A0B5] text-[#24A0B5] rounded-md py-[8px]">Back</button>
                    <button type='submit' onClick={onNext} className="w-full disabled:cursor-not-allowed disabled:bg-[#249fb563] disabled:text-[#a09f9f91] bg-[#24A0B5] text-white rounded-md py-[8px]">Get My Free Ticket</button>
                </section>
            </form>
        </main>
    )
};
export default Details
