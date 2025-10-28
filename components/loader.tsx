"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-[9999]">
      <DotLottieReact
        src="/animations/loader.lottie" // taruh file .lottie di public/animations
        loop
        autoplay
        speed={3}
        // style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Loader;
