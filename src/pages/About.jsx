import React, { useEffect } from "react";
import { useFirebaseAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import me from "../assets/me.jpg";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const About = () => {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate("/update-profile");
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-screen pt-20  my-8 md:px-8">
     
     
      <div
        className="w-full mx-auto bg-white rounded-lg shadow-lg sm:px-4  md:px-8"
        data-aos="zoom-in"
      >
        <div className="flex flex-col items-center">
         <div className="flex flex-col items-center gap-4">
         <div
            className="w-fit rounded-full p-1  bg-gradient-to-r from-[#151515] to-[#5544d9]"
            data-aos="zoom-in"
          >
            <img
              src={me}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                e.target.onerror = null;
              }}
            />
          </div>
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[#5544d9]"
            data-aos="zoom-in"
          >
            Md. Mostafizur Rahman
          </h1>

          <p className="text-base sm:text-lg text-center md:text-center break-words ">
            I am a passionate and dedicated computer science graduate with a
            strong interest in web development and software engineering. I am
            always eager to learn new technologies and improve my skills.
          </p>
         </div>


          <div className="max-w-4xl  mx-auto md:p-12 flex flex-col gap-4">
           
           
            <section className="md:space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Personal Information
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start mb-4">
                <p className="text-base sm:text-lg w-full md:w-1/2 break-words">
                  Name:{" "}
                  <span className="font-medium">MD. MOSTAFIZUR RAHMAN</span>
                </p>
                <p className="text-base sm:text-lg w-full md:w-1/2 break-words">
                  Email:{" "}
                  <span className="font-medium">
                    mrahman202003@bscse.uiu.ac.bd
                  </span>
                </p>
                <p className="text-base sm:text-lg w-full md:w-1/2 break-words">
                  Phone: <span className="font-medium">+8801791604420</span>
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Education
              </h2>
              <div className="flex flex-wrap justify-center mb-4">
                <div className="text-base sm:text-lg w-full md:w-1/2">
                  <p>Bachelor of Computer Science & Engineering</p>
                  <p>
                    CGPA: <span className="font-medium">3.79 (2024)</span>
                  </p>
                  <p>United International University</p>
                </div>
                <div className="text-base sm:text-lg w-full md:w-1/2">
                  <p>
                    GPA: <span className="font-medium">5.00</span> (Science)
                    (2018) - Govt Sayed Hatem Ali College, Barisal
                  </p>
                  <p>
                    GPA: <span className="font-medium">5.00</span> (Science)
                    (2016) - Udayan Secondary School, Barisal
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className=" md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Experience
              </h2>
              <div className="flex flex-wrap justify-center mb-4">
                <div className="text-lg w-full md:w-1/2">
                  <p className="font-bold">
                    Undergraduate Assistant at UIU (01-01-2024 - Current)
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>
                      Boosted students' confidence through positive
                      reinforcement and feedback.
                    </li>
                    <li>
                      Improved critical thinking skills with problem-solving
                      activities.
                    </li>
                    <li>
                      Led study groups, facilitating effective communication.
                    </li>
                    <li>Mentored junior students, honing leadership skills.</li>
                  </ul>
                </div>
                <div className="text-lg w-full md:w-1/2">
                  <p className="font-bold">
                    Center for International Affairs and Cooperation (CIAC) at
                    UIU (01-02-2022 - Current)
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>
                      The aim is to provide the students, faculty members and
                      staff the international exposure where cross-cultural
                      diversities and practices are nurtured, and learning
                      happens on a global scale.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Skills
              </h2>
              <ul className="list-disc list-inside space-y-1  text-lg">
                <li>
                  Web Development: HTML, CSS, Tailwind, React, NextJS, Express,
                  MongoDB, MySQL
                </li>
                <li>Programming Languages: JavaScript, Java, C</li>
                <li>UI/UX Design: Figma</li>
                <li>Project Management and Modern Tools</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Languages
              </h2>
              <p className="text-lg">Bangla (Native), English (Fluent)</p>
            </section>

            <section className="space-y-4">
              <h2 className="md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Profiles
              </h2>
              <p className="text-lg">
                <a
                  href="https://github.com/MostafizurRahman199"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Github
                </a>
                ,{" "}
                <a
                  href="https://linkedin.com/in/md-mostafizur-rahman-2a4499221/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="md:text-2xl font-semibold border-b-2 border-[#151515] pb-2">
                Skills Proficiency
              </h2>
              <ul className="list-none space-y-2 text-lg">
                <li>
                  Web Development: <span className="font-bold">90%</span>
                </li>
                <li>
                  Communications: <span className="font-bold">90%</span>
                </li>
                <li>
                  Management Skills: <span className="font-bold">98%</span>
                </li>
                <li>
                  Critical Thinking: <span className="font-bold">95%</span>
                </li>
                <li>
                  Leadership: <span className="font-bold">90%</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="flex flex-row gap-4 py-4">
            <a
              href="https://www.facebook.com/mostafizur.rahman.9212"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/mostafizur-rahman-1999/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/MostafizurRahman199" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
