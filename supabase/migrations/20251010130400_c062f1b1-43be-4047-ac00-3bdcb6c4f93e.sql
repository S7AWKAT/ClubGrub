-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'content-images',
  'content-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload content images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content-images');

-- Allow anyone to view content images
CREATE POLICY "Anyone can view content images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'content-images');

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Authenticated users can update content images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'content-images');

-- Allow admins to delete content images
CREATE POLICY "Admins can delete content images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'content-images' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);