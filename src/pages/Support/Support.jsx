




import React from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import mapImage from "../../../public/map.webp"
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useDarkMode } from "../../Context/DarkModeContext";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ContactForm from "../Contact/ContactForm";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function AccordionCustomIcon() {
  const [open, setOpen] = React.useState(0);
  const {darkMode} = useDarkMode()

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className={`w-full rounded-xl p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-[#4335A7]'}`}>
    {/* Question 1 */}
    <Accordion open={open === 1} icon={<Icon id={1} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
      <AccordionHeader onClick={() => handleOpen(1)} className={`hover:text-[#5544d9] ${darkMode ? 'text-white' : 'text-[#4335A7]'} font-semibold`}>
        What is the process to join a camp?
      </AccordionHeader>
      <AccordionBody className={`${darkMode ? 'text-gray-200' : 'text-[#4335A7]'}`}>
        To join a camp, simply browse through the available camps, select the one that best fits your schedule and needs, and follow the registration process. You can also pay for your participation online and get confirmation.
      </AccordionBody>
    </Accordion>

    {/* Question 2 */}
    <Accordion open={open === 2} icon={<Icon id={2} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1 `}>
      <AccordionHeader onClick={() => handleOpen(2)} className={`hover:text-[#5544d9] ${darkMode ? 'text-white' : 'text-[#4335A7]'} font-semibold`}>
        How do I make payments for a camp?
      </AccordionHeader>
      <AccordionBody className={`${darkMode ? 'text-gray-200' : 'text-[#4335A7]'}`}>
        Payments for camps are made through an integrated payment gateway. You can make secure payments using your credit/debit card, mobile wallets, or other available payment options.
      </AccordionBody>
    </Accordion>

    {/* Question 3 */}
    <Accordion open={open === 3} icon={<Icon id={3} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
      <AccordionHeader onClick={() => handleOpen(3)} className={`hover:text-[#5544d9] ${darkMode ? 'text-white' : 'text-[#4335A7]'} font-semibold`}>
        How can I cancel my registration?
      </AccordionHeader>
      <AccordionBody className={`${darkMode ? 'text-gray-200' : 'text-[#4335A7]'}`}>
        If you wish to cancel your registration, you can do so directly through the dashboard or by contacting our support team. Please make sure to do this in advance to ensure a full refund (if applicable).
      </AccordionBody>
    </Accordion>

    {/* Question 4 */}
    <Accordion open={open === 4} icon={<Icon id={4} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
      <AccordionHeader onClick={() => handleOpen(4)} className={`hover:text-[#5544d9] ${darkMode ? 'text-white' : 'text-[#4335A7]'} font-semibold`}>
        Can I attend multiple camps at the same time?
      </AccordionHeader>
      <AccordionBody className={`${darkMode ? 'text-gray-200' : 'text-[#4335A7]'}`}>
        Yes, you can attend multiple camps if the schedules do not overlap. You can register for each camp individually and manage your participation through your dashboard.
      </AccordionBody>
    </Accordion>

    {/* Question 5 */}
    <Accordion open={open === 5} icon={<Icon id={5} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
      <AccordionHeader onClick={() => handleOpen(5)} className={`hover:text-[#5544d9] ${darkMode ? 'text-white' : 'text-[#4335A7]'} font-semibold`}>
        Are there any age restrictions for camp participation?
      </AccordionHeader>
      <AccordionBody className={`${darkMode ? 'text-gray-200' : 'text-[#4335A7]'}`}>
        Age restrictions vary by camp. Some camps may have age requirements for safety or medical reasons. Please check the specific camp details for more information on any age restrictions.
      </AccordionBody>
    </Accordion>

    {/* Question 6 */}
    <Accordion open={open === 6} icon={<Icon id={6} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
      <AccordionHeader onClick={() => handleOpen(6)} className={`hover:text-[#5544d9] ${darkMode ? 'text-white' : 'text-[#4335A7]'} font-semibold`}>
        How can I contact customer support?
      </AccordionHeader>
      <AccordionBody className={`${darkMode ? 'text-gray-200' : 'text-[#4335A7]'}`}>
        You can contact customer support via email at support@healthcamp.com or by calling our hotline. Our support team is available 9 AM to 6 PM on weekdays.
      </AccordionBody>
    </Accordion>
  </div>
  );
}

const Support = () => {
  const { user } = useFirebaseAuth();
  const { darkMode } = useDarkMode();
 
  const mapLink = "https://maps.app.goo.gl/ksbLc6YYu3GYdhxL7"; // Link to Google Maps or a map platform

  return (
    <div className="py-20">
      {/* FAQs Section */}
      <div className="mt-8 w-10/12 mx-auto">
      <SectionHeading title2="Frequently Asked Questions" />
        <AccordionCustomIcon />
      </div>
      <SectionHeading title2="Have you got any questions?" />

      {/* Contact Form */}
      {user ? (
        <ContactForm  name={user.displayName} email={user.email} />
      ) : (
        <ContactForm />
      )}


      {/* Support Section - Card with Location */}
      {/* <SectionHeading title2="Support Center" /> */}
      <div className="w-full px-6 md:px-12 py-16 ">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-semibold text-[#4335A7]">Our Office Location</h3>
        <p className="mt-2 text-[#4335A7] text-lg">Visit us for support or inquiries. We are happy to assist you.</p>
      </div>

      <div className="flex flex-col  justify-center items-center gap-8">
        {/* Map placeholder */}
        <div
          onClick={() => window.open(mapLink, "_blank")} // Open map in new tab on click
          className="w-full max-w-md cursor-pointer  overflow-hidden shadow-2xl transition-transform transform hover:scale-105 duration-500"
        >
          <img
            src={mapImage}
            alt="Map Location"
            className="w-full h-auto object-cover  border-2 border-[#5544d9] transition-transform"
          />
        </div>

        {/* Contact Details */}
        <div className="text-center md:text-left space-y-2">
          <p className="font-semibold text-lg text-[#4335A7]">123 Health Street, Medical City, Country</p>
          <p className="text-[#4335A7] text-md">Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p className="text-[#4335A7] text-md">Contact: support@healthcamp.com</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Support;

