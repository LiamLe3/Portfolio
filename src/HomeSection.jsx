function HomeSection() {

  return (
    <section className="h-screen w-full bg-black">
      <div className="home-background"></div>
      <div className="text-white text-center h-full flex justify-center items-center flex-col">
        <div className="section">
          <p className="text-sm md:text-md lg:text-xl">Liam Lee - Frontend Developer</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl"><span>From concept to clickable</span> <span>Crafted with code</span></h1>
        </div>
      </div>
    </section>

  );
}

export default HomeSection;