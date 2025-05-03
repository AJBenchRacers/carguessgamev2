import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LandingPageProps {
  onStartGame: () => void;
}

const LandingPage = ({ onStartGame }: LandingPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStart = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      onStartGame();
    }, 800);
  };
  
  return (
    <div className="relative bg-slate-900 text-white min-h-[500px] overflow-hidden">
      <div className="absolute inset-0 opacity-5"></div>
      
      <div className="relative flex flex-col items-center justify-center p-8 py-16 text-center z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">CARTEXTO</h1>
          <p className="text-lg text-gray-300">
            Test your automotive knowledge
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6 max-w-lg"
        >
          <h2 className="text-xl font-semibold mb-2 text-white">How to Play</h2>
          <ul className="text-gray-300 text-base list-disc list-inside space-y-1">
            <li>Guess the mystery car by entering its make, model, and year.</li>
            <li>Each guess will give you feedback for each attribute:</li>
            <ul className="ml-6">
              <li><span className="text-green-400 font-semibold">Green</span>: Correct value</li>
              <li><span className="text-yellow-300 font-semibold">Yellow</span>: Close (within 5 years or 2 cylinders)</li>
              <li><span className="text-red-400 font-semibold">Red</span>: Incorrect</li>
            </ul>
            <li>Use the arrows for year and engine to see if you need to guess higher or lower.</li>
            <li>Try to guess the car in as few attempts as possible!</li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 max-w-md"
        >
          <p className="text-gray-300 mb-4">
            Can you guess the mystery car?
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center mb-2">
              </div>
              <span className="text-sm">Incorrect</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mb-2">
              </div>
              <span className="text-sm">Close</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mb-2">
              </div>
              <span className="text-sm">Correct</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button 
            onClick={handleStart} 
            disabled={isLoading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            {isLoading ? "Loading..." : "Start Game"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
