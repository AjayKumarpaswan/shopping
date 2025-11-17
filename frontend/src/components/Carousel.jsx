import React, { useState, useEffect } from "react";

const images = [
  "/assets/firstc.jpg",
  "/assets/secondc.jpg",
  "/assets/thirdc.jpg",
  "/assets/fourthc.avif",
  "/assets/fifthc.avif",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-[80px] sm:mt-[200px] md:mt-[100px]">
      {/* Image container */}
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots BELOW the image */}
      <div className="relative flex justify-center gap-2 py-4">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === current ? "bg-black scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
