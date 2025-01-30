import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Your questions, answered
        </h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Answers to the most frequently asked questions.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="hs-accordion-group">
          <div
            className={`hs-accordion ${activeIndex === 0 ? 'hs-accordion-active:bg-gray-100 dark:hs-accordion-active:bg-white/10 active' : ''} rounded-xl p-6`}
            id="hs-basic-with-title-and-arrow-stretched-heading-one"
          >
            <button
              className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-expanded={activeIndex === 0}
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
              onClick={() => toggleAccordion(0)}
            >
              Can I cancel at anytime?
              <svg
                className={`${activeIndex === 0 ? 'hidden' : 'block'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <svg
                className={`${activeIndex === 0 ? 'block' : 'hidden'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-one"
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === 0 ? 'block' : 'hidden'}`}
              role="region"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <p className="text-gray-800 dark:text-neutral-200">
                Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.
              </p>
            </div>
          </div>

          <div
            className={`hs-accordion ${activeIndex === 1 ? 'hs-accordion-active:bg-gray-100 dark:hs-accordion-active:bg-white/10 active' : ''} rounded-xl p-6`}
            id="hs-basic-with-title-and-arrow-stretched-heading-two"
          >
            <button
              className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-expanded={activeIndex === 1}
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
              onClick={() => toggleAccordion(1)}
            >
              How do I change my password?
              <svg
                className={`${activeIndex === 1 ? 'hidden' : 'block'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <svg
                className={`${activeIndex === 1 ? 'block' : 'hidden'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-two"
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === 1 ? 'block' : 'hidden'}`}
              role="region"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
            >
              <p className="text-gray-800 dark:text-neutral-200">
                You can change your password from the account settings page. Make sure you are logged in to access this feature.
              </p>
            </div>
          </div>

          <div
            className={`hs-accordion ${activeIndex === 2 ? 'hs-accordion-active:bg-gray-100 dark:hs-accordion-active:bg-white/10 active' : ''} rounded-xl p-6`}
            id="hs-basic-with-title-and-arrow-stretched-heading-three"
          >
            <button
              className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-expanded={activeIndex === 2}
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
              onClick={() => toggleAccordion(2)}
            >
              What payment methods do you accept?
              <svg
                className={`${activeIndex === 2 ? 'hidden' : 'block'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <svg
                className={`${activeIndex === 2 ? 'block' : 'hidden'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-three"
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === 2 ? 'block' : 'hidden'}`}
              role="region"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
            >
              <p className="text-gray-800 dark:text-neutral-200">
                We accept various payment methods including credit/debit cards, PayPal, and bank transfers.
              </p>
            </div>
          </div>

          <div
            className={`hs-accordion ${activeIndex === 3 ? 'hs-accordion-active:bg-gray-100 dark:hs-accordion-active:bg-white/10 active' : ''} rounded-xl p-6`}
            id="hs-basic-with-title-and-arrow-stretched-heading-four"
          >
            <button
              className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-expanded={activeIndex === 3}
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four"
              onClick={() => toggleAccordion(3)}
            >
              Do you offer international shipping?
              <svg
                className={`${activeIndex === 3 ? 'hidden' : 'block'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <svg
                className={`${activeIndex === 3 ? 'block' : 'hidden'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-four"
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === 3 ? 'block' : 'hidden'}`}
              role="region"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four"
            >
              <p className="text-gray-800 dark:text-neutral-200">
                Yes, we offer international shipping to most countries. Shipping fees and delivery times vary based on the destination.
              </p>
            </div>
          </div>

          <div
            className={`hs-accordion ${activeIndex === 4 ? 'hs-accordion-active:bg-gray-100 dark:hs-accordion-active:bg-white/10 active' : ''} rounded-xl p-6`}
            id="hs-basic-with-title-and-arrow-stretched-heading-five"
          >
            <button
              className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-expanded={activeIndex === 4}
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five"
              onClick={() => toggleAccordion(4)}
            >
              What is your return policy?
              <svg
                className={`${activeIndex === 4 ? 'hidden' : 'block'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <svg
                className={`${activeIndex === 4 ? 'block' : 'hidden'} shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-five"
              className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === 4 ? 'block' : 'hidden'}`}
              role="region"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five"
            >
              <p className="text-gray-800 dark:text-neutral-200">
                We offer a 30-day return policy for unused and unopened items. Please visit our returns page for more details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;