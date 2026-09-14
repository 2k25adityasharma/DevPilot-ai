-- ==============================================================================
-- DevPilot-AI: Consistency & Habit Tracker Database Schema Migration
-- Designed for Supabase / PostgreSQL with Row Level Security (RLS) & Realtime
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. HABITS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT DEFAULT 'General',
    target_frequency TEXT DEFAULT 'daily' CHECK (target_frequency IN ('daily', 'weekdays', 'custom')),
    custom_days INTEGER[] DEFAULT '{1,2,3,4,5}', -- 0 = Sun, 1 = Mon ... 6 = Sat
    reminder_time TEXT DEFAULT '',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_user_active ON public.habits(user_id, active);

-- Enable RLS
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Habits RLS Policies
CREATE POLICY "Users can view their own habits"
    ON public.habits FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits"
    ON public.habits FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
    ON public.habits FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
    ON public.habits FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- 3. HABIT COMPLETIONS TABLE (Normalized, Idempotent)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
    completion_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_habit_completion UNIQUE (user_id, habit_id, completion_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_habit_completions_user_date ON public.habit_completions(user_id, completion_date);
CREATE INDEX IF NOT EXISTS idx_habit_completions_habit_id ON public.habit_completions(habit_id);

-- Enable RLS
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;

-- Habit Completions RLS Policies
CREATE POLICY "Users can view their own completions"
    ON public.habit_completions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own completions"
    ON public.habit_completions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own completions"
    ON public.habit_completions FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- 4. DAILY GOALS TABLE (Separate Entity & Numeric Progress)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.daily_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target INTEGER DEFAULT 1 CHECK (target > 0),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0),
    date DATE NOT NULL,
    category TEXT DEFAULT 'General',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_daily_goals_user_date ON public.daily_goals(user_id, date);

-- Enable RLS
ALTER TABLE public.daily_goals ENABLE ROW LEVEL SECURITY;

-- Daily Goals RLS Policies
CREATE POLICY "Users can view their own daily goals"
    ON public.daily_goals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own daily goals"
    ON public.daily_goals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily goals"
    ON public.daily_goals FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily goals"
    ON public.daily_goals FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- 5. WEEKLY GOALS TABLE (Calendar Week Scoped)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.weekly_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    habit_id UUID REFERENCES public.habits(id) ON DELETE SET NULL,
    target INTEGER DEFAULT 5 CHECK (target > 0),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0),
    unit TEXT DEFAULT 'completions',
    week_key TEXT NOT NULL, -- e.g. '2026-W38'
    category TEXT DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_weekly_goals_user_week ON public.weekly_goals(user_id, week_key);

-- Enable RLS
ALTER TABLE public.weekly_goals ENABLE ROW LEVEL SECURITY;

-- Weekly Goals RLS Policies
CREATE POLICY "Users can view their own weekly goals"
    ON public.weekly_goals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own weekly goals"
    ON public.weekly_goals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly goals"
    ON public.weekly_goals FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weekly goals"
    ON public.weekly_goals FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- 6. ENABLE REALTIME PUBLICATION
-- ==============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'habits'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.habits;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'habit_completions'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.habit_completions;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'daily_goals'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_goals;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'weekly_goals'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.weekly_goals;
    END IF;
END $$;
