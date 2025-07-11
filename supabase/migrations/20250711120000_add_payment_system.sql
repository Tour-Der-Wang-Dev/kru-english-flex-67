-- Add payment confirmations table for bank transfers
CREATE TABLE public.payment_confirmations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  course_plan_id TEXT NOT NULL,
  course_plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transfer_date DATE NOT NULL,
  transfer_time TIME NOT NULL,
  transfer_ref TEXT,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  slip_image_url TEXT,
  admin_note TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add live rooms table
CREATE TABLE public.live_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_plan_id TEXT NOT NULL,
  course_plan_name TEXT NOT NULL,
  room_name TEXT NOT NULL,
  room_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  max_participants INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin', -- 'admin', 'super_admin'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payment_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for payment_confirmations
CREATE POLICY "users_view_own_payments" ON public.payment_confirmations
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "users_insert_own_payments" ON public.payment_confirmations
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admins_view_all_payments" ON public.payment_confirmations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "admins_update_payments" ON public.payment_confirmations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Policies for live_rooms
CREATE POLICY "users_view_active_rooms" ON public.live_rooms
FOR SELECT
USING (is_active = true);

CREATE POLICY "admins_manage_rooms" ON public.live_rooms
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Policies for admin_users
CREATE POLICY "admins_view_admin_users" ON public.admin_users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_payment_confirmations_updated_at
BEFORE UPDATE ON public.payment_confirmations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_live_rooms_updated_at
BEFORE UPDATE ON public.live_rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default live rooms for each course plan
INSERT INTO public.live_rooms (course_plan_id, course_plan_name, room_name, room_url) VALUES
('general-english', 'General English', 'General English Live Class', 'https://zoom.us/j/placeholder-general'),
('cefr-english', 'CEFR English', 'CEFR English Live Class', 'https://zoom.us/j/placeholder-cefr'),
('combo-english', 'Combo English', 'Combo English Live Class', 'https://zoom.us/j/placeholder-combo'),
('small-group', 'Small Group Class', 'Small Group Live Class', 'https://zoom.us/j/placeholder-small-group');