
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  pregnancy_week INTEGER,
  due_date DATE,
  has_pcos BOOLEAN DEFAULT FALSE,
  age INTEGER,
  height_cm INTEGER,
  weight_kg NUMERIC(5,2),
  blood_type TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  doctor_name TEXT,
  doctor_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create symptom logs table
CREATE TABLE public.symptom_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  symptom_type TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 10),
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create health records table
CREATE TABLE public.health_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  blood_sugar_fasting INTEGER,
  blood_sugar_post_meal INTEGER,
  weight_kg NUMERIC(5,2),
  bmi NUMERIC(4,2),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create health scores table
CREATE TABLE public.health_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_score NUMERIC(3,1) NOT NULL,
  blood_pressure_score INTEGER NOT NULL,
  blood_sugar_score INTEGER NOT NULL,
  weight_score INTEGER NOT NULL,
  symptom_score INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Stable', 'Caution', 'Critical')),
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create gamification points table
CREATE TABLE public.user_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_points INTEGER NOT NULL DEFAULT 0,
  daily_streak INTEGER NOT NULL DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  level INTEGER NOT NULL DEFAULT 1,
  weekly_goal INTEGER NOT NULL DEFAULT 50,
  weekly_progress INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for symptom_logs
CREATE POLICY "Users can view their own symptoms" ON public.symptom_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own symptoms" ON public.symptom_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own symptoms" ON public.symptom_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own symptoms" ON public.symptom_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_records
CREATE POLICY "Users can view their own health records" ON public.health_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health records" ON public.health_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health records" ON public.health_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health records" ON public.health_records
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_scores
CREATE POLICY "Users can view their own health scores" ON public.health_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health scores" ON public.health_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_points
CREATE POLICY "Users can view their own points" ON public.user_points
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own points" ON public.user_points
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own points" ON public.user_points
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  INSERT INTO public.user_points (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at for profiles
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
