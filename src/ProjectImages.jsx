import { useRef, useEffect, useState } from "react";
import dummyImg from "./assets/dummyImg.jpg";

function ProjectImages() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  const pressed = useRef(false);
  const startX = useRef(0);
  const currentIndex = useRef(0);

  const itemCount = 3;

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
      currentIndex.current = newIndex;

      inner.style.transition = "left 0.3s ease";
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
    if (!innerRef.current || !containerRef.current) return;

    const itemWidth = containerRef.current.offsetWidth;
    currentIndex.current = index;

    innerRef.current.style.transition = "left 0.3s ease";
    innerRef.current.style.left = `-${index * itemWidth}px`;
  };

  return (
    <div ref={containerRef} className="carousel-wrapper">
      <div className="carousel-track-wrapper">
        <div ref={innerRef} className="carousel-track" style={{ left: `-${currentIndex.current * 100}%`}}>
          <div className="carousel-image-container">
            <img src={dummyImg} alt="dummy" onDragStart={(e) => e.preventDefault()} />
          </div>
          <div className="carousel-image-container">
            <img src={dummyImg}  alt="slide-2" onDragStart={(e) => e.preventDefault()} />
          </div>
          <div className="carousel-image-container">
            <img src={dummyImg}  alt="slide-3" onDragStart={(e) => e.preventDefault()} />
          </div>
        </div>
        <div className="carousel-pagination">
          <span className="bullet active-bullet" onClick={() => goToSlide(0)}></span>
          <span className="bullet" onClick={() => goToSlide(1)}></span>
          <span className="bullet" onClick={() => goToSlide(2)}></span>
        </div>
      </div>
    </div>
  );
}

export default ProjectImages;