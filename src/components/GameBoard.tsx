/**
 * GameBoard Component
 * 
 * This is the main game component that manages the game state, handles guesses,
 * and coordinates between different game elements.
 */

import { useState, useEffect } from "react";
import GuessForm from "@/components/GuessForm";
import GuessHistory from "@/components/GuessHistory";
import WinScreen from "@/components/WinScreen";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Type definition for a car guess made by the player
 * Includes all possible attributes that can be guessed and feedback for each
 */
export type CarGuess = {
  make: string;          // Car manufacturer
  model: string;         // Car model name
  year: string;          // Manufacturing year
  id: string;            // Unique identifier for the guess
  guessNumber?: number;  // Sequential number of the guess
  fullName?: string;     // Combined make and model
  carClass?: string;     // Vehicle class (e.g., Compact, SUV)
  cylinders?: number;    // Number of engine cylinders
  country?: string;      // Country of origin
  drivetrain?: string;   // Type of drivetrain
  feedback?: {           // Feedback for each guessed attribute
    correctMake: boolean;
    correctModel: boolean;
    correctYear: boolean;
    correctClass?: boolean;
    correctCylinders?: boolean;
    correctCountry?: boolean;
    correctDrivetrain?: boolean;
    yearDirection?: 'up' | 'down';      // Hint for year (higher/lower)
    cylindersDirection?: 'up' | 'down'; // Hint for cylinders (higher/lower)
    hint: string;                       // Textual hint for the guess
    completed: boolean;                 // Whether all main attributes are correct
    isYearClose: boolean;
    isCylindersClose: boolean;
  };
};

/**
 * Type definition for the actual car data being guessed
 * Contains all possible attributes of a car in the game
 */
export type CarData = {
  id: string;
  make: string;
  model: string;
  year: string;
  carClass?: string;
  cylinders?: number;
  country?: string;
  drivetrain?: string;
  bodyStyle?: string;
  imageUrl?: string;
};

/**
 * Props interface for the GameBoard component
 */
interface GameBoardProps {
  onResetGame: () => void;  // Callback to reset the game
}

/**
 * Main game component that manages the game state and logic
 */
const GameBoard = ({ onResetGame }: GameBoardProps) => {
  // State management
  const [guesses, setGuesses] = useState<CarGuess[]>([]);  // History of player guesses
  const [loading, setLoading] = useState(false);           // Loading state for async operations
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const [gameWon, setGameWon] = useState(false);          // Whether the game has been won
  const [carData, setCarData] = useState<CarData | null>(null);  // The car to be guessed
  const { toast } = useToast();                           // Toast notification system
  
  /**
   * Fetches a random car from the database when the component mounts
   * Currently uses mock data but is structured for Supabase integration
   */
  useEffect(() => {
    const fetchRandomCar = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all cars first
        // @ts-ignore: bypass Supabase strict table type checking
        const { data: allCars, error: countError } = await supabase
          .from('cars')
          .select('id');

        if (countError) {
          throw new Error('Could not fetch cars list');
        }

        if (!allCars?.length) {
          throw new Error('No cars available in the database');
        }

        // Use current date as seed for random selection
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const seed = Array.from(dateString).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomIndex = seed % allCars.length;
        const randomCar = allCars[randomIndex];

        // Fetch the specific car
        // @ts-ignore: bypass Supabase strict table type checking
        const { data: rawData, error } = await supabase
          .from('cars')
          .select('id, brand, model, production_years, from_year, "Class", cylinders, "Country", "Drivetrain", body_style, image_urls')
          .eq('id', randomCar.id)
          .single();

        if (error) {
          throw new Error(`Failed to fetch car details: ${error.message}`);
        }

        if (!rawData) {
          throw new Error('Selected car not found');
        }

        const year = rawData.from_year?.toString() || rawData.production_years?.split(',')[0]?.trim();
        const imageUrl = rawData.image_urls
          ? rawData.image_urls.split(',')[0].trim()
          : undefined;

        const selectedCar = {
          id: rawData.id.toString(),
          make: rawData.brand,
          model: rawData.model,
          year,
          carClass: rawData.Class,
          cylinders: rawData.cylinders,
          country: rawData.Country,
          drivetrain: rawData.Drivetrain,
          bodyStyle: rawData.body_style,
          imageUrl,
        };

        setCarData(selectedCar);
        setLoading(false);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        
        // Implement retry logic
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            fetchRandomCar();
          }, Math.pow(2, retryCount) * 1000); // Exponential backoff
        } else {
          toast({
            title: 'Error',
            description: 'Failed to load car data after multiple attempts. Please try again later.',
            variant: 'destructive',
          });
          setLoading(false);
        }
      }
    };

    fetchRandomCar();
  }, [toast]);

  /**
   * Handles the submission of a new guess
   * Compares the guess with the actual car data and provides feedback
   */
  const handleSubmitGuess = async (guess: Omit<CarGuess, "id" | "feedback">) => {
    if (!carData) return;
    
    setLoading(true);
    
    // Create a unique ID for the guess
    const guessWithId = {
      ...guess,
      id: Date.now().toString(),
      guessNumber: guesses.length + 1
    };
    
    // Simulate API delay and process the guess
    setTimeout(() => {
      // Extract numeric part from cylinders (e.g., 'V8' -> 8, 'L4' -> 4)
      const parseCylinders = (cyl: any) => {
        if (typeof cyl === 'number') return cyl;
        if (typeof cyl === 'string') {
          const match = cyl.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : undefined;
        }
        return undefined;
      };
      const guessCylNum = parseCylinders(guess.cylinders);
      const actualCylNum = parseCylinders(carData.cylinders);

      // Require exact string match for correctCylinders (case-insensitive, trimmed)
      const guessCylStr = (guess.cylinders || '').toString().trim().toLowerCase();
      const actualCylStr = (carData.cylinders || '').toString().trim().toLowerCase();
      const correctCylinders = guessCylStr === actualCylStr;
      
      // Compare each attribute of the guess with the actual car
      console.log('Comparing guess vs actual:', {
        make: {
          guess: guess.make,
          actual: carData.make,
        },
        model: {
          guess: guess.model,
          actual: carData.model,
        },
        year: {
          guess: guess.year,
          actual: carData.year,
        },
        class: {
          guess: guess.carClass,
          actual: carData.carClass,
        },
        cylinders: {
          guess: guess.cylinders,
          actual: carData.cylinders,
        },
        country: {
          guess: guess.country,
          actual: carData.country,
        },
        drivetrain: {
          guess: guess.drivetrain,
          actual: carData.drivetrain,
        }
      });

      // Clean up model names by removing brand prefix and extra spaces
      const cleanModel = (model: string, brand: string) => 
        model.replace(new RegExp(`^${brand}\\s+`, 'i'), '').trim();
      
      const guessModel = cleanModel(guess.model, guess.make);
      const actualModel = cleanModel(carData.model, carData.make);

      const correctMake = guess.make.toLowerCase() === carData.make.toLowerCase();
      const correctModel = guessModel.toLowerCase() === actualModel.toLowerCase();
      const correctYear = guess.year === carData.year;
      const correctClass = guess.carClass === carData.carClass;
      const correctCountry = guess.country?.toLowerCase() === carData.country?.toLowerCase();
      const correctDrivetrain = guess.drivetrain === carData.drivetrain;
      
      // Add logic for close guesses
      const isYearClose = !correctYear && Math.abs(Number(guess.year) - Number(carData.year)) <= 5;
      const isCylindersClose = !correctCylinders && guessCylNum !== undefined && actualCylNum !== undefined && Math.abs(guessCylNum - actualCylNum) <= 2;
      
      console.log('Comparison results:', {
        correctMake,
        correctModel,
        correctYear,
        correctClass,
        correctCylinders,
        correctCountry,
        correctDrivetrain,
        isYearClose,
        isCylindersClose,
        cleanedModels: {
          guess: guessModel,
          actual: actualModel
        }
      });
      
      // Check if all main attributes are correct
      const completed = correctMake && correctModel && correctYear;
      
      // Determine direction hints for numeric values
      const yearDirection = !correctYear 
        ? Number(guess.year) < Number(carData.year) 
          ? 'up' 
          : 'down'
        : undefined;
        
      // Only show arrow if numbers are different and not an exact string match
      const cylindersDirection = !correctCylinders && guessCylNum !== undefined && actualCylNum !== undefined && guessCylNum !== actualCylNum
        ? guessCylNum < actualCylNum 
          ? 'up' 
          : 'down'
        : undefined;
      
      // Generate appropriate hint message based on guess accuracy
      let hint = "";
      if (completed) {
        hint = "Perfect match! You got it!";
      } else if (correctMake && !correctModel && !correctYear) {
        hint = "Right manufacturer, but wrong model and year.";
      } else if (correctMake && correctModel && !correctYear) {
        hint = "Right make and model, but wrong year.";
      } else if (correctMake && !correctModel && correctYear) {
        hint = "Right make and year, but wrong model.";
      } else if (!correctMake && correctModel && !correctYear) {
        hint = "Right model name, but wrong make and year.";
      } else if (!correctMake && !correctModel && correctYear) {
        hint = "Only the year is correct.";
      } else if (!correctMake && correctModel && correctYear) {
        hint = "Right model and year, but wrong make.";
      } else {
        hint = "All main guesses are incorrect.";
      }
      
      // Create the complete guess object with feedback
      const guessWithFeedback: CarGuess = {
        ...guessWithId,
        feedback: {
          correctMake,
          correctModel,
          correctYear,
          correctClass,
          correctCylinders,
          correctCountry,
          correctDrivetrain,
          yearDirection,
          cylindersDirection,
          hint,
          completed,
          isYearClose,
          isCylindersClose
        },
      };
      
      // Update guesses history
      setGuesses((prev) => [...prev, guessWithFeedback]);
      setLoading(false);
      
      // Check for win condition
      if (completed) {
        setGameWon(true);
        toast({
          title: "Congratulations!",
          description: "You've correctly guessed the car!",
          duration: 5000,
        });
      }
    }, 800);
  };
  
  /**
   * Resets the game state
   */
  const handlePlayAgain = () => {
    onResetGame();
  };
  
  // Loading state UI with retry button
  if (!carData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 py-16">
        {loading ? (
          <>
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Loading car data...</p>
            {retryCount > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                Retry attempt {retryCount} of {MAX_RETRIES}...
              </p>
            )}
          </>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              onClick={() => {
                setRetryCount(0);
                setError(null);
                setLoading(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Again
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
  
  // Main game UI
  return (
    <div className="p-4 md:p-6 bg-slate-900 text-white">
      {gameWon ? (
        <WinScreen 
          carData={carData} 
          onPlayAgain={handlePlayAgain}
          guessCount={guesses.length}
        />
      ) : (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">CARTEXTO</h1>
            <p className="text-gray-400 mt-2">
              GUESSES: {guesses.length}
            </p>
          </div>
          
          <GuessForm onSubmitGuess={handleSubmitGuess} isLoading={loading} />
          
          {guesses.length > 0 && (
            <div className="mt-8">
              <GuessHistory guesses={guesses} />
            </div>
          )}
        </>
      )}
      
      <div className="mt-8 text-center">
        <Button
          onClick={onResetGame}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium border-none transition-colors"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

// Debug function to check table structure
const debugTableStructure = async () => {
  try {
    // @ts-ignore: bypass Supabase strict table type checking
    const { data, error } = await (supabase as any)
      .from('cars')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase error:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('Table columns:', Object.keys(data[0]));
      console.log('Sample row:', data[0]);
    } else {
      console.log('No data found in table');
    }
  } catch (err) {
    console.error('Debug error:', err);
  }
};

// Call debug function
debugTableStructure();

export default GameBoard;
