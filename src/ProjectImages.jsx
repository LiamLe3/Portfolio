import { useRef, useEffect, useState } from "react";

function ProjectImages({images}) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  const pressed = useRef(false);
  const startX = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = useRef(0);

  const lastX = useRef(0);
  const lastTime = useRef(0);
  let velocity = 0;
  const getCurrentTranslateX = () => {
    const style = window.getComputedStyle(innerRef.current);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41 || 0;
  }

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    itemWidth.current = container.offsetWidth;

    const handleDown = (clientX) => {
      pressed.current = true;
      startX.current = clientX - getCurrentTranslateX();
      inner.style.transition = "none";
      container.style.cursor = "grabbing"
    };

    const handleMove = (clientX) => {
      if (!pressed.current) return;
      const now = performance.now();
      const deltaX = clientX - lastX.current;
      const deltaTime = now - lastTime.current;

      if(deltaTime > 0) {
        velocity = deltaX / deltaTime;
      }
      lastX.current = clientX;
      lastTime.current = now;

      let newX = clientX - startX.current;

      const leftMost = 0;
      const rightMost = -(images.length - 1) * itemWidth.current;
      newX = Math.max(Math.min(newX, leftMost), rightMost);

      inner.style.transform = `translateX(${newX}px)`;
    }

    const handleUp = () => {
      if (pressed.current) snapToNearest();
      pressed.current = false;
      container.style.cursor = "grab";
    }

    const snapToNearest = () => {
      const currentX = getCurrentTranslateX();
      let index = Math.round(-currentX / itemWidth.current);

      const threshold = 0.5;
      if (Math.abs(velocity) > threshold) {
        if (velocity < 0) {
          index = Math.min(index + 1, images.length - 1);
        } else {
          index = Math.max(index - 1, 0);
        }
      }

      const newIndex = Math.max(0, Math.min(images.length - 1, index));
      setCurrentIndex(newIndex);

      inner.style.transition = "transform 0.3s ease";
      inner.style.transform = `translateX(-${newIndex * itemWidth.current}px)`;

      velocity = 0;
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
    
    const resizeObserver = new ResizeObserver(() => {
      itemWidth.current = container.offsetWidth;
      inner.style.transition = "none";
      inner.style.transform = `translateX(-${currentIndex * itemWidth.current}px)`;
    });

    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", handleUp);

      container.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", handleUp);

      resizeObserver.disconnect();
    };
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    innerRef.current.style.transition = "transform 0.3s ease";
    innerRef.current.style.transform = `translateX(-${index * itemWidth.current}px)`;
  };

  return (
    <div ref={containerRef} className="w-[500px] h-[500px] bg-red-500 rounded-2xl overflow-hidden relative m-auto">
      <div className="flex h-full items-center">
        <div ref={innerRef} className="absolute w-max flex">
          {images.map((imageSrc, i) => (
            <div key={i} className="w-[500px] max-w-[100vw] h-full">
              <img src={imageSrc} loading="lazy" className="w-full h-full object-cover" onDragStart={(e) => e.preventDefault()} />
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