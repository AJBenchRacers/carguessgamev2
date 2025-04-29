
import { useState } from "react";
import { Card } from "@/components/ui/card";
import LandingPage from "@/components/LandingPage";
import GameBoard from "@/components/GameBoard";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  
  const startGame = () => {
    setGameStarted(true);
  };
  
  const resetGame = () => {
    setGameStarted(false);
  };
  
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-slate-900 shadow-xl rounded-lg overflow-hidden border-gray-800">
        {!gameStarted ? (
          <LandingPage onStartGame={startGame} />
        ) : (
          <GameBoard onResetGame={resetGame} />
        )}
      </Card>
      
      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>CARTEXTO &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Index;
