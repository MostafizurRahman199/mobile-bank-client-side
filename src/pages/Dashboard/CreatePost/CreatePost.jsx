import React, { useState } from 'react';
import { uploadToImageBB } from '../../../utils/imagebb';
import Swal from 'sweetalert2';
import ApiComponent from '../../../API/ApiComponent';
import { useMutation } from '@tanstack/react-query';
import Spinner from '../../../components/Spinner/Spinner';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const CreatePost = () => {

  const {uploadArticle} = ApiComponent();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [photos, setPhotos] = useState([]);





  
  const uploadArticleMutation = useMutation({
    
    mutationFn: (data) => uploadArticle(data), 
     onSuccess: () => {
       Swal.fire({
         icon: "success",
         title: "Article created Successfully!",
         showConfirmButton: false,
         timer: 1500,
       });
      
       setLoading(false);
       setTitle("");
       setCategory("");
       setContent("");
       setTags("");
       setAuthor("");
       setPhotos([])

     },
     onError: () => {
       Swal.fire({
         icon: "error",
         title: "Error to upload Article",
         text: "Something went wrong. Please try again later.",
         showConfirmButton: false,
         timer: 1500,
       });
       setLoading(false);
     },
   });
 
 



  // Handle the file upload for multiple images
  const handleFileChange = async (e) => {
    setLoading(true);
    const files = e.target.files;
    const fileUrls = [];

    for (let i = 0; i < files.length; i++) {
      const photo = files[i];
      const photoURL = await uploadToImageBB(photo);
      fileUrls.push(photoURL);
    }

    setPhotos(fileUrls);
    setLoading(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
      const postData = {
        title,
        category,
        content,
        tags,
        author,
        images: photos,
        createdAt : new Date(),
        loveCount: 0,
        lovedBy : [],
        comments: [],
      };

      // Handle the post submission (e.g., saving data to the database)
      console.log(postData);
      // setLoading(true);
      uploadArticleMutation.mutate(postData);

  };

  return (
    <div className="w-full md:w-10/12 mx-auto py-12">
      <SectionHeading title2={"Post An Article"}></SectionHeading>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-xl space-y-6">
        {/* Title Input */}
        <div>
          <label className="text-lg font-semibold text-[#4335A7]" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="text-lg font-semibold text-[#4335A7]" htmlFor="category">Category</label>
          <select
            id="category"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Cardiology">Cardiology (Heart-related diseases)</option>
            <option value="Neurology">Neurology (Brain and nervous system)</option>
            <option value="Orthopedics">Orthopedics (Bone and joint disorders)</option>
            <option value="Pediatrics">Pediatrics (Children's health)</option>
            <option value="Oncology">Oncology (Cancer treatments)</option>
            <option value="Dermatology">Dermatology (Skin conditions)</option>
            <option value="Endocrinology">Endocrinology (Hormonal and metabolic diseases)</option>
            <option value="Pulmonology">Pulmonology (Lung and respiratory diseases)</option>
            <option value="Gastroenterology">Gastroenterology (Digestive health)</option>
            <option value="Hematology">Hematology (Blood disorders)</option>
            <option value="Psychiatry">Psychiatry (Mental health disorders)</option>
            <option value="Immunology">Immunology (Immune system diseases)</option>
            <option value="Rheumatology">Rheumatology (Autoimmune diseases)</option>
            <option value="Infectious Diseases">Infectious Diseases (Viral, bacterial, etc.)</option>
            <option value="Urology">Urology (Urinary and kidney health)</option>
            <option value="Obstetrics and Gynecology">Obstetrics and Gynecology (Women's health)</option>
            <option value="Ophthalmology">Ophthalmology (Eye health)</option>
            <option value="ENT">ENT (Ear, Nose, and Throat)</option>
            <option value="General Medicine">General Medicine (Primary health care)</option>
            <option value="Surgery">Surgery (Medical procedures)</option>
          </select>
        </div>

        {/* Content Textarea */}
        <div>
          <label className="text-lg font-semibold text-[#4335A7]" htmlFor="content">Content</label>
          <textarea
            id="content"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
            placeholder="Write your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Tags Input */}
        <div>
          <label className="text-lg font-semibold text-[#4335A7]" htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Author Input */}
        <div>
          <label className="text-lg font-semibold text-[#4335A7]" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
            placeholder="Enter author's name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-lg font-semibold text-[#4335A7]" htmlFor="image">Upload Image(s)</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            multiple
            className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
            onChange={handleFileChange}
          />
            {photos.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {photos.map((photoUrl, index) => (
              <div key={index} className="w-32 h-32 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={photoUrl}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
           className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
           {
            loading ? <Spinner></Spinner> : 'Create Post'
           }
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
