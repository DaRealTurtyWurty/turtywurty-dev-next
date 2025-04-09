"use client";

import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTitle} from "@/shadcn/components/ui/dialog";
import {Button} from "@/shadcn/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface GalleryImageDisplayProps {
    title: string;
    images: string[];
}

export default function GalleryImageDisplay({ title, images }: GalleryImageDisplayProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handlePrevious = useCallback(() => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    }, [selectedImageIndex]);

    const handleNext = useCallback(() => {
        if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    }, [selectedImageIndex, images.length]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedImageIndex === null) return;

            if (event.key === "ArrowLeft") {
                handlePrevious();
            } else if (event.key === "ArrowRight") {
                handleNext();
            } else if (event.key === "Escape") {
                setSelectedImageIndex(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrevious, handleNext, selectedImageIndex]);

    const renderImages = () => {
        const imageCount = images.length;

        if (imageCount === 1) {
            // Single image - full size
            return (
                <div className="relative h-48 cursor-pointer"
                     onClick={() => setSelectedImageIndex(0)}>
                    <Image
                        src={images[0]}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        }

        if (imageCount === 2) {
            // Two images - split horizontally
            return (
                <div className="grid grid-cols-2 h-48">
                    {images.map((imgSrc, index) => (
                        <div key={index} className="relative cursor-pointer"
                             onClick={() => setSelectedImageIndex(index)}>
                            <Image
                                src={imgSrc}
                                alt={`${title} - image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        }

        if (imageCount === 3) {
            // Three images - 3-way split
            return (
                <div className="grid grid-cols-2 h-48">
                    <div className="relative row-span-2 cursor-pointer"
                         onClick={() => setSelectedImageIndex(0)}>
                        <Image
                            src={images[0]}
                            alt={`${title} - image 1`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative h-24 cursor-pointer"
                         onClick={() => setSelectedImageIndex(1)}>
                        <Image
                            src={images[1]}
                            alt={`${title} - image 2`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative h-24 cursor-pointer"
                         onClick={() => setSelectedImageIndex(2)}>
                        <Image
                            src={images[2]}
                            alt={`${title} - image 3`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            );
        }

        // Four or more images - 2x2 grid
        const displayImages = images.slice(0, 4);
        return (
            <div className="grid grid-cols-2 h-48">
                {displayImages.map((imgSrc, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                    >
                        {index === 3 && imageCount > 4 ? (
                            <div className="relative h-full">
                                <Image
                                    src={imgSrc}
                                    alt={`${title} - image 4`}
                                    fill
                                    className="object-cover brightness-50 blur-xs"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                                    {imageCount - 4} more...
                                </div>
                            </div>
                        ) : (
                            <Image
                                src={imgSrc}
                                alt={`${title} - image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return <>
        {renderImages()}
        <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
            <DialogContent className="w-max max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <DialogTitle className="text-2xl font-semibold">
                    {title}
                </DialogTitle>
                {selectedImageIndex !== null && (
                    <div className="flex flex-col items-center justify-center mt-4">
                        <div className="flex items-center justify-center relative gap-4">
                            {images.length > 1 && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className=""
                                    onClick={handlePrevious}
                                    disabled={selectedImageIndex === 0}
                                >
                                    <ChevronLeft className="h-6 w-6"/>
                                </Button>)}
                            <div className="relative">
                                <Image
                                    src={images[selectedImageIndex]}
                                    alt={`${title} - image ${selectedImageIndex + 1}`}
                                    width={1200}
                                    height={800}
                                    className="object-contain max-h-[90vh] w-full"
                                />
                            </div>
                            {images.length > 1 && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className=""
                                    onClick={handleNext}
                                    disabled={selectedImageIndex === images.length - 1}
                                >
                                    <ChevronRight className="h-6 w-6"/>
                                </Button>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div
                                className="mt-4 text-gray-600 dark:text-gray-300 text-lg font-semibold bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                                {selectedImageIndex + 1} / {images.length}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    </>
}