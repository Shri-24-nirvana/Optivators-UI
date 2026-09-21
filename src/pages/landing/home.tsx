import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import WhoAreYou from "../../components/landing/WhoAreYou";
import StatsTicker from "../../components/landing/StatsTicker";
import ContentSection from "../../components/landing/ContentSection";
import Associations from "../../components/landing/Associations";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import EndingCTA from "../../components/landing/EndingCTA";
import SmoothScroll from "../../components/landing/SmoothScroll";
import { BouncingBalls } from "../../components/landing/ui/bouncing-balls";
import "./app.css";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="pointer-events-none absolute top-0 left-0 -z-10 w-full h-full min-h-screen">
        <BouncingBalls
          backgroundColor="#FFFFFF"
          colors={["#FD3702", "#FE8505"]}
          numBalls={30}
          minRadius={1.5}
          maxRadius={4.5}
          speed={0.3}
          interactive={true}
          interactionRadius={70}
          interactionScale={1.7}
        />
      </div>
      <SmoothScroll>
        <Navbar />
        <main className="flex min-h-screen flex-col">
          <Hero />
          <WhoAreYou />
          <StatsTicker />
          <ContentSection />
          <Associations />
          <TestimonialsSection />
          <EndingCTA />
        </main>
      </SmoothScroll>
    </div>
  );
}
