import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import CustomInstance from "../../lib/axios";

function urlType(url) {
    // Define common video and image file extensions
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
  
    // Get the file extension from the URL
    const fileExtension = url.split('.').pop().toLowerCase();
  
    // Check if the file extension matches a video extension
    if (videoExtensions.includes(`.${fileExtension}`)) {
      return 'video';
    }
  
    // Check if the file extension matches an image extension
    if (imageExtensions.includes(`.${fileExtension}`)) {
      return 'image';
    }
  
    // If it doesn't match either, return null (unknown)
    return null;
  }
  


function FileUpload({updater}) {
    const [selectedFile, setSelectedFile] = useState(null);
    // Function to handle file selection
    const handleFileSelect = async (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            console.log(file)
            try {
                const response = await CustomInstance.post("/api/fileup",formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(response.data);
                const obj ={url :  response.data[0],type : urlType(response.data[0])};
                updater(obj);
            } catch (error) {
                // Handle network errors here
                console.error("Network error:", error);
            }
        }
    };
    // Function to handle file upload
    return (
        <div>
            <Input
                type="file"
                onChange={handleFileSelect}
                accept=".jpg, .jpeg, .png, .gif, .mp4" // Specify accepted file types (optional)
            />
        </div>
    );
}
export default FileUpload;