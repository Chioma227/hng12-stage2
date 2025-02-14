'use client';

import './ticket.css'
import Image from 'next/image'
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react'

//component prop
interface componentProp {
    onReset: () => void;
}


const Ticket = ({ onReset }: componentProp) => {
    //state
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
                const canvas = await html2canvas(element, {backgroundColor: "#09505c",});
                const dataURL = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'ticket.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error("Element with ID 'ticket' not found.");
            }
        } catch (error) {
            console.error('Error downloading ticket:', error);
        }
    };
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className='text-center text-white'>
                <h3 className='font-bold text-[25px]'>Your Ticket is Booked! </h3>
                <p className='mt-[10px]'>Check your email for a copy or you can <span>download</span></p>
            </div>
            <div id="ticket-card" className="w-fit h-full mt-[50px] relative overflow-hidden">
                <div
                    className="ticket-inner relative border-b-0 z-30 border-[#24A0B5] border-2 md:p-[20px] p-[15px] bg-[#072C31] text-white"
                >
                    <div className="w-8 h-8 absolute rounded-full bg-[#041E23] border-l-2  border-b-2 border-[#24A0B5] -top-4 -right-4"></div>
                    <div className="w-8 h-8 absolute rounded-full bg-[#041E23] border-l-2  border-b-2 border-[#24A0B5] -top-4 -left-4"></div>
                    <div className="w-8 h-8 absolute  z-50 rounded-full bg-[#041E23] border-2  border-l-0 border-[#24A0B5] --4 -bottom-4 -right-4"></div>
                    <div className="w-8 h-8 absolute  z-50 rounded-full bg-[#041E23] border-2  border-l-0 border-[#24A0B5] --4 -bottom-4 -left-4"></div>

                    <section id='ticket' className='border border-[#24A0B5] md:w-[290px] w-[100%] rounded-[20px] p-[15px] bg-transparent'>
                        <div className='flex items-center justify-center flex-col'>
                            <div className='flex items-center justify-center flex-col' >
                                <h2 className="md:text-[25px] text-[27px] leading-10 font-extrabold">Techember Fest &apos;&apos;25</h2>
                                <div className="text-[14px] text-[#cbcaca] md:mt-0 mt-[14px] flex sm:flex-row flex-col gap-1 text-center"><span>📍 Location: <span className="font-bold text-white">Your Homes</span> </span> <span>📅 March 15, 2025 | 7:00 PM</span></div>
                            </div>
                            <div className='flex mt-[30px] w-[150px] h-[150px] items-center justify-center'>
                                {formData.imageUrl ? (
                                    <Image
                                        src={formData.imageUrl}
                                        alt="user"
                                        width={120}
                                        height={120}
                                        className="rounded-[10px] border-[4px] border-[#28a1b7aa] w-full h-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={'/imgPlaceholder.png'}
                                        alt="user"
                                        width={120}
                                        height={120}
                                        className="rounded-[10px] border-3 border-[#2ec4de] w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <section className='grid grid-cols-2 p-[5px] mt-[30px] rounded-[20px] border-2 border-[#133D44] bg-[#08343C]'>
                                <div className=' border-r-2 border-r-[#133D44] border-b-2 border-b-[#133D44] p-[8px]'>
                                    <p className='text-[#d2cccc92] text-[15px]'>Name</p>
                                    <p className='text-[#fff] font-medium md:text-[17px] text-[14px] mt-[6px]'>{formData.name}</p>
                                </div>
                                <div className='ticket-email border-b-2 border-b-[#133D44] p-[8px]'>
                                    <p className='text-[#d2cccc92] text-[15px]'>Email</p>
                                    <p className='text-[#fff] font-medium md:text-[17px] text-[14px] mt-[6px]'>{formData.email}</p>
                                </div>
                                <div className='border-r-2 border-r-[#133D44] border-b-2 border-b-[#133D44] p-[8px]'>
                                    <p className='text-[#d2cccc92] text-[15px]'>Ticket Type:</p>
                                    <p className='text-[#fff] font-medium md:text-[17px] text-[14px] mt-[6px]'>{ticketData.ticket}</p>
                                </div>
                                <div className='border-b-2 border-b-[#133D44] p-[8px]'>
                                    <p className='text-[#d2cccc92] text-[15px]'>Ticket For:</p>
                                    <p className='text-[#fff] font-medium md:text-[17px] text-[14px] mt-[6px]'>{ticketData.ticketCount}</p>
                                </div>
                                {formData.request && <div className='p-[8px] col-span-2'>
                                    <p className='text-[#d2cccc92] text-[15px]'>Special Request</p>
                                    <p className='text-[#fff] md:text-[16px] text-[14px] mt-[6px]'>{formData.request}</p>
                                </div>}
                            </section>
                        </div>
                    </section>
                    <div className="flex gap-1 left-0 bottom-0 absolute bg-[#041E23]  w-full">
                        {Array.from({ length: 40 }, (_, i) => (
                            <div key={i} className="w-[8px]  relative h-[2px] border-[#24A0B5] border   text-white rounded-full "></div>
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
