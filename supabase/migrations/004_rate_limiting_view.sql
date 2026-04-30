-- 004_rate_limiting_view.sql
-- Creates a SQL function to return today's usage count for a given user and tool.

CREATE OR REPLACE FUNCTION public.get_daily_usage(p_user_id uuid, p_tool tool_name)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM generations
  WHERE user_id = p_user_id
    AND tool = p_tool
    AND created_at >= (now() AT TIME ZONE 'UTC')::date;
$$;
