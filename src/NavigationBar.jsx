import NavigationButton from "./NavigationButton";
function NavigationBar() {

  return (
    <nav className="flex justify-center items-center w-full fixed top-0 bg-[#111]/70 px-8 py-4 space-x-4 z-100 backdrop-blur-sm border border-b-white">
      <NavigationButton name="Home" idName="#home"/>
      <NavigationButton name="Skills" idName="#skills"/>
      <NavigationButton name="Projects" idName="#projects"/>
      <NavigationButton name="Contact" idName="#contact"/>
    </nav>

  );
}

export default NavigationBar;