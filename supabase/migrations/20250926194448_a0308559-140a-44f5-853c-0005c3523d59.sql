-- Add password hash field to links table for optional password protection
ALTER TABLE public.links 
ADD COLUMN password_hash TEXT;

-- Add index for better performance on password lookups
CREATE INDEX idx_links_access_token_password ON public.links(access_token, password_hash);