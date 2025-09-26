-- Create waitlist table for email signups
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email)
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since waitlist is public)
CREATE POLICY "Public insert access for waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public read access for waitlist" 
ON public.waitlist 
FOR SELECT 
USING (true);