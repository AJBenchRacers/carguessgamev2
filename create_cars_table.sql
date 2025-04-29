-- Create the cars table
CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_year INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    body_style TEXT,
    engine_fuel_type TEXT,
    engine_cylinders INTEGER,
    transmission_type TEXT,
    driven_wheels TEXT,
    number_of_doors INTEGER,
    market_category TEXT,
    vehicle_size TEXT,
    vehicle_style TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the created_at column for efficient date-based queries
CREATE INDEX idx_cars_created_at ON cars(created_at);

-- Create an index on commonly searched fields
CREATE INDEX idx_cars_search ON cars(make, model, model_year);

-- Add RLS (Row Level Security) policy to allow read-only access
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read the cars table
CREATE POLICY "Allow public read-only access" 
ON cars FOR SELECT 
TO public 
USING (true); 