"use client";

import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type PageProps = {
  children?: React.ReactNode;
  number?: string | number;
};

const PageCover = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>((props, ref) => {
  return (
    <div
      className="cover bg-[linear-gradient(to_right,rgba(59,130,246,1),rgba(255,255,255,0.8)),linear-gradient(to_bottom,rgba(30,64,175,1),rgba(147,197,253,1))] [background-blend-mode:multiply]"
      ref={ref as React.RefObject<HTMLDivElement>}
      data-density="hard"
    >
      <div className="w-full h-full">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

PageCover.displayName = "PageCover";

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="page px-4 py-4 relative w-full h-full mx-auto bg-gray-200" ref={ref}>
      <div className=" w-full h-full flex flex-col justify-center items-center">
        {props.children}
      </div>
    </div>
  );
});

Page.displayName = "Page";

export default function MyAlbum() {
  const [size, setSize] = useState({ width: 550, height: 850 });

  const albumData = [
    {
      page: 1,
      images: [
        { src: "/foto/01.png", className: "heart-img", position: "center" },
        { src: "/foto/01.png", className: "pentagon-img", position: "end" },
        { src: "/foto/01.png", className: "basis", position: "start" },
      ],
    },
    {
      page: 2,
      images: [
        { src: "/foto/01.png", className: "explosion-8", position: "center" },
        { src: "/foto/02.png", className: "heart-img", position: "end" },
        { src: "/foto/03.png", className: "diamond-shield", position: "start" },
      ],
    },
    {
      page: 3,
      images: [
        { src: "/foto/01.png", className: "explosion-8", position: "center" },
        { src: "/foto/02.png", className: "heart-img", position: "end" },
        { src: "/foto/03.png", className: "diamond-shield", position: "start" },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // HP kecil
        setSize({ width: 315, height: 420 });
      } else if (screenWidth < 768) {
        // HP besar (misalnya iPhone Plus)
        setSize({ width: 380, height: 500 });
      } else if (screenWidth < 1024) {
        // Tablet (iPad, dll) → dibesarin sedikit
        setSize({ width: 500, height: 650 });
      } else {
        // Desktop
        setSize({ width: 550, height: 750 });
      }
    };

    handleResize(); // panggil sekali waktu load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" min-h-screen flex flex-col items-center py-10">
      <HTMLFlipBook
        width={size.width}
        height={size.height}
        minWidth={315}
        maxWidth={1000}
        minHeight={500}
        maxHeight={1500}
        showCover={true}
        flippingTime={1000}
        style={{ margin: "0 auto" }}
        maxShadowOpacity={0.5}
        className="album-web"
      >
        <PageCover>
          <div className=" h-full w-full p-1 flex flex-col justify-between gap-5">
            <div className="flex justify-end">
              <Image
                src="/bg/01.svg"
                width={100}
                height={100}
                alt="Cover"
                className="object-cover w-24 h-24 md:w-36 md:h-36 lg:w-52 lg:h-52"
              />
            </div>
            <div>
              <h1 className="font-perfectly-rainbow  text-4xl text-gray-200">
                Welcome to Photo Technology
              </h1>
            </div>
            <div className="p-6 justify-end">
              <div className=" p-2 relative">
                <div className="bg-gray-200 text-gray-800 font-itsmehello text-4xl">
                  A . L . B . U . M
                </div>
              </div>
            </div>
          </div>
        </PageCover>

        {albumData.map((page, pageIndex) => (
          <Page key={pageIndex} number={page.page}>
            {page.images.map((img, imgIndex) => (
              <div
                key={imgIndex}
                className={`flex justify-${img.position} w-full mx-auto `}
              >
                <Image
                  src={img.src}
                  width={200}
                  height={80}
                  alt={`foto-${pageIndex}-${imgIndex}`}
                  className={`${img.className} object-cover w-32 sm:w-36 md:w-48 lg:w-44 xl:w-52 h-auto object-top`}
                />
              </div>
            ))}
          </Page>
        ))}

        <PageCover></PageCover>
        <PageCover></PageCover>
      </HTMLFlipBook>
    </div>
  );
}
