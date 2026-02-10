import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Promotions } from "./components/sections/Promotions";
import { LeaderboardSection } from "./components/sections/LeaderboardSection";
import { Rewards } from "./components/sections/Rewards";
import { BonusHunt } from "./components/sections/BonusHunt";

function App() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-canvas)" }}>
      <Nav />
      <main>
        <Hero />
        <Promotions />
        <LeaderboardSection />
        <Rewards />
        <BonusHunt />
      </main>
      <Footer />
    </div>
  );
}

export default App;
