import { useRef, useEffect, useState } from "react";

function ProjectImages({images, hide}) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const itemWidthRef = useRef(0);
  const translateXRef = useRef(0);

  const grabRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const setTranslateX = (x) => {
    translateXRef.current = x;
    innerRef.current.style.transform = `translateX(${x}px)`;
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setTranslateX(-index * itemWidthRef.current);
  };

  useEffect(() => {
    const container = containerRef.current;
    itemWidthRef.current = container.offsetWidth;

    const resizeObserver = new ResizeObserver(() => {
      itemWidthRef.current = container.offsetWidth;
      setTranslateX(-currentIndex * itemWidthRef.current);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [])
  
  useEffect(() => {
    const container = containerRef.current;

    itemWidthRef.current = container.offsetWidth;

    const handleDown = (clientX) => {
      grabRef.current = true;
      startXRef.current = clientX - translateXRef.current;
      setIsGrabbing(true);
    };

    const handleMove = (clientX) => {
      if (!grabRef.current) return;
      const now = performance.now();
      const deltaX = clientX - lastXRef.current;
      const deltaTime = now - lastTimeRef.current;

      if(deltaTime > 0) {
        velocityRef.current = deltaX / deltaTime;
      }

      lastXRef.current = clientX;
      lastTimeRef.current = now;

      let newX = clientX - startXRef.current;

      const leftMost = 0;
      const rightMost = -(images.length - 1) * itemWidthRef.current;
      newX = Math.max(Math.min(newX, leftMost), rightMost);

      setTranslateX(newX);
    }

    const handleUp = () => {
      if (grabRef.current) snapToNearest();
      grabRef.current = false;
    }

    const snapToNearest = () => {
      const currentX = translateXRef.current;
      let index = Math.round(-currentX / itemWidthRef.current);

      const threshold = 0.5;
      if (Math.abs(velocityRef.current) > threshold) {
        if (velocityRef.current < 0) {
          index = Math.min(index + 1, images.length - 1);
        } else {
          index = Math.max(index - 1, 0);
        }
      }

      const newIndex = Math.max(0, Math.min(images.length - 1, index));
      setCurrentIndex(newIndex);
      setIsGrabbing(false);
      setTranslateX(-newIndex * itemWidthRef.current);

      velocityRef.current = 0;
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

    events.forEach(([el, ev, fn, opts]) => el.addEventListener(ev, fn, opts));
    return () => {
      events.forEach(([el, ev, fn, opts]) => el.removeEventListener(ev, fn, opts));
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-[500px] h-[500px] bg-red-500 rounded-2xl overflow-hidden relative m-auto 
        ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}
        ${hide ? 'hidden' : ''}`}
    >
      <div className="flex h-full items-center">
        <div 
          ref={innerRef} 
          className={`absolute w-max flex transform 
            ${isGrabbing ? "" : "transition-transform duration-300"}`}
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