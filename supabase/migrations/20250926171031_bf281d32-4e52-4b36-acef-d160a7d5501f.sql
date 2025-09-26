-- Enable Row Level Security on links table
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (needed for token-based access)
CREATE POLICY "Public read access for links" 
ON public.links 
FOR SELECT 
USING (true);

-- Create policy to allow public insert access (for file uploads)
CREATE POLICY "Public insert access for links" 
ON public.links 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow public update access (for marking files as viewed)
CREATE POLICY "Public update access for links" 
ON public.links 
FOR UPDATE 
USING (true);