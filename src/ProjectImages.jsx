import { useRef, useEffect, useState } from "react";

function ProjectImages({images}) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  const pressed = useRef(false);
  const startX = useRef(0);
  const itemWidth = useRef(0);

  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
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
      setIsAnimating(false);
      setIsDragging(true);
    };

    const handleMove = (clientX) => {
      if (!pressed.current) return;
      const now = performance.now();
      const deltaX = clientX - lastX.current;
      const deltaTime = now - lastTime.current;

      if(deltaTime > 0) {
        velocity.current = deltaX / deltaTime;
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
      setIsDragging(false);
    }

    const snapToNearest = () => {
      const currentX = getCurrentTranslateX();
      let index = Math.round(-currentX / itemWidth.current);

      const threshold = 0.5;
      if (Math.abs(velocity.current) > threshold) {
        if (velocity.current < 0) {
          index = Math.min(index + 1, images.length - 1);
        } else {
          index = Math.max(index - 1, 0);
        }
      }

      const newIndex = Math.max(0, Math.min(images.length - 1, index));
      setCurrentIndex(newIndex);

      setIsAnimating(true);
      inner.style.transform = `translateX(-${newIndex * itemWidth.current}px)`;

      velocity.current = 0;
    }

    const mouseDown = (e) => handleDown(e.clientX);
    const mouseMove = (e) => handleMove(e.clientX);

    const touchStart = (e) => handleDown(e.touches[0].clientX);
    const touchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    
    const events = [
      [container, "mousedown", mouseDown],
      [window, "mousemove", mouseMove],
      [window, "mouseup", handleUp],
      [container, "touchstart", touchStart, { passive: false }],
      [window, "touchmove", touchMove, { passive: false }],
      [window, "touchend", handleUp],
    ];

    const resizeObserver = new ResizeObserver(() => {
      itemWidth.current = container.offsetWidth;
      setIsAnimating(false);
      inner.style.transform = `translateX(-${currentIndex * itemWidth.current}px)`;
    });

    resizeObserver.observe(container);

    events.forEach(([el, ev, fn, opts]) => el.addEventListener(ev, fn, opts));
    return () => {
      events.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn))
      resizeObserver.disconnect();
    };
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAnimating(true);
    innerRef.current.style.transform = `translateX(-${index * itemWidth.current}px)`;
  };

  return (
    <div 
      ref={containerRef} 
      className={`w-[500px] h-[500px] bg-red-500 rounded-2xl overflow-hidden relative m-auto 
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      <div className="flex h-full items-center">
        <div 
          ref={innerRef} 
          className={`absolute w-max flex transform 
            ${isAnimating ? "transition-transform duration-300 ease-in-out" : ""}`}
        >
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
              className={`inline-flex bg-white border border-pink-300 rounded-full h-2 mx-2 cursor-pointer transition-all duration-300
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