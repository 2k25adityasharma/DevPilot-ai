-- Today-only goals displayed within the Today's Developer Habits card.
CREATE TABLE IF NOT EXISTS public.habit_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target INTEGER NOT NULL DEFAULT 1 CHECK (target > 0),
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0),
    date DATE NOT NULL,
    category TEXT DEFAULT 'General',
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_habit_goals_user_date ON public.habit_goals(user_id, date);

ALTER TABLE public.habit_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own habit goals"
    ON public.habit_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own habit goals"
    ON public.habit_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habit goals"
    ON public.habit_goals FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habit goals"
    ON public.habit_goals FOR DELETE USING (auth.uid() = user_id);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'habit_goals'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.habit_goals;
    END IF;
END $$;
