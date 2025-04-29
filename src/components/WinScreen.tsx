<<<<<<< HEAD
/**
 * WinScreen Component
 * 
 * This component displays the victory screen when the player
 * correctly guesses the car. It shows a celebratory animation
 * with confetti and displays detailed information about the
 * correctly guessed car.
 */
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";
<<<<<<< HEAD
import { CarData } from "@/components/GameBoard";

/**
 * Props interface for the WinScreen component
 */
interface WinScreenProps {
  carData: CarData;      // The car that was correctly guessed
  onPlayAgain: () => void;  // Callback to start a new game
  guessCount: number;  // Add this prop
}

/**
 * Victory screen component that shows when the player wins
 * Includes confetti animation and detailed car information
 */
const WinScreen = ({ carData, onPlayAgain, guessCount }: WinScreenProps) => {
  /**
   * Triggers confetti animation when the component mounts
   * Creates a celebratory effect with particles shooting from both sides
   */
=======
import { CarData } from "./GameBoard";

interface WinScreenProps {
  carData: CarData;
  onPlayAgain: () => void;
}

const WinScreen = ({ carData, onPlayAgain }: WinScreenProps) => {
  // Trigger confetti when component mounts
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0
    };

<<<<<<< HEAD
    /**
     * Helper function to generate random numbers in a range
     */
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

<<<<<<< HEAD
    // Create confetti animation interval
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
<<<<<<< HEAD
      // Launch confetti from left side
=======
      // since particles fall down, start a bit higher than random
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      
<<<<<<< HEAD
      // Launch confetti from right side
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

<<<<<<< HEAD
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Render the victory screen with animations
  return (
    <motion.div 
      className="flex flex-col items-center space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-2">Congratulations!</h2>
        <p className="text-xl text-gray-300">You've correctly guessed today's car in {guessCount} {guessCount === 1 ? 'guess' : 'guesses'}!</p>
      </motion.div>

=======
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8 px-4 space-y-6 bg-slate-900 text-white"
    >
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-white"
      >
        Congratulations!
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-300"
      >
        You've correctly guessed today's car!
      </motion.p>
      
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800 rounded-lg p-4 md:p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-white">Car Details</h3>
        
<<<<<<< HEAD
        {/* Car image if available */}
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
        {carData.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img
              src={carData.imageUrl}
              alt={`${carData.make} ${carData.model}`}
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>
        )}
        
<<<<<<< HEAD
        {/* Grid of car attributes */}
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
        <div className="grid grid-cols-2 gap-y-2 text-left">
          <div className="font-semibold">Make:</div>
          <div>{carData.make}</div>
          
          <div className="font-semibold">Model:</div>
          <div>{carData.model}</div>
          
          <div className="font-semibold">Year:</div>
          <div>{carData.year}</div>
          
<<<<<<< HEAD
          {/* Optional attributes */}
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
          {carData.carClass && (
            <>
              <div className="font-semibold">Class:</div>
              <div>{carData.carClass}</div>
            </>
          )}
          
          {carData.cylinders && (
            <>
<<<<<<< HEAD
              <div className="font-semibold">Engine:</div>
              <div>{carData.cylinders} cylinders</div>
=======
              <div className="font-semibold">Cylinders:</div>
              <div>{carData.cylinders}</div>
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
            </>
          )}
          
          {carData.country && (
            <>
              <div className="font-semibold">Country:</div>
              <div>{carData.country}</div>
            </>
          )}
          
          {carData.drivetrain && (
            <>
              <div className="font-semibold">Drivetrain:</div>
              <div>{carData.drivetrain}</div>
            </>
          )}
          
          {carData.bodyStyle && (
            <>
              <div className="font-semibold">Body Style:</div>
              <div>{carData.bodyStyle}</div>
            </>
          )}
        </div>
      </motion.div>
      
<<<<<<< HEAD
      {/* Play again button with animation */}
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button 
          onClick={onPlayAgain} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WinScreen;
