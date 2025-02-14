"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image"

interface ImageUploadProps {
    onImageUpload: (url: string) => void
    value?: string
}

const Upload = ({ onImageUpload, value }: ImageUploadProps) => {
    //states
    const [preview, setPreview] = useState<string | null>(value || null)
    const [isUploading, setIsUploading] = useState(false)

    //handle drag&drop
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            if (!file) return

            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            setIsUploading(true)

            try {
                const formData = new FormData()
                formData.append("file", file)
                formData.append("upload_preset", "ticketGen")

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dswi7h0dg/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    },
                )

                if (!response.ok) {
                    console.log(response)
                    throw new Error("Upload failed")
                }

                const data = await response.json()
                onImageUpload(data.secure_url)
                setPreview(data.secure_url)
            } catch (error) {
                console.error("Upload failed:", error)
            } finally {
                setIsUploading(false)
            }
        },
        [onImageUpload],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
        },
        maxFiles: 1,
    })

    return (
        <section className="border border-1 h-fit text-[#FAFAFA] border-[#0E464F] rounded-[15px] bg-[#04191e43] md:p-[24px] p-[15px]">
            <p className='text-left md:text-base text-[14px]'>Upload Profile Photo</p>
            <div className="md:py-[30px]">
                <div className="relative md:h-[150px] bg-[#041316df]">
                    <div
                        {...getRootProps()}
                        className='bg-[#0E464F] md:mt-0 mt-[10px] md:absolute left-[130px] flex items-center justify-center text-center md:top-[-15px] top-0 border-2 border-[#24A0B5] rounded-[20px] md:w-[45%] h-[190px]'
                    >
                        <input {...getInputProps()} />
                        <div className="w-full h-full">
                            {preview ? (
                                <div className="w-full h-full">
                                    <Image
                                        src={preview || ""}
                                        alt="Preview"
                                        className={`w-full h-full object-cover rounded-[20px] ${isUploading ? "opacity-15" : ''}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    {
                                        isDragActive ?
                                            <AiOutlineCloudUpload size={45} className='transition duration-300 ease-in-out scale-110' /> :
                                            <div className='flex transition duration-300 ease-in-out  flex-col items-center'>
                                                <AiOutlineCloudUpload size={25} />
                                                <p className='text-[14px] mt-[10px]'>Drag & drop, or click to upload</p>
                                            </div>
                                    }
                                </div>
                            )}
                        </div>
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Upload