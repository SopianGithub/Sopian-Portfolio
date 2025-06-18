-- Fix RLS policies for contact_messages table

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can create contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Public can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin can view contact messages" ON contact_messages;

-- Create proper policy for anonymous users to insert contact messages
CREATE POLICY "Anyone can insert contact messages" 
ON contact_messages 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create policy for authenticated users (admins) to view contact messages  
CREATE POLICY "Admins can view contact messages" 
ON contact_messages 
FOR SELECT 
TO authenticated
USING (true);

-- Create policy for authenticated users (admins) to update contact messages
CREATE POLICY "Admins can update contact messages" 
ON contact_messages 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for authenticated users (admins) to delete contact messages
CREATE POLICY "Admins can delete contact messages" 
ON contact_messages 
FOR DELETE 
TO authenticated
USING (true); 