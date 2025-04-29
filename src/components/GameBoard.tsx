<<<<<<< HEAD
/**
 * GameBoard Component
 * 
 * This is the main game component that manages the game state, handles guesses,
 * and coordinates between different game elements.
 */

=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
import { useState, useEffect } from "react";
import GuessForm from "@/components/GuessForm";
import GuessHistory from "@/components/GuessHistory";
import WinScreen from "@/components/WinScreen";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

<<<<<<< HEAD
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
=======
export type CarGuess = {
  make: string;
  model: string;
  year: string;
  id: string;
  guessNumber?: number;
  fullName?: string;
  carClass?: string;
  cylinders?: number;
  country?: string;
  drivetrain?: string;
  feedback?: {
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
    correctMake: boolean;
    correctModel: boolean;
    correctYear: boolean;
    correctClass?: boolean;
    correctCylinders?: boolean;
    correctCountry?: boolean;
    correctDrivetrain?: boolean;
<<<<<<< HEAD
    yearDirection?: 'up' | 'down';      // Hint for year (higher/lower)
    cylindersDirection?: 'up' | 'down'; // Hint for cylinders (higher/lower)
    hint: string;                       // Textual hint for the guess
    completed: boolean;                 // Whether all main attributes are correct
  };
};

/**
 * Type definition for the actual car data being guessed
 * Contains all possible attributes of a car in the game
 */
=======
    yearDirection?: 'up' | 'down';
    cylindersDirection?: 'up' | 'down';
    hint: string;
    completed: boolean;
  };
};

>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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

<<<<<<< HEAD
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
  const [gameWon, setGameWon] = useState(false);          // Whether the game has been won
  const [carData, setCarData] = useState<CarData | null>(null);  // The car to be guessed
  const { toast } = useToast();                           // Toast notification system
  
  /**
   * Fetches a random car from the database when the component mounts
   * Currently uses mock data but is structured for Supabase integration
   */
=======
interface GameBoardProps {
  onResetGame: () => void;
}

const GameBoard = ({ onResetGame }: GameBoardProps) => {
  const [guesses, setGuesses] = useState<CarGuess[]>([]);
  const [loading, setLoading] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [carData, setCarData] = useState<CarData | null>(null);
  const { toast } = useToast();
  
  // This would be replaced with actual Supabase logic
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  useEffect(() => {
    const fetchRandomCar = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        // Fetch all cars first
        // @ts-ignore: bypass Supabase strict table type checking
        const { data: allCars, error: countError } = await (supabase as any)
          .from('cars')
          .select('id');

        if (countError || !allCars) {
          throw new Error('Could not get cars');
        }

        // Use current date as seed for random selection
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const seed = Array.from(dateString).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomIndex = seed % allCars.length;
        const randomCar = allCars[randomIndex];

        // Fetch the specific car
        // @ts-ignore: bypass Supabase strict table type checking
        const { data: rawData, error } = await (supabase as any)
          .from('cars')
          .select('id, brand, model, production_years, from_year, "Class", cylinders, "Country", "Drivetrain", body_style, image_urls')
          .eq('id', randomCar.id)
          .single();

        if (error) {
          console.error('Failed to fetch car:', error);
          throw new Error(`Database error: ${error.message}`);
        }

        if (!rawData) {
          console.error('No car found');
          throw new Error('No car found');
        }
        
        // Get the first year from production_years if from_year is not available
        const year = rawData.from_year?.toString() || rawData.production_years?.split(',')[0]?.trim();
        
        // Get first image URL from comma-separated list
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
      } catch (err) {
        console.error('Error fetching car:', err);
        toast({
          title: 'Error',
          description: 'Failed to load car data. Please try again.',
          variant: 'destructive',
=======
        // In a future update, this would fetch from Supabase
        // For now, using mock data
        setTimeout(() => {
          setCarData({
            id: "1",
            make: "Toyota",
            model: "Corolla",
            year: "2022",
            carClass: "Compact",
            cylinders: 4,
            country: "Japan",
            drivetrain: "Front Wheel Drive",
            bodyStyle: "Sedan",
            imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching car:", error);
        toast({
          title: "Error",
          description: "Failed to load car data. Please try again.",
          variant: "destructive",
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
        });
        setLoading(false);
      }
    };
<<<<<<< HEAD
    fetchRandomCar();
  }, [toast]);

  /**
   * Handles the submission of a new guess
   * Compares the guess with the actual car data and provides feedback
   */
=======
    
    fetchRandomCar();
  }, [toast]);

>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  const handleSubmitGuess = async (guess: Omit<CarGuess, "id" | "feedback">) => {
    if (!carData) return;
    
    setLoading(true);
    
    // Create a unique ID for the guess
    const guessWithId = {
      ...guess,
      id: Date.now().toString(),
      guessNumber: guesses.length + 1
    };
    
<<<<<<< HEAD
    // Simulate API delay and process the guess
    setTimeout(() => {
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
      const correctCylinders = guess.cylinders === carData.cylinders;
      const correctCountry = guess.country?.toLowerCase() === carData.country?.toLowerCase();
      const correctDrivetrain = guess.drivetrain === carData.drivetrain;
      
      console.log('Comparison results:', {
        correctMake,
        correctModel,
        correctYear,
        correctClass,
        correctCylinders,
        correctCountry,
        correctDrivetrain,
        cleanedModels: {
          guess: guessModel,
          actual: actualModel
        }
      });
      
      // Check if all main attributes are correct
      const completed = correctMake && correctModel && correctYear;
      
      // Determine direction hints for numeric values
=======
    // In a future update, this would compare against the data from Supabase
    setTimeout(() => {
      // Compare guess with the actual car
      const correctMake = guess.make.toLowerCase() === carData.make.toLowerCase();
      const correctModel = guess.model.toLowerCase() === carData.model.toLowerCase();
      const correctYear = guess.year === carData.year;
      const correctClass = guess.carClass === carData.carClass;
      const correctCylinders = guess.cylinders === carData.cylinders;
      const correctCountry = guess.country === carData.country;
      const correctDrivetrain = guess.drivetrain === carData.drivetrain;
      
      const completed = correctMake && correctModel && correctYear;
      
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
      const yearDirection = !correctYear 
        ? Number(guess.year) < Number(carData.year) 
          ? 'up' 
          : 'down'
        : undefined;
        
      const cylindersDirection = !correctCylinders && guess.cylinders && carData.cylinders
        ? guess.cylinders < carData.cylinders 
          ? 'up' 
          : 'down'
        : undefined;
      
<<<<<<< HEAD
      // Generate appropriate hint message based on guess accuracy
=======
      // Generate a hint
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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
      
<<<<<<< HEAD
      // Create the complete guess object with feedback
=======
      // Add feedback to the guess
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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
        },
      };
      
<<<<<<< HEAD
      // Update guesses history
      setGuesses((prev) => [...prev, guessWithFeedback]);
      setLoading(false);
      
      // Check for win condition
=======
      // Add to guesses history
      setGuesses((prev) => [...prev, guessWithFeedback]);
      setLoading(false);
      
      // Check if game is won
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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
  
<<<<<<< HEAD
  /**
   * Resets the game state
   */
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  const handlePlayAgain = () => {
    onResetGame();
  };
  
<<<<<<< HEAD
  // Loading state UI
=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  if (!carData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 py-16">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading car data...</p>
      </div>
    );
  }
  
<<<<<<< HEAD
  // Main game UI
  return (
    <div className="p-4 md:p-6 bg-slate-900 text-white">
      {gameWon ? (
        <WinScreen 
          carData={carData} 
          onPlayAgain={handlePlayAgain}
          guessCount={guesses.length}
        />
=======
  return (
    <div className="p-4 md:p-6 bg-slate-900 text-white">
      {gameWon ? (
        <WinScreen carData={carData} onPlayAgain={handlePlayAgain} />
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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

<<<<<<< HEAD
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

=======
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
export default GameBoard;
