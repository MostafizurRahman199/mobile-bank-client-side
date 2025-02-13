


import React from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ContactForm from "./ContactForm";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useDarkMode } from "../../Context/DarkModeContext";



const Contact = ({ flag = false }) => {
  const { user } = useFirebaseAuth();
  const {darkMode} = useDarkMode();


  return (
    <div className={`${flag ? "" : "pt-20"} ${
        darkMode ? "bg-[#151515]" : "bg-gray-50"
      }`}>
    
    <h2
        className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
          darkMode ? 'text-[#5544d9]' : 'text-[#4335a7]'
        }`}
      >
        Have you any Question?
      </h2>

      {/* Contact Form */}
      {user ? (
        <ContactForm flag={flag} name={user.displayName} email={user.email} />
      ) : (
        <ContactForm />
      )}

    </div>
  );
};

export default Contact;

