<<<<<<< HEAD
/**
 * GuessHistory Component
 * 
 * This component displays the history of guesses made by the player,
 * showing the feedback for each guess in a visually appealing way.
 * It uses color coding and directional indicators to provide
 * clear feedback about the accuracy of each guess.
 */

import { CarGuess } from "./GameBoard";

/**
 * Props interface for the GuessHistory component
 */
interface GuessHistoryProps {
  guesses: CarGuess[];  // Array of previous guesses with their feedback
}

/**
 * Component that renders the history of guesses
 * Shows each guess with color-coded feedback and hints
 */
=======

import { CarGuess } from "./GameBoard";

interface GuessHistoryProps {
  guesses: CarGuess[];
}

>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
const GuessHistory = ({ guesses }: GuessHistoryProps) => {
  // Create a reversed copy of the guesses array to show newest guesses first
  const reversedGuesses = [...guesses].reverse();
  
  return (
    <div className="space-y-6">
<<<<<<< HEAD
      {reversedGuesses.map((guess) => {
        // Strip brand from model if model starts with brand
        const displayModel = guess.model.replace(new RegExp('^' + guess.make + '\\s+', 'i'), '');
        return (
          <div
            key={guess.id}
            className="border rounded-lg p-4 bg-slate-900 text-white animate-fade-in"
          >
            {/* Guess header with guess number and car name */}
            <div className="mb-2 font-medium">
              #{guess.guessNumber} {guess.make} {displayModel}
            </div>
            
            {/* Grid of car attributes with feedback */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* Make/Brand attribute */}
              <div>
                <div className="text-xs text-gray-400 mb-1">Brand</div>
                <div 
                  className={`py-2 px-3 rounded text-center ${
                    guess.feedback?.correctMake 
                      ? "bg-green-600 text-white" 
                      : "bg-red-700/80 text-white"
                  }`}
                >
                  {guess.make}
                </div>
              </div>
              
              {/* Year attribute */}
              <div>
                <div className="text-xs text-gray-400 mb-1">Release Year</div>
                <div 
                  className={`py-2 px-3 rounded text-center ${
                    guess.feedback?.correctYear 
                      ? "bg-green-600 text-white" 
                      : "bg-red-700/80 text-white"
                  }`}
                >
                  {guess.year}
                  {guess.feedback?.yearDirection === "up" && <span className="ml-2">↑</span>}
                  {guess.feedback?.yearDirection === "down" && <span className="ml-2">↓</span>}
                </div>
              </div>
              
              {/* Car class attribute */}
              <div>
                <div className="text-xs text-gray-400 mb-1">Class</div>
                <div 
                  className={`py-2 px-3 rounded text-center ${
                    guess.feedback?.correctClass 
                      ? "bg-green-600 text-white" 
                      : "bg-red-700/80 text-white"
                  }`}
                >
                  {guess.carClass || "Unknown"}
                </div>
              </div>
              
              {/* Cylinders attribute */}
              <div>
                <div className="text-xs text-gray-400 mb-1">Engine</div>
                <div 
                  className={`py-2 px-3 rounded text-center ${
                    guess.feedback?.correctCylinders 
                      ? "bg-green-600 text-white" 
                      : "bg-red-700/80 text-white"
                  }`}
                >
                  {guess.cylinders || "?"}
                  {guess.feedback?.cylindersDirection === "up" && <span className="ml-2">↑</span>}
                  {guess.feedback?.cylindersDirection === "down" && <span className="ml-2">↓</span>}
                </div>
              </div>
              
              {/* Country attribute */}
              <div>
                <div className="text-xs text-gray-400 mb-1">Country</div>
                <div 
                  className={`py-2 px-3 rounded text-center ${
                    guess.feedback?.correctCountry 
                      ? "bg-green-600 text-white" 
                      : "bg-red-700/80 text-white"
                  }`}
                >
                  {guess.country || "?"}
                </div>
              </div>
              
              {/* Drivetrain attribute */}
              <div>
                <div className="text-xs text-gray-400 mb-1">Drivetrain</div>
                <div 
                  className={`py-2 px-3 rounded text-center ${
                    guess.feedback?.correctDrivetrain 
                      ? "bg-green-600 text-white" 
                      : "bg-red-700/80 text-white"
                  }`}
                >
                  {guess.drivetrain || "Unknown"}
                </div>
              </div>
            </div>
            
            {/* Hint message for the guess */}
            {guess.feedback?.hint && guess.feedback.hint !== "All main guesses are incorrect." && (
              <div className="mt-3 pt-2 text-sm border-t border-gray-700 text-gray-300">
                {guess.feedback.hint}
              </div>
            )}
          </div>
        );
      })}
=======
      {reversedGuesses.map((guess) => (
        <div
          key={guess.id}
          className="border rounded-lg p-4 bg-slate-900 text-white animate-fade-in"
        >
          <div className="mb-2 font-medium">
            #{guess.guessNumber} {guess.fullName || `${guess.make} ${guess.model} ${guess.year}`}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">Brand</div>
              <div 
                className={`py-2 px-3 rounded text-center ${
                  guess.feedback?.correctMake 
                    ? "bg-red-700 text-white" 
                    : "bg-red-700/80 text-white"
                }`}
              >
                {guess.make}
                {guess.feedback?.correctMake 
                  ? null
                  : <span className="ml-2">↓</span>}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-400 mb-1">Year</div>
              <div 
                className={`py-2 px-3 rounded text-center ${
                  guess.feedback?.correctYear 
                    ? "bg-red-700 text-white" 
                    : "bg-red-700/80 text-white"
                }`}
              >
                {guess.year}
                {guess.feedback?.yearDirection === "up" && <span className="ml-2">↑</span>}
                {guess.feedback?.yearDirection === "down" && <span className="ml-2">↓</span>}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-400 mb-1">Class</div>
              <div 
                className={`py-2 px-3 rounded text-center ${
                  guess.feedback?.correctClass 
                    ? "bg-red-700 text-white" 
                    : "bg-red-700/80 text-white"
                }`}
              >
                {guess.carClass || "Unknown"}
                {guess.feedback?.correctClass 
                  ? null 
                  : <span className="ml-2">↓</span>}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-400 mb-1">Cylinders</div>
              <div 
                className={`py-2 px-3 rounded text-center ${
                  guess.feedback?.correctCylinders 
                    ? "bg-green-600 text-white" 
                    : "bg-green-600/80 text-white"
                }`}
              >
                {guess.cylinders || "?"}
                {guess.feedback?.cylindersDirection === "up" && <span className="ml-2">↑</span>}
                {guess.feedback?.cylindersDirection === "down" && <span className="ml-2">↓</span>}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-400 mb-1">Country</div>
              <div 
                className={`py-2 px-3 rounded text-center ${
                  guess.feedback?.correctCountry 
                    ? "bg-yellow-500 text-white" 
                    : "bg-yellow-500/80 text-white"
                }`}
              >
                {guess.country || "?"}
                {guess.feedback?.correctCountry 
                  ? null
                  : <span className="ml-2">↓</span>}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-400 mb-1">Drivetrain</div>
              <div 
                className={`py-2 px-3 rounded text-center ${
                  guess.feedback?.correctDrivetrain 
                    ? "bg-green-600 text-white" 
                    : "bg-green-600/80 text-white"
                }`}
              >
                {guess.drivetrain || "Unknown"}
                {guess.feedback?.correctDrivetrain 
                  ? null 
                  : <span className="ml-2">↓</span>}
              </div>
            </div>
          </div>
          
          {guess.feedback?.hint && (
            <div className="mt-3 pt-2 text-sm border-t border-gray-700 text-gray-300">
              {guess.feedback.hint}
            </div>
          )}
        </div>
      ))}
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
    </div>
  );
};

export default GuessHistory;
