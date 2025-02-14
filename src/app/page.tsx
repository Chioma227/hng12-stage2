'use client';

import { useEffect, useState } from "react";
import Ticket from "./component/ticket/Ticket";
import Header from "./component/header/Header";
import styles from '../../styles/Home.module.css'
import Details from "./component/attendee-details/Details";
import TicketSelect from "./component/ticket-selection/TicketSelect";

//ticket steps
const steps = [
  { id: 1, name: 'Ticket Selection' },
  { id: 2, name: 'Attendee Details' },
  { id: 3, name: 'Ready' },
];

const Wrapper = () => {
  //state
  const [currentStep, setCurrentStep] = useState(1);

  //handle next screen navigation
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  //handle previous screen navigation
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const savedStep = localStorage.getItem('ticketStep');
    if (savedStep) {
      const parsedStep = JSON.parse(savedStep);
      if (parsedStep.currentStep && parsedStep.currentStep > 0 && parsedStep.currentStep <= steps.length) {
        setCurrentStep(parsedStep.currentStep);
      }
    }
  }, []);

  //save steps to local storage
  useEffect(() => {
    localStorage.setItem(
      'ticketStep',
      JSON.stringify({ currentStep })
    );
  }, [currentStep]);

  const handleReset = () => {
    // setFormData({});
    localStorage.removeItem("formData");
    localStorage.removeItem("ticketData");
    setCurrentStep(1);
  }

  //dynamically set title for steps
  const currentStepTitle = steps.find((step) => step.id === currentStep)?.name || '';

  return (
    <>
      <Header />
      <main className='mt-[80px] flex items-center justify-center'>
        <div className='box-shadow border border-1 border-[#0E464F] bg-[#041E23] p-[20px] md:rounded-[40px] rounded-[25px] w-[600px]'>
          <header className='flex md:flex-row flex-col md:items-center md:justify-between mb-[9px]'>
            <h2 className={`text-[#FAFAFA] text-[22px]`}>{currentStepTitle}</h2>
            <span className='text-[#FAFAFA] text-[12px] font-sans'>Step {currentStep}/3</span>
          </header>
          <div className={styles.progressBar}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          <section className={`${currentStep === 3 ? "border-none bg-transparent" : "md:border border-1 border-[#0E464F] md:bg-[#052228]"}  rounded-[25px] md:p-[20px]`}>
            {currentStep === 1 && <TicketSelect onNext={handleNext} onPrev={handlePrev} />}
            {currentStep === 2 && <Details onNext={handleNext} onPrev={handlePrev} />}
            {currentStep === 3 && <Ticket onReset={handleReset} />}
          </section>
        </div>
      </main>
    </>
  )
}

export default Wrapper;
