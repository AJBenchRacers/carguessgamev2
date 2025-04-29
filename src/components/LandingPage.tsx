<<<<<<< HEAD
=======

>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 max-w-md"
        >
          <p className="text-gray-300 mb-4">
<<<<<<< HEAD
            Can you guess the mystery car?
=======
            Can you guess the mystery car with limited information?
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center mb-2">
<<<<<<< HEAD
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
=======
                <span className="font-bold">✓</span>
              </div>
              <span className="text-sm">Correct</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mb-2">
                <span className="font-bold">≈</span>
              </div>
              <span className="text-sm">Partial</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mb-2">
                <span className="font-bold text-lg">↑</span>
              </div>
              <span className="text-sm">Higher</span>
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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
