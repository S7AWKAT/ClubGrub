-- Enable realtime for page_content table
ALTER TABLE public.page_content REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_content;