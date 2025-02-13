// // 'use s'
// 'use client'
// import { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone'; 
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBIC_CLOUD_NAME,
//     api_key: process.env.NEXT_PUBLIC_API_KEY,
//     api_secret: process.env.NEXT_PUBLIC_API_SECRET
// });

// const ImageUpload = () => {
//   const [imageUrl, setImageUrl] = useState('');

//   const onDrop = useCallback(
//     async (acceptedFiles) => {
//       if (acceptedFiles && acceptedFiles.length > 0) {
//         const file = acceptedFiles[0]; 
//         try {
//           const uploadResult = await cloudinary.uploader.upload(file); 
//           setImageUrl(uploadResult.secure_url);
//         } catch (error) {
//           console.error('Error uploading image:', error);
//         }
//       }
//     },
//     []
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return { 
//     imageUrl, 
//     getRootProps, 
//     getInputProps, 
//     isDragActive 
//   };
// };

// export default ImageUpload;