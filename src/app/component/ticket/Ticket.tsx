'use client';

import './ticket.css'
import Image from 'next/image'
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react'

interface componentProp {
    onReset: () => void;
}

const Ticket = ({ onReset }: componentProp) => {
    const [ticketData, setTicketData] = useState({
        ticket: 'Regular',
        ticketCount: 1
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        request: '',
        imageUrl: ''
    });

    useEffect(() => {
        const retrievedTicketData = localStorage.getItem('ticketData');
        const retrievedFormData = localStorage.getItem('formData');

        if (retrievedTicketData) {
            setTicketData(JSON.parse(retrievedTicketData));
        }

        if (retrievedFormData) {
            setFormData(JSON.parse(retrievedFormData));
        }
    }, []);

    //download ticket function
    const handleDownload = async () => {
        try {
            const element = document.getElementById('ticket') as HTMLElement;

            if (element) {
                const canvas = await html2canvas(element);
                const dataURL = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'ticket.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error("Element with ID 'myDiv' not found.");
            }
        } catch (error) {
            console.error('Error downloading div:', error);
        }
    };
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className='text-center text-white'>
                <h3 className='font-bold text-[25px]'>Your Ticket is Booked! </h3>
                <p className='mt-[10px]'>Check your email for a copy or you can <span>download</span></p>
            </div>
            <div className="w-fit h-full mt-[50px] relative overflow-hidden">
                <div
                    id="ticket-card"
                    className="relative border-b-0 z-30 border-[#24A0B5] border-2 md:p-[20px] p-[15px] bg-[#072C31] text-white"
                >
                    <div className="w-8 h-8 absolute rounded-full bg-[#041E23] border-l-2  border-b-2 border-[#24A0B5] -top-4 -right-4"></div>
                    <div className="w-8 h-8 absolute rounded-full bg-[#041E23] border-l-2  border-b-2 border-[#24A0B5] -top-4 -left-4"></div>
                    <div className="w-8 h-8 absolute  z-50 rounded-full bg-[#041E23] border-2  border-l-0 border-[#24A0B5] --4 -bottom-4 -right-4"></div>
                    <div className="w-8 h-8 absolute  z-50 rounded-full bg-[#041E23] border-2  border-l-0 border-[#24A0B5] --4 -bottom-4 -left-4"></div>

                    <section id='ticket' className='border border-[#24A0B5] md:w-[290px] w-[240px] rounded-[20px] p-[15px] bg-transparent'>
                        <div className='p-[20px] flex items-center justify-center flex-col'>
                            <div className='flex items-center justify-center flex-col' >
                                <h2 className="md:text-[25px] text-[19px] font-extrabold text-white text-center text-nowrap">Techember Fest &apos;&apos;25</h2>
                                <p className='text-white text-[13px]'>📍 04 Rumens road, Ikoyi, Lagos</p>
                                <p className='text-white text-[13px]'>📅 March 15, 2025 | 7:00 PM</p>
                            </div>
                            <div className='flex mt-[30px] w-[150px] h-[150px] items-center justify-center'>
                                <Image src={formData.imageUrl} alt='user' width={120} height={120} className='rounded-[10px] border-3 border-[#21535c] w-full h-full object-cover' />
                            </div>
                        </div>
                        <section className='grid grid-cols-2 p-[5px] border-2 border-[#133D44] bg-[#08343C]'>
                            <div className=' border-r-2 border-r-[#133D44] border-b-2 border-b-[#133D44] p-[8px]'>
                                <p className='text-[#807f7fa4] text-[15px]'>Name</p>
                                <p className='text-[#fff] font-bold md:text-[17px] text-[14px] mt-[6px]'>{formData.name}</p>
                            </div>
                            <div className='ticket-email border-b-2 border-b-[#133D44] p-[8px]'>
                                <p className='text-[#807f7fa4] text-[15px]'>Email</p>
                                <p className='text-[#fff] font-bold md:text-[17px] text-[14px] mt-[6px]'>{formData.email}</p>
                            </div>
                            <div className='border-r-2 border-r-[#133D44] border-b-2 border-b-[#133D44] p-[8px]'>
                                <p className='text-[#807f7fa4] text-[15px]'>Ticket Type:</p>
                                <p className='text-[#fff] font-bold md:text-[17px] text-[14px] mt-[6px]'>{ticketData.ticket}</p>
                            </div>
                            <div className='border-b-2 border-b-[#133D44] p-[8px]'>
                                <p className='text-[#807f7fa4] text-[15px]'>Ticket For:</p>
                                <p className='text-[#fff] font-bold md:text-[17px] text-[14px] mt-[6px]'>{ticketData.ticketCount}</p>
                            </div>
                            {formData.request && <div className='p-[8px] col-span-2'>
                                <p className='text-[#807f7fa4] text-[15px]'>Special Request</p>
                                <p className='text-[#fff] md:text-[16px] text-[14px] mt-[6px]'>{formData.request}</p>
                            </div>}
                        </section>
                    </section>
                    <div className="flex gap-1 left-0 bottom-0 absolute bg-[#041E23]  w-full">
                        {Array.from({ length: 40 }, () => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="w-[8px]  relative h-[2px] border-[#24A0B5] border   text-white rounded-full "></div>
                        ))}
                    </div>
                </div>
                <div className="w-full overflow-hidden">
                    <div className="bar-code w-full border-[#24A0B5] border-t-0 flex items-center justify-center  relative h-24 px-10 py-[25px] border-2 bg-[#072C31] text-white rounded-2xl ">
                        <div className="w-[95%] h-20 relative">
                            <Image alt="barcode" src="/Bar Code.svg" fill />
                        </div>
                        <div className="w-8 h-8 absolute  z-50 rounded-full bg-[#041E23] border-2  border-l-0 border-[#24A0B5] --4 -bottom-4 -right-4"></div>
                        <div className="w-8 h-8 absolute  z-50 rounded-full bg-[#041E23] border-2  border-l-0 border-[#24A0B5] --4 -bottom-4 -left-4"></div>
                    </div>
                </div>
            </div>
            <section className="flex md:flex-row flex-col-reverse items-center justify-between gap-[10px] w-full mt-[50px]">
                <button onClick={onReset} className="w-full border border-1 border-[#24A0B5] text-[#24A0B5] rounded-md py-[8px]">Book Another Ticket</button>
                <button onClick={handleDownload} className="w-full bg-[#24A0B5] text-white rounded-md py-[8px]">Download</button>
            </section>
        </div>
    )
}

export default Ticket
