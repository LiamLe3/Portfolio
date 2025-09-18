import NavigationButton from "./NavigationButton";
function NavigationBar() {

  return (
    <nav className="flex justify-center items-center w-full fixed top-0 bg-[#111]/80 px-8 py-4 space-x-4 z-100 backdrop-blur-sm border border-b-white">
      <NavigationButton name="Home"/>
      <NavigationButton name="Skills"/>
      <NavigationButton name="Work"/>
      <NavigationButton name="Contact"/>
    </nav>

  );
}

export default NavigationBar;