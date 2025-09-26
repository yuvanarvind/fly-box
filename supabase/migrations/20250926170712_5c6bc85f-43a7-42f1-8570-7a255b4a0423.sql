-- Create ephemeral storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES ('ephemeral', 'ephemeral', true, 52428800, null);

-- Create links table for file metadata
CREATE TABLE public.links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  object_path text NOT NULL,
  filename text NOT NULL,
  size_bytes bigint NOT NULL,
  mime_type text,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  first_view boolean NOT NULL DEFAULT false,
  viewed_at timestamptz,
  access_token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create index on access_token for fast lookups
CREATE INDEX idx_links_access_token ON public.links(access_token);

-- Create index on expires_at for cleanup queries
CREATE INDEX idx_links_expires_at ON public.links(expires_at);

-- Storage policies for public bucket
CREATE POLICY "Public read access for ephemeral bucket" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'ephemeral');

CREATE POLICY "Public insert access for ephemeral bucket" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'ephemeral');

CREATE POLICY "Public delete access for ephemeral bucket" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'ephemeral');