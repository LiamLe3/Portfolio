import { useRef, useEffect, useState } from "react";

function ProjectImages({images}) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  const pressed = useRef(false);
  const startX = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemCount = images.length;

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    const itemWidth = container.offsetWidth;

    const handleDown = (clientX) => {
      pressed.current = true;
      startX.current = clientX - inner.offsetLeft;
      inner.style.transition = "none";
      container.style.cursor = "grabbing"
    };

    const handleMove = (clientX) => {
      if (!pressed.current) return;
      let newLeft = clientX - startX.current;

      // Clamp the carousel so it doesn't scroll past left-most image
      // or right-most image
      const leftMost = 0;
      const rightMost = -(itemCount - 1) * itemWidth;

      inner.style.left = `${Math.max(Math.min(newLeft, leftMost), rightMost)}px`;
    }

    const handleUp = () => {
      if (pressed.current) snapToNearest();
      pressed.current = false;
      container.style.cursor = "grab";
    }

    const snapToNearest = () => {
      const left = parseInt(inner.style.left);
      const index = Math.round(-left / itemWidth);

      const newIndex = Math.max(0, Math.min(itemCount - 1, index));
      setCurrentIndex(newIndex);

      inner.style.transition = "0.3s ease";
      inner.style.left = `-${newIndex * itemWidth}px`;
    }

    const mouseDown = (e) => handleDown(e.clientX);
    const mouseMove = (e) => handleMove(e.clientX);

    container.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", handleUp);

    const touchStart = (e) => handleDown(e.touches[0].clientX);
    const touchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    container.addEventListener("touchstart", touchStart, { passive: false });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", handleUp);

      container.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  const goToSlide = (index) => {

    const itemWidth = containerRef.current.offsetWidth;
    setCurrentIndex(index);

    innerRef.current.style.transition = "0.3s ease";
    innerRef.current.style.left = `-${index * itemWidth}px`;
  };

  return (
    <div ref={containerRef} className="w-[500px] h-[500px] bg-red-500 rounded-2xl overflow-hidden relative m-auto">
      <div className="flex h-full items-center">
        <div ref={innerRef} className="absolute w-max flex">
          {images.map((imageSrc, i) => (
            <div key={i} className="w-[500px] max-w-[100vw] h-full">
              <img src={imageSrc} className="w-full h-full object-cover" onDragStart={(e) => e.preventDefault()} />
            </div>
          ))}
        </div>
        <div className="absolute text-center z-10 bottom-0 right-0 left-0">
          {images.map((_, i) => (
            <span 
              key={i} 
              className={`inline-flex bg-white border border-pink-300 rounded-full h-2 mx-2 cursor-pointer
                          transition-all duration-300
                          ${currentIndex === i ? "w-4 opacity-100" : "w-2 opacity-70"}`} 
              onClick={() => goToSlide(i)}>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectImages;