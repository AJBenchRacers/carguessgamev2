<<<<<<< HEAD
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
=======

import { useState } from "react";
import { CarGuess } from "@/components/GameBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
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
<<<<<<< HEAD
import { supabase } from "@/integrations/supabase/client";

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
  
  // Fetch cars from Supabase on mount
  useEffect(() => {
    const fetchCars = async () => {
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
          console.error('Error loading cars:', error);
          throw new Error('Failed to load cars from database');
        }
        
        if (!rawData || rawData.length === 0) {
          console.error('No cars found in database');
          throw new Error('No cars available');
        }

        console.log('Cars fetched successfully:', rawData);
        console.log('Number of cars:', rawData.length);
        if (rawData.length > 0) {
          console.log('Sample car:', rawData[0]);
        }
        setCarList(rawData as DbCarRow[]);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        // You might want to show a toast notification here
      }
    };
    fetchCars();
  }, []);
  
  /**
   * Handles form submission
   * Creates a guess object and passes it to the parent component
   */
=======

// Mock car data for search
const CAR_DATASET = [
  {
    make: "Toyota", 
    model: "Corolla", 
    year: "2022",
    carClass: "Compact",
    cylinders: 4,
    country: "Japan",
    drivetrain: "Front Wheel Drive",
  },
  {
    make: "Honda", 
    model: "Civic", 
    year: "2023",
    carClass: "Compact",
    cylinders: 4,
    country: "Japan",
    drivetrain: "Front Wheel Drive",
  },
  {
    make: "Ford", 
    model: "F-150", 
    year: "2021",
    carClass: "Pickup",
    cylinders: 6,
    country: "USA",
    drivetrain: "4x4",
  },
  {
    make: "Subaru", 
    model: "Impreza WRX STI", 
    year: "2004",
    carClass: "Sportscar",
    cylinders: 4,
    country: "Japan",
    drivetrain: "All Wheel Drive",
  },
  {
    make: "Honda", 
    model: "Civic", 
    year: "1972",
    carClass: "Compact",
    cylinders: 4,
    country: "Japan",
    drivetrain: "Front Wheel Drive",
  },
  {
    make: "Ac", 
    model: "428 Convertible", 
    year: "1966",
    carClass: "Coupe Cabrio",
    cylinders: 8,
    country: "UK",
    drivetrain: "Rear Wheel Drive",
  }
];

interface GuessFormProps {
  onSubmitGuess: (guess: Omit<CarGuess, "id" | "feedback">) => void;
  isLoading: boolean;
}

const GuessForm = ({ onSubmitGuess, isLoading }: GuessFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<typeof CAR_DATASET[0] | null>(null);
  const [open, setOpen] = useState(false);
  
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar) return;
    
<<<<<<< HEAD
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
=======
    onSubmitGuess({
      make: selectedCar.make,
      model: selectedCar.model,
      year: selectedCar.year,
      carClass: selectedCar.carClass,
      cylinders: selectedCar.cylinders,
      country: selectedCar.country,
      drivetrain: selectedCar.drivetrain,
      fullName: `${selectedCar.make} ${selectedCar.model}`
    });
    
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
    setSelectedCar(null);
    setSearchQuery("");
  };
  
<<<<<<< HEAD
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
=======
  // Filter cars based on search query
  const filteredCars = CAR_DATASET.filter(car => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      car.make.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.year.includes(searchTerm) ||
      `${car.make} ${car.model}`.toLowerCase().includes(searchTerm) ||
      `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm)
    );
  });

>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
<<<<<<< HEAD
              className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              role="combobox"
              aria-expanded={open}
            >
              {selectedCar
                ? `${(selectedCar.brand || '').replace(/([a-z])([A-Z])/g, '$1 $2').trim()} ${(selectedCar.model || '').replace(new RegExp(`^${selectedCar.brand}\\s+`, 'i'), '').trim()} ${selectedCar.from_year}`
                : "Type a car model..."}
=======
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              {selectedCar ? `${selectedCar.make} ${selectedCar.model} ${selectedCar.year}` : "Type a car model..."}
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-gray-800 border-gray-700">
            <Command className="bg-gray-800 text-white">
              <CommandInput 
                placeholder="Search for a car..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="text-white border-b border-gray-700"
              />
              <CommandList className="max-h-[200px] overflow-y-auto">
                <CommandEmpty className="py-2 text-gray-400">No car found.</CommandEmpty>
                <CommandGroup>
<<<<<<< HEAD
                  {filteredCars.map((car) => {
                    const formattedBrand = (car.brand || '')
                      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
                      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
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
=======
                  {filteredCars.map((car) => (
                    <CommandItem
                      key={`${car.make}-${car.model}-${car.year}`}
                      value={`${car.make} ${car.model} ${car.year}`}
                      onSelect={() => {
                        setSelectedCar(car);
                        setOpen(false);
                      }}
                      className="cursor-pointer text-white hover:bg-gray-700 hover:text-white"
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedCar && selectedCar.make === car.make && 
                          selectedCar.model === car.model && 
                          selectedCar.year === car.year 
                            ? "opacity-100" 
                            : "opacity-0"
                        }`}
                      />
                      {car.make} {car.model} {car.year}
                    </CommandItem>
                  ))}
>>>>>>> db532bcc95def19b31d2eb31225d2d3ea3e72dfc
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !selectedCar}
        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? "Checking..." : "Guess"}
      </Button>
    </form>
  );
};

export default GuessForm;
