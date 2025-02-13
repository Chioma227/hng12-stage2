'use client';

import { useEffect, useState } from "react";
import styles from '../../../../styles/Home.module.css'
interface ticketProp {
    type: string;
    access: string;
    count: string;
    ticket: string
}

interface componentProp {
    onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onPrev?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TicketSelect = ({ onNext, onPrev }: componentProp) => {
    const [selectedTicket, setSelectedTicket] = useState<string>('Regular'); 
    const [ticketCount, setTicketCount] = useState<number>(1);

    useEffect(() => {
        const savedData = localStorage.getItem('ticketData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setSelectedTicket(parsedData.ticket || 'Regular'); 
          setTicketCount(parsedData.ticketCount || 1); 
        }
      }, []);

    useEffect(() => {
    localStorage.setItem(
      'ticketData',
      JSON.stringify({ ticket: selectedTicket, ticketCount }) 
    );
  }, [selectedTicket, ticketCount]);

    const handleTicketTypeChange = (ticket: string) => {
        setSelectedTicket(ticket);
    };

    const handleTicketCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTicketCount(parseInt(event.target.value));
    };

    const tickets: ticketProp[] = [
        {
            type: 'Free',
            access: 'regular access',
            count: '20/52',
            ticket: 'Regular'
        },
        {
            type: '$150',
            access: 'vip access',
            count: '20/52',
            ticket: 'VIP'
        },
        {
            type: '$250',
            access: 'vvip access',
            count: '20/52',
            ticket: 'VVIP'
        },
    ]
    return (
        <main className="flex flex-col gap-[25px]">
            <section className="background border border-1 text-center text-[#FAFAFA] border-[#0E464F] rounded-[15px] p-[10px] flex items-center justify-center flex-col">
                <h2 className="md:text-[25px] text-[21px] font-extrabold">Techember Fest &apos;&apos;25</h2>
                <p className="text-[13px] my-[8px]">Join us for an unforgettable experience at <br /> [Event Name]! Secure your spot now.</p>
                <p className="text-[14px] md:mt-0 mt-[14px]">📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
            </section>
            <span className="hr"></span>
            <section>
                <p className="text-[#D9D9D9] mb-[10px] text-[14px]">Select Ticket Type:</p>
                <div className="select-ticket_button bg-[#02191dab] border border-1 border-[#07373F] p-[10px] rounded-[19px] flex md:flex-row flex-col items-center justify-center md:gap-[20px] gap-[10px]">
                    {tickets.map((ticket, i) => {
                        return (
                            <div key={i} className={`${styles.ticketType} ${selectedTicket === ticket.ticket ? styles.selected : ''
                                }`}
                                onClick={() => handleTicketTypeChange(ticket.ticket)}
                            >
                                <h3 className="text-[19px] mb-[5px] text-[#FAFAFA] font-semibold m-0">{ticket.type}</h3>
                                <p className="text-[11px] text-[#D9D9D9] text-nowrap uppercase font-medium m-0">{ticket.access}</p>
                                <span className="text-[11px] text-[#D9D9D9] font-thin">{ticket.count}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section>
                <label htmlFor="ticketCount" className="text-[#D9D9D9] text-[14px]">Number of Tickets:</label><br />
                <select
                    className="w-full bg-transparent outline-none border mt-[10px] border-1 p-[8px] rounded-[9px] border-[#07373F] text-white"
                    id="ticketCount"
                    value={ticketCount}
                    onChange={handleTicketCountChange}
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </section>
            <section className="flex md:flex-row flex-col-reverse items-center justify-between gap-[10px]">
                <button onClick={onPrev} className="w-full border border-1 border-[#24A0B5] text-[#24A0B5] rounded-md py-[8px]">Cancel</button>
                <button onClick={onNext} className="w-full bg-[#24A0B5] text-white rounded-md py-[8px]">Next</button>
            </section>
        </main>
    )
}

export default TicketSelect
