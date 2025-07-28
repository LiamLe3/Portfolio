import { useState, useEffect } from "react";
import NavigationButton from "./NavigationButton";
function NavigationBar() {

  return (
    <nav className="center-items fixed top-10 mx-auto bg-violet-200 border border-blue-700 rounded-lg px-8 py-4 space-x-4">
      <NavigationButton name="Home"/>
      <NavigationButton name="Skills"/>
      <NavigationButton name="Work"/>
      <NavigationButton name="Contact"/>
    </nav>

  );
}

export default NavigationBar;