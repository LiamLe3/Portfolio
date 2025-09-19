function HomeSection() {

  return (
    <section id="home" className="h-screen text-white text-center center-items flex-col xl:w-[60rem]">
      <h1 className="text-3xl md:text-5xl lg:text-6xl pb-3">
        I'm
        <span className="bg-gradient-to-r from-purple-500 to-purple-200 bg-clip-text text-transparent"> Liam</span>
        , a Frontend Developer.</h1>
      <h1 className="text-sm md:text-md lg:text-xl">I build clean, responsive websites that combine modern design with practical functionality.</h1>
    </section>

  );
}

export default HomeSection;