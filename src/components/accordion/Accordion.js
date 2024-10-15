import React, { useState } from "react";

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div
      className="accordion accordion--style1"
      id="faqAccordion1"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <div className="row">
        <div class="accordion">
          <div className="col-12">
            <div
              className={`accordion__item accordion-item
              `}
            >
              <div className="accordion__header accordion-header">
                <button
                  onClick={() => setAccordionOpen(!accordionOpen)}
                  className="flex justify-between w-full py-2 px-2"
                >
                  <span
                    className={`text-lg font-poppins ${
                      accordionOpen ? "text-green-500 " : ""
                    }`}
                  >
                    {title}
                  </span>
                  <svg
                    className={`shrink-0 ml-8 ${
                      accordionOpen ? "fill-green-500  " : ""
                    }`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transform origin-center transition duration-200 ease-out ${
                        accordionOpen && "!rotate-180"
                      }`}
                    />
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                        accordionOpen && "!rotate-180"
                      }`}
                    />
                  </svg>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                    accordionOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="accordion__body accordion-body overflow-hidden bg-white px-4">
                    <p className="py-5 text-base font-poppins">{answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
