"use client";



import React, { useState } from 'react';

const faqs = [
  {
    question: 'Can I cancel at anytime?',
    answer: 'Yes, you can cancel anytime. No questions are asked while you cancel, but we would highly appreciate it if you provide us with some feedback.'
  },
  {
    question: 'How do I change my password?',
    answer: 'You can change your password from the account settings page. Make sure you are logged in to access this feature.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit/debit cards, PayPal, and bank transfers.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping. Shipping charges and delivery times vary depending on your location.'
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-[var(--primary-text-color)]">
          Your questions, answered
        </h2>
        <p className="mt-1 text-gray-200-600 dark:text-neutral-400">
          Answers to the most frequently asked questions.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className={`rounded-xl p-6 ${activeIndex === index ? 'bg-gray-100 dark:bg-white/10' : ''}`}>
            <button
              className="group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-200-800 rounded-lg transition hover:text-gray-200-500 focus:outline-none dark:text-neutral-200 dark:hover:text-neutral-400"
              aria-expanded={activeIndex === index}
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
              <svg
                className={`shrink-0 size-5 text-gray-200-600 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="text-gray-200-800 dark:text-neutral-200">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
