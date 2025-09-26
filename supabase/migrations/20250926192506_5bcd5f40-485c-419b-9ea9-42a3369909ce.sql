-- Create storage policies for ephemeral bucket
CREATE POLICY "Allow public read access to ephemeral files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'ephemeral');

CREATE POLICY "Allow public insert to ephemeral files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'ephemeral');

CREATE POLICY "Allow public delete from ephemeral files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'ephemeral');