/**
 * GuessForm Component
 * 
 * This component handles the car selection and guess submission process.
 * It provides a searchable dropdown interface for selecting cars and
 * manages the form submission to the game board.
 */

import { useState, useEffect } from "react";
import { CarGuess } from "@/components/GameBoard";
import { Button } from "@/components/ui/button";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem,
  CommandList 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * Props interface for the GuessForm component
 */
interface GuessFormProps {
  onSubmitGuess: (guess: Omit<CarGuess, "id" | "feedback">) => void;  // Callback for submitting a guess
  isLoading: boolean;  // Loading state from parent component
}

// Add DbCarRow interface after imports
interface DbCarRow {
  id: string;
  brand: string;
  model: string;
  production_years: string;
  from_year: number;
  Class: string;
  cylinders: number;
  Country: string;
  Drivetrain: string;
}

/**
 * Form component for submitting car guesses
 * Implements a searchable dropdown interface for car selection
 */
const GuessForm = ({ onSubmitGuess, isLoading }: GuessFormProps) => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");  // Current search input
  const [selectedCar, setSelectedCar] = useState<DbCarRow | null>(null);  // Currently selected car
  const [open, setOpen] = useState(false);  // Dropdown open state
  const [carList, setCarList] = useState<DbCarRow[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch cars from Supabase on mount
  useEffect(() => {
    const fetchCars = async () => {
      setLoadingCars(true);
      setError(null);
      try {
        console.log('Fetching cars from database...');
        // @ts-ignore: bypass Supabase strict table type checking
        const result: any = await (supabase as any)
          .from('cars')
          .select(
            'id, brand, model, production_years, from_year, "Class", cylinders, "Country", "Drivetrain"'
          );
        const { data: rawData, error } = result;
        if (error) {
          throw new Error(`Failed to load cars: ${error.message}`);
        }

        if (!rawData || rawData.length === 0) {
          throw new Error('No cars available');
        }

        console.log('Cars fetched successfully:', rawData);
        console.log('Number of cars:', rawData.length);
        if (rawData.length > 0) {
          console.log('Sample car:', rawData[0]);
        }
        setCarList(rawData as DbCarRow[]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load car data';
        setError(message);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchCars();
  }, []);
  
  /**
   * Handles form submission
   * Creates a guess object and passes it to the parent component
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar) return;
    
    // Create and submit the guess
    const displayModel = selectedCar.model.replace(new RegExp(`^${selectedCar.brand}\\s+`, 'i'), '').trim();
    
    onSubmitGuess({
      make: selectedCar.brand,
      model: displayModel,
      year: selectedCar.from_year.toString(),
      carClass: selectedCar.Class,
      cylinders: selectedCar.cylinders,
      country: selectedCar.Country,
      drivetrain: selectedCar.Drivetrain,
      fullName: `${selectedCar.brand} ${displayModel}`
    });
    
    // Reset form state
    setSelectedCar(null);
    setSearchQuery("");
  };
  
  /**
   * Filters the car dataset based on the search query
   * Matches against make, model, year, and combinations
   */
  const filteredCars = carList.filter(car => {
    const searchTerm = searchQuery.toLowerCase();
    try {
      // Format the brand name for better display (e.g., "Mercedesbenz" -> "Mercedes Benz")
      const formattedBrand = (car.brand || '')
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
      
      // Format the model name to remove extra spaces
      const formattedModel = (car.model || '').replace(/\s+/g, ' ').trim();
      
      return (
        formattedBrand.toLowerCase().includes(searchTerm) ||
        formattedModel.toLowerCase().includes(searchTerm) ||
        (car.production_years || '').includes(searchTerm) ||
        `${formattedBrand} ${formattedModel}`.toLowerCase().includes(searchTerm) ||
        `${formattedBrand} ${formattedModel} ${car.production_years || ''}`.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error filtering car:', car, error);
      return false;
    }
  });

  // Render the form with searchable dropdown
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              role="combobox"
              aria-expanded={open}
              disabled={loadingCars || !!error}
            >
              {selectedCar
                ? `${(selectedCar.brand || '').replace(/([a-z])([A-Z])/g, '$1 $2').trim()} ${(selectedCar.model || '').replace(new RegExp(`^${selectedCar.brand}\\s+`, 'i'), '').trim()} ${selectedCar.from_year}`
                : loadingCars 
                  ? "Loading cars..."
                  : error
                  ? "Error loading cars"
                  : "Type a car model..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-gray-800 border-gray-700">
            <Command className="bg-gray-800 text-white">
              <CommandInput 
                placeholder={loadingCars ? "Loading..." : error ? "Error loading cars" : "Search for a car..."}
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="text-white border-b border-gray-700"
                disabled={loadingCars || !!error}
              />
              <CommandList className="max-h-[200px] overflow-y-auto">
                {error ? (
                  <div className="p-4 text-center text-red-400">
                    <p>{error}</p>
                    <Button
                      onClick={() => window.location.reload()}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Retry
                    </Button>
                  </div>
                ) : loadingCars ? (
                  <div className="p-4 text-center text-gray-400">
                    <LoadingSpinner />
                    <p className="mt-2">Loading cars...</p>
                  </div>
                ) : filteredCars.length === 0 ? (
                  <CommandEmpty className="py-2 text-gray-400">No car found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {filteredCars.map((car) => {
                      const formattedBrand = (car.brand || '')
                        .replace(/([a-z])([A-Z])/g, '$1 $2')
                        .replace(/\s+/g, ' ')
                        .trim();
                      const displayModel = car.model 
                        ? car.model
                            .replace(new RegExp(`^${car.brand}\\s+`, 'i'), '')
                            .replace(/\s+/g, ' ')
                            .trim() 
                        : '';
                      
                      // Skip cars with missing essential data
                      if (!car.brand || !car.model) {
                        return null;
                      }

                      return (
                        <CommandItem
                          key={car.id}
                          value={`${formattedBrand} ${displayModel} ${car.from_year}`}
                          onSelect={() => {
                            setSelectedCar(car);
                            setOpen(false);
                          }}
                          className="cursor-pointer text-white hover:bg-gray-700 hover:text-white"
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedCar && selectedCar.brand === car.brand &&
                              selectedCar.model === car.model &&
                              selectedCar.from_year === car.from_year
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {formattedBrand} {displayModel} {car.from_year}
                        </CommandItem>
                      );
                    }).filter(Boolean)}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !selectedCar || loadingCars || !!error}
        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? "Checking..." : "Guess"}
      </Button>
    </form>
  );
};

export default GuessForm;
