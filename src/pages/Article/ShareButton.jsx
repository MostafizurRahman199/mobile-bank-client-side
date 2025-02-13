import React, { useState } from "react";
import { FaShareAlt, FaWhatsapp } from "react-icons/fa"; // Icons for social media
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"; // Material Tailwind Dialog
import { toast } from 'react-toastify'; // For showing the success message when the link is copied

const ShareButton = ({ articleId, articleTitle, articleUrl, image }) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState("Copy link"); // Initial state for the copied link button

  const generateLink = () => {
    const urlToShare = articleUrl ;
    setLink(urlToShare);
   
  };

  const handleOpen = () => {
    setOpen(!open);
    generateLink();
   
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied("Copied Now Share 😊")
  };

  return (
    <div className="flex flex-col items-center">
      {/* Share button */}
      <button onClick={handleOpen} className="flex text-[#4335A7] items-center space-x-2 py-2 px-2 rounded-lg">
        <FaShareAlt className="text-xl  hover:text-[#5544d9] hover:scale-110 transition-all duration-300" />
      </button>

      {/* Modal */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className={`text-center text-[#4335A7] text-2xl font-semibold`}>
          Share this Article
        </DialogHeader>
        <DialogBody className="space-y-4">
          <p className="text-sm text-gray-700">
            Share this article with your friends on social media or copy the link.
          </p>

          {/* Social Media Share Links */}
          <div className="flex flex-col space-y-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(articleTitle)}%20${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="text-xl" />
              <span>Share on WhatsApp</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
            >
              <span>{copied}</span>
            </button>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ShareButton;
