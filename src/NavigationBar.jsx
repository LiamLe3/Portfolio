import { useState, useEffect } from "react";
import NavigationButton from "./NavigationButton";
function NavigationBar() {
  const [isDisplayed, setDisplayed] = useState(true);

  useEffect(() => {
    const threshold = 10;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      
      // Prevents micro-scrolls from affecting the display
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setDisplayed(scrollY > lastScrollY ? false : true);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    // Calls every animation frame instead of each scroll event
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isDisplayed]);

  return (
    <nav className={`center-items fixed top-10 mx-auto bg-violet-200 border border-blue-700 rounded-lg px-8 py-4 space-x-4 z-100
                      transition-all ease-in-out duration-750 transform ${isDisplayed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-100"}`}>
      <NavigationButton name="Home"/>
      <NavigationButton name="Skills"/>
      <NavigationButton name="Work"/>
      <NavigationButton name="Contact"/>
    </nav>

  );
}

export default NavigationBar;