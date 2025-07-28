import NavigationBar from './NavigationBar';
import HomeSection from './HomeSection';
import SkillSection from './SkillSection';
function App() {

  return (
    <main className="center-items flex-col bg-black">
      <div className="home-background"></div>
      <NavigationBar />
      <HomeSection />
      <SkillSection />
    </main>
  );
}

export default App
