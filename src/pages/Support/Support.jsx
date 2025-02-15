import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import mapImage from "../../../public/map.webp";
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
  const { darkMode } = useDarkMode();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className={`w-full rounded-xl p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-[#4335A7]'}`}>
      {/* Question 1 */}
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
        <AccordionHeader onClick={() => handleOpen(1)} className={`hover:text-[#5544d9] font-semibold`}>
          How do I create an account?
        </AccordionHeader>
        <AccordionBody>
          To create an account, download our app, sign up with your email or phone number, and set a secure PIN. You will receive a verification code for security.
        </AccordionBody>
      </Accordion>

      {/* Question 2 */}
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
        <AccordionHeader onClick={() => handleOpen(2)} className={`hover:text-[#5544d9] font-semibold`}>
          How do I deposit money into my account?
        </AccordionHeader>
        <AccordionBody>
          You can deposit money through authorized agents, bank transfers, or linked payment methods in the app.
        </AccordionBody>
      </Accordion>

      {/* Question 3 */}
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
        <AccordionHeader onClick={() => handleOpen(3)} className={`hover:text-[#5544d9] font-semibold`}>
          What are the fees for transactions?
        </AccordionHeader>
        <AccordionBody>
          Cash-out transactions have a 1.5% fee. Other transactions, such as deposits and payments, may have specific fees. Please check the fee section in the app.
        </AccordionBody>
      </Accordion>

      {/* Question 4 */}
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
        <AccordionHeader onClick={() => handleOpen(4)} className={`hover:text-[#5544d9] font-semibold`}>
          How do I reset my PIN?
        </AccordionHeader>
        <AccordionBody>
          To reset your PIN, go to account settings, select "Reset PIN," and follow the verification steps to set a new one.
        </AccordionBody>
      </Accordion>

      {/* Question 5 */}
      <Accordion open={open === 5} icon={<Icon id={5} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
        <AccordionHeader onClick={() => handleOpen(5)} className={`hover:text-[#5544d9] font-semibold`}>
          What should I do if my transaction fails?
        </AccordionHeader>
        <AccordionBody>
          If your transaction fails, check your internet connection, balance, and entered details. If the issue persists, contact our support team for assistance.
        </AccordionBody>
      </Accordion>

      {/* Question 6 */}
      <Accordion open={open === 6} icon={<Icon id={6} open={open} />} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2 px-4 my-1`}>
        <AccordionHeader onClick={() => handleOpen(6)} className={`hover:text-[#5544d9] font-semibold`}>
          How do I contact customer support?
        </AccordionHeader>
        <AccordionBody>
          You can contact customer support via email at support@mobilebanking.com or call our 24/7 helpline.
        </AccordionBody>
      </Accordion>
    </div>
  );
}

const Support = () => {
  const { user } = useFirebaseAuth();
  const { darkMode } = useDarkMode();

  const mapLink = "https://maps.app.goo.gl/ksbLc6YYu3GYdhxL7"; 

  return (
    <div className="py-20">
      {/* FAQs Section */}
      <div className="mt-8 w-10/12 mx-auto">
        <SectionHeading title2="Frequently Asked Questions" />
        <AccordionCustomIcon />
      </div>

      <SectionHeading title2="Need Further Assistance?" />

      {/* Contact Form */}
      {user ? <ContactForm name={user.displayName} email={user.email} /> : <ContactForm />}

      {/* Support Section - Contact & Location */}
      <div className="w-full px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-[#4335A7]">Our Office Location</h3>
          <p className="mt-2 text-[#4335A7] text-lg">Visit us for support or inquiries. We are happy to assist you.</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          {/* Map Image */}
          <div
            onClick={() => window.open(mapLink, "_blank")}
            className="w-full max-w-md cursor-pointer overflow-hidden shadow-2xl transition-transform transform hover:scale-105 duration-500"
          >
            <img src={mapImage} alt="Office Location" className="w-full h-auto object-cover border-2 border-[#5544d9] transition-transform" />
          </div>

          {/* Contact Details */}
          <div className="text-center space-y-2">
            <p className="font-semibold text-lg text-[#4335A7]">123 Finance Street, Mobile Banking HQ, City</p>
            <p className="text-[#4335A7] text-md">Support Hours: 24/7</p>
            <p className="text-[#4335A7] text-md">Email: support@mobilebanking.com</p>
            <p className="text-[#4335A7] text-md">Helpline: +123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
