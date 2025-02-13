'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './ticket.css'
import html2canvas from 'html2canvas';

interface componentProp {
    onPrev?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Ticket = ({ onPrev }: componentProp) => {
    const [ticketData, setTicketData] = useState({
        ticket: 'Regular', // Set default ticket type 
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
        <main className='flex items-center justify-center flex-col'>
            <div className='text-center text-white'>
                <h3 className='font-bold text-[25px]'>Your Ticket is Booked! </h3>
                <p className='mt-[10px]'>Check your email for a copy or you can <span>download</span></p>
            </div>
            <section id='ticket' className='border mt-[50px] border-[#24A0B5] md:w-[350px] rounded-[20px] p-[15px] bg-[#214b543a]'>
                <div className='p-[20px]'>
                    <div className='flex items-center justify-center flex-col' >
                        <h2 className="md:text-[25px] text-[19px] font-extrabold text-white text-center text-nowrap">Techember Fest &apos;&apos;25</h2>
                        <p className='text-white text-[13px]'>📍 04 Rumens road, Ikoyi, Lagos</p>
                        <p className='text-white text-[13px]'>📅 March 15, 2025 | 7:00 PM</p>
                    </div>
                    <div className='flex mt-[30px] items-center justify-center'>
                        <Image src={formData.imageUrl} alt='ibb' width={120} height={120} className='rounded-[10px] border-3 border-[#24A0B5]' />
                    </div>
                </div>
                <section className='grid grid-cols-2 p-[5px] border-2 border-[#133D44] bg-[#08343C]'>
                    <div className=' border-r-2 border-r-[#133D44] border-b-2 border-b-[#133D44] p-[8px]'>
                        <p className='text-[#11464f9e] text-[15px]'>Name</p>
                        <p className='text-[#fff] font-bold text-[17px]'>{formData.name}</p>
                    </div>
                    <div className='border-b-2 border-b-[#133D44] p-[8px]'>
                        <p className='text-[#11464f9e] text-[15px]'>Email</p>
                        <p className='text-[#fff] font-bold text-[17px]'>{formData.email}</p>
                    </div>
                    <div className='border-r-2 border-r-[#133D44] border-b-2 border-b-[#133D44] p-[8px]'>
                        <p className='text-[#11464f9e] text-[15px]'>Ticket Type:</p>
                        <p className='text-[#fff] font-bold text-[17px]'>{ticketData.ticket}</p>
                    </div>
                    <div className='border-b-2 border-b-[#133D44] p-[8px]'>
                        <p className='text-[#11464f9e] text-[15px]'>Ticket For:</p>
                        <p className='text-[#fff] font-bold text-[17px]'>{ticketData.ticketCount}</p>
                    </div>
                    {formData.request && <div className='p-[8px]'>
                        <p className='text-[#11464f9e] text-[15px]'>Special Request</p>
                        <p className='text-[#fff] text-[16px]'>{formData.request}</p>
                    </div>}
                </section>
            </section>
            <section className="flex md:flex-row flex-col-reverse items-center justify-between gap-[10px] w-full mt-[50px]">
                <button onClick={onPrev} className="w-full border border-1 border-[#24A0B5] text-[#24A0B5] rounded-md py-[8px]">Book Another Ticket</button>
                <button onClick={handleDownload} className="w-full bg-[#24A0B5] text-white rounded-md py-[8px]">Download</button>
            </section>
        </main>
    )
}

export default Ticket
