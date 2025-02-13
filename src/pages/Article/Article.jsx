import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFirebaseAuth } from "../../hooks/useAuth";
import ApiComponent from "../../API/ApiComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'; // Corrected import for SyntaxHighlighter
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Import syntax highlighter
import { FaUser, FaTag, FaTimes, FaCalendarTimes, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useDarkMode } from "../../Context/DarkModeContext";
import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import ShareButton from "./ShareButton";
import Aos from "aos";
import { FaPenNib } from "react-icons/fa6";


const Article = () => {
  // Check if the user is logged in
  const { user } = useFirebaseAuth();
  const name = user?.displayName;
  const email = user?.email;
  const { getArticle } = ApiComponent();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [comment, setComment] = useState("");
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);
  const api = useAxiosSecure();
  const {darkMode} = useDarkMode();

  const [open, setOpen] = useState(null); // To manage which accordion is open

  const handleToggle = (index) => {
    setOpen(open === index ? null : index); // Toggle the accordion open/close
  };

  // Fetch article data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getArticle"],
    queryFn: getArticle,
  });


  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);


  // here data is an array where have several article
  //where have createdAt field in each article object
  // sort article by new date 
  const sortedArticles = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));




  console.log(data);



  // Handle comment submission
  const handleCommentSubmit = async (articleId) => {
    // Ensure the user is logged in before submitting a comment
    if (!user?.email) {
      Swal.fire("You have to Login", "Please login to post a comment", "warning");
      return;
    }
  
    // Validate that the comment is not empty
    if (comment.trim()) {
      const data = {
        articleId,
        comment,
        name: user?.displayName, 
        email: user?.email, 
        createdAt: new Date(),
      };
  
      try {
     
        const result = await api.post("/post-comment", data);
  
        if (result.data.success) {
          refetch();
          Swal.fire("Success!", "Your comment has been posted!", "success");
          setComment(""); // Reset the comment field after posting
        } else {
          Swal.fire("Error", "There was an issue posting your comment. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error posting comment:", error);
        Swal.fire("Error", "Failed to submit your comment. Please try again later.", "error");
      }
    } else {
      // Show error if comment is empty
      Swal.fire("Error", "Please enter a comment", "error");
    }
  };


  

  // Handle love (like) button click
  const handleLove = async (articleId) => {
    if (!user?.email) {
      Swal.fire("You have to Login", "For giving react you have to login first", "warning");
      return;
    }
  
    try {
      const data = {
        articleId,
        email: user.email, // Ensure email is passed correctly
      };
  
      // Make the POST request to the backend
      const result = await api.post("/post-love", data);
  
      // Handle successful response
      if (result.data.success) {
          refetch();
          setLoved(true)
      } else {
        // Handle error from backend
        Swal.fire("Error", result.data.message, "error");
      }
    } catch (error) {
      console.error("Error making the request:", error);
      Swal.fire("Error", "There was a problem processing your request. Please try again.", "error");
    }
  };



  // Handle save button click
  const handleSave = async (articleId) => {
    if (user) {
      setSaved(!saved);
      Swal.fire("Success!", saved ? "Article removed from saved posts" : "Article saved!", "success");
    } else {

   
    Swal.fire("Login Required", "Please login to save this article", "warning");
    }
  };

  // Search and Filter Logic
  const filteredArticles = sortedArticles?.filter(
    (article) =>
      (article.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        article.tags?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
      (categoryFilter ? article?.category === categoryFilter : true)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: Something went wrong!</div>;

  return (
    <div className="w-full px-2 md:w-10/12 mx-auto py-20">
      <h2 className="text-3xl font-bold text-center text-[#4335A7] mb-8">Articles</h2>
 
  
      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start  mb-6">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 border rounded-md ${darkMode ? "bg-black border-gray-300  text-white": "text-black border-[#5544d9]" }`}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`p-2 border  rounded-md ${darkMode ? "bg-black border-gray-300  text-white": "text-black border-[#5544d9]" }`}
        >
          <option value="">Select Category</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Oncology">Oncology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Hematology">Hematology</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="Immunology">Immunology</option>
          <option value="Rheumatology">Rheumatology</option>
          <option value="Infectious Diseases">Infectious Diseases</option>
          <option value="Urology">Urology</option>
          <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
          <option value="Ophthalmology">Ophthalmology</option>
          <option value="ENT">ENT</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Surgery">Surgery</option>
        </select>
      </div>

      {/* Articles List */}
      <div>
        {filteredArticles?.map((article) => {
          const { _id, title, content, images, author, tags, createdAt, category, comments,loveCount, lovedBy } = article;
          return (
            <div
            
            data-aos="fade-up"
     data-aos-duration="500"
            key={_id} className="my-12">
              <h3 className="text-3xl my-4 font-semibold text-[#4335A7]">{title}</h3>
              <div className="flex flex-wrap items-center gap-2 my-2">
                <div>
                <p className="text-md rounded-lg p-2 bg-[#4335A7] w-fit text-white">
                  <FaPenNib  className="inline mr-1"/>
                   {author}
                </p>
                </div>
               <div>
               <p className="text-md rounded-lg p-2 bg-[#4335A7] w-fit text-white">
                  <FaTag className="inline mr-1" /> {category}
                </p>
               </div>
               <div>
               <p className="text-md rounded-lg p-2 bg-[#4335A7] w-fit text-white">
                  <FaClock className="inline mr-1" /> {new Date(createdAt).toLocaleDateString()}
                </p>
               </div>
             <div className="flex flex-wrap gap-2">
             {tags.split(",").map((item, index) => {
                const colors = [
                  "bg-pink-200",
                  "bg-blue-200",
                  "bg-yellow-200",
                  "bg-green-200",
                  "bg-indigo-200",
                  "bg-red-200",
                  "bg-purple-200",
                  "bg-teal-200",
                  "bg-orange-200",
                  "bg-lime-200"
                ];

                // Get a color for each tag dynamically based on index
                const tagColor = colors[index % colors.length]; // Use modulo to cycle through colors

                return (
                  <span
                    className={`${tagColor} p-2 rounded-xl text-black text-[12px]`}
                    key={item}
                  >
                    #{item}
                  </span>
                );
              })}
             </div>
              </div>

             

              {/* Swiper for images */}
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2500, // Delay between slides in milliseconds
                  disableOnInteraction: false, // Continue autoplay even after user interaction
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Image ${index + 1}`} className="w-full h-[300px] object-contain rounded-lg my-2" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Render content as markdown */}
              <div className="mt-4 text-justify">
            <ReactMarkdown
              children={content}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const language = className?.replace("language-", "") || "";
                  return !inline ? (
                    <SyntaxHighlighter style={docco} language={language} {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props}>{children}</code>
                  );
                },
              }}
            />
          </div>


           
              <div className="flex flex-col md:flex md:flex-col md:justify-between mt-4">
                <div className="flex items-center">
                  
                  <span className="font-bold text-red-500 px-2">{loveCount}</span>
                {
                 lovedBy.includes(email) ?  <div className="">
                  <span className=" text-gray-600 text-2xl px-2">♥️</span> 
                 </div> : <>
                      <button
                    onClick={() => handleLove(_id)}
                    className={`py-2 px-2`}
                  >
                    <FaRegHeart className="text-2xl   hover:text-red-500 hover:scale-110 transition-all duration-300" />
             
                  </button>
                 </>
                  
                }
             
                  
               
                  {/* share */}

                  <ShareButton
                articleId={_id}
                articleTitle={title}
                image={images[0]}
                articleUrl={`https://be-healthy-by-mostafiz.netlify.app/article`}
                
              />




                </div>

                {/* Comment Section */}
                <div className="flex flex-wrap items-center gap-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={`w-full p-4 mt-2 border border-gray-300 rounded-md  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}
                  ></textarea>
                  <button
                    onClick={() => handleCommentSubmit(_id)}
                   className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    Submit Comment
                  </button>

                  <button
                onClick={() => handleToggle(0)} // Toggle for comments accordion
                className="text-[#4335A7] w-fit py-1 px-6 text-lg  font-semibold  flex items-center border-2 rounded-full border-[#4335A7] hover:text-[#5544d9] hover:border-[#5544d9]"
              >
                See Comments <span className="ml-2">▼</span>
              </button>
                </div>
              </div>

                {/* comment section */}
                
                <div className="mt-8">
     

          <div
            className={`transition-all duration-300 ${open === 0 ? "max-h-screen" : "max-h-0"} overflow-hidden`}
          >
            {comments?.map((comment, index) => (
              <div
                key={index}
                className={`mb-4 p-4  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"} rounded-md shadow-md`}
              >
                <p className="font-semibold">{comment.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>



            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Article;
