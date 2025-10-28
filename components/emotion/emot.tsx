"use client";

import { useState, useRef, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import Lottie from "lottie-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerContentCustom,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import sad from "@/public/emot/1.json";
import confused from "@/public/emot/2.json";
import neutral from "@/public/emot/3.json";
import happy from "@/public/emot/4.json";
import love from "@/public/emot/5.json";
import starIcon from "@/public/emot/Star.json"

export default function EmotPage() {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [flyingEmoticons, setFlyingEmoticons] = useState<
    { id: number; emoticon: string; x: number; y: number }[]
  >([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedEmoticon, setSelectedEmoticon] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState<any>(null);

  const setButtonRef = (index: number) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[index] = el;
  };

  const emoticons = [
    { icon: "😢", anim: sad },
    { icon: "😕", anim: confused },
    { icon: "😐", anim: neutral },
    { icon: "😊", anim: happy },
    { icon: "😍", anim: love },
  ];

  const labels = ["Very Bad", "Bad", "Neutral", "Good", "Very Good"];

  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        setOpenDialog(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [openDialog]);

  const handleRatingSubmit = async (rating: number) => {
    try {
      const res = await fetch("/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan rating");
    } catch (error) {
      console.error("❌ Error saat menyimpan rating:", error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex items-center justify-center h-16 w-16">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setDrawerOpen(true)}
              className="relative overflow-visible h-16 w-16 p-3 rounded-full border bg-blue-50 border-blue-200"
            >
              <span className="text-3xl transition-all duration-1000 ease-out inline-block">
               <Lottie
                  animationData={starIcon}
                  loop={true}
                  className="w-16"
                />
              </span>
            </Button>
          </DrawerTrigger>

          <DrawerContentCustom className="bg-transparent border-none shadow-none data-[state=open]:animate-none">
            <div className="mx-auto w-full h-full flex flex-col justify-between">
              {/* BAGIAN RATING */}
              <div className="bg-background w-full h-1/2 flex flex-col items-center justify-end gap-6 py-6 border-t border-border">
                <DrawerHeader>
                  <DrawerTitle className="text-foreground">
                    Give Your Rating
                  </DrawerTitle>
                  <DrawerDescription className="text-muted-foreground">
                    Choose an emoji that reflects your experience
                  </DrawerDescription>
                </DrawerHeader>

                <div className="grid grid-cols-5 gap-4 place-items-center">
                  {emoticons.map((item, index) => {
                    const value = index + 1;
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <button
                          ref={setButtonRef(index)}
                          type="button"
                          className={`h-16 w-16 text-2xl rounded-full border flex items-center justify-center transition-all
                  ${
                    value <= (hover || rating)
                      ? "bg-blue-500 text-white scale-110 border-blue-600 shadow-lg"
                      : "bg-muted text-muted-foreground border-border hover:bg-blue-200 hover:text-blue-700 hover:scale-105"
                  }`}
                          onClick={() => {
                            setRating(value);
                            setSelectedEmoticon(item.icon);
                            setSelectedAnimation(item.anim);
                            handleRatingSubmit(value);
                            setDrawerOpen(false);
                            setTimeout(() => setOpenDialog(true), 250);
                            setRating(0);
                            setHover(0);
                          }}
                          onMouseEnter={() => setHover(value)}
                          onMouseLeave={() => setHover(0)}
                        >
                          {item.icon}
                        </button>
                        <span className="text-xs text-muted-foreground mt-2">
                          {labels[index]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-sm text-muted-foreground">
                  {rating > 0
                    ? `Rating: ${rating} / 5 - ${emoticons[rating - 1].icon}`
                    : "Pilih rating 1-5 emoticon"}
                </div>
              </div>

              {/* EMOJI TERBANG */}
              {flyingEmoticons.map((item) => (
                <div
                  key={item.id}
                  className="absolute text-4xl animate-fly-to-center-large pointer-events-none"
                  style={{ left: item.x, top: item.y }}
                >
                  {item.emoticon}
                </div>
              ))}
            </div>
          </DrawerContentCustom>
        </Drawer>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[260px] p-0 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:hidden">
            <DialogTitle className="animate-drop-emoji">
              {selectedAnimation && (
                <Lottie
                  animationData={selectedAnimation}
                  loop={true}
                  className="w-[160px] h-[160px]"
                />
              )}
            </DialogTitle>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
