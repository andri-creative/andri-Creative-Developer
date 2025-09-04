"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ImageItem {
  gambar: string;
}

interface StackedCarouselProps {
  images: ImageItem[];
}

export function StackedCarousel({ images }: StackedCarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  // Fix hydration mismatch
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Handle swipe/drag
  const handleInteractionStart = (clientX: number, clientY: number) => {
    setStartPos({ x: clientX, y: clientY });
    setIsDragging(false);
  };

  const handleInteractionEnd = (clientX: number, clientY: number) => {
    const diffX = startPos.x - clientX;
    const diffY = Math.abs(startPos.y - clientY);
    const threshold = 50;

    // Only trigger if horizontal movement is greater than vertical (proper swipe)
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > diffY) {
      setIsDragging(true);
      if (diffX > 0) {
        nextSlide(); // Swipe left = next
      } else {
        prevSlide(); // Swipe right = prev
      }
    }
  };

  // Prevent render until client side
  if (!isClient) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-8">
        <div className="relative w-full max-w-sm h-80 flex items-center justify-center">
          <Card className="w-52 h-72">
            <CardContent className="animate-pulse bg-muted w-full h-full rounded-lg" />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm">
      {/* Stack Container */}
      <div
        className="relative h-64 w-full flex items-center justify-center select-none"
        onTouchStart={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          handleInteractionStart(touch.clientX, touch.clientY);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          const touch = e.changedTouches[0];
          handleInteractionEnd(touch.clientX, touch.clientY);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          handleInteractionStart(e.clientX, e.clientY);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          handleInteractionEnd(e.clientX, e.clientY);
        }}
      >
        {images.map((item, i) => {
          // Hitung posisi relatif
          let position = i - current;

          // Handle circular positioning
          if (position > images.length / 2) {
            position -= images.length;
          } else if (position < -images.length / 2) {
            position += images.length;
          }

          // Tentukan style berdasarkan posisi
          let style = {};
          let zIndex = 1;
          let opacity = 0;

          if (position === 0) {
            // Gambar aktif - di depan
            style = {
              transform:
                "scale(1) translateX(0px) translateY(0px) rotate(0deg)",
            };
            zIndex = 10;
            opacity = 1;
          } else if (position === 1) {
            // Gambar selanjutnya - di belakang kanan
            style = {
              transform:
                "scale(0.9) translateX(35px) translateY(20px) rotate(8deg)",
            };
            zIndex = 5;
            opacity = 0.6;
          } else if (position === -1) {
            // Gambar sebelumnya - di belakang kiri
            style = {
              transform:
                "scale(0.9) translateX(-35px) translateY(20px) rotate(-8deg)",
            };
            zIndex = 5;
            opacity = 0.6;
          } else {
            // Gambar lainnya - disembunyikan
            style = {
              transform: `scale(0.8) translateX(${
                position > 0 ? 80 : -80
              }px) translateY(40px)`,
            };
            zIndex = 1;
            opacity = 0;
          }

          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                zIndex,
                opacity,
                ...style,
              }}
            >
              <Card
                className={`w-40 h-60 overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 ${
                  position !== 0 ? "cursor-pointer" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (position !== 0 && !isDragging) {
                    goToSlide(i);
                  }
                }}
              >
                <CardContent className="p-0 relative w-full h-full">
                  <Image
                    src={item.gambar}
                    fill
                    alt={`Gambar ${i + 1}`}
                    className="object-cover"
                    sizes="100px"
                    priority={i === 0}
                  />
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
