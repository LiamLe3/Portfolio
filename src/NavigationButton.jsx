function NavigationButton({name, idName}) {

  return (
    <a href={idName} className="text-white text-xl md:text-2xl lg:text-3xl hover:text-purple-500 transition-colors duration-200">
      {name}
    </a>
  );
}

export default NavigationButton;