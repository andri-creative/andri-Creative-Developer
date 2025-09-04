"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [count, setCount] = useState(5);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // kasih efek fade-out sebelum redirect
      setFadeOut(true);
      setTimeout(() => router.push("/home"), 1000);
    }
  }, [count, router]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center justify-center h-screen text-white overflow-hidden"
        >
          {/* Background gradient animasi lebih soft */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-800 to-gray-900 animate-gradient-x" />

          {/* Lingkaran dekorasi blur */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-3xl -top-20 -left-20"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl bottom-10 right-10"
          />

          {/* Konten utama dengan efek glass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="z-10 px-10 py-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl text-center"
          >
            <motion.h1
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Portfolio Andri
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl mb-6 text-gray-200"
            >
              Halaman akan terbuka sebentar lagi 🚀
            </motion.p>

            {/* Countdown lingkaran modern */}
            <motion.div
              key={count}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-24 h-24 rounded-full border-4 border-blue-400 flex items-center justify-center mx-auto text-3xl font-bold text-blue-300 shadow-lg"
            >
              {count}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
