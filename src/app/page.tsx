import Header from "../components/Header";
import Footer from "../components/Footer";
import GameBoard from "@/components/GameBoard";
export default function Home() {
  return (
    <>
      <Header />
      <main className="m-auto">Main content
        <GameBoard />
      </main>
      <Footer />
    </>
  );
}