import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("brand_profiles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profiles: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    name, niche, platforms, voice, audience, is_default,
    instagram_handle, tiktok_handle, content_themes, top_performing_patterns, ai_analysis,
  } = body;

  if (!name?.trim() || !niche?.trim()) {
    return NextResponse.json({ error: "Name and niche are required" }, { status: 400 });
  }

  // If setting as default, unset other defaults first
  if (is_default) {
    await supabase
      .from("brand_profiles")
      .update({ is_default: false, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("is_default", true);
  }

  const { data, error } = await supabase
    .from("brand_profiles")
    .insert({
      user_id: user.id,
      name: name.trim(),
      niche: niche.trim(),
      platforms: platforms ?? [],
      voice: voice?.trim() || null,
      audience: audience?.trim() || null,
      instagram_handle: instagram_handle?.trim() || null,
      tiktok_handle: tiktok_handle?.trim() || null,
      content_themes: content_themes ?? [],
      top_performing_patterns: top_performing_patterns?.trim() || null,
      ai_analysis: ai_analysis ?? null,
      is_default: is_default ?? false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });

  // If setting as default, unset other defaults first
  if (updates.is_default) {
    await supabase
      .from("brand_profiles")
      .update({ is_default: false, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("is_default", true);
  }

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.name !== undefined && updates.name) patch.name = updates.name.trim();
  if (updates.niche !== undefined && updates.niche) patch.niche = updates.niche.trim();
  if (updates.platforms !== undefined) patch.platforms = updates.platforms;
  if (updates.voice !== undefined) patch.voice = updates.voice?.trim() || null;
  if (updates.audience !== undefined) patch.audience = updates.audience?.trim() || null;
  if (updates.instagram_handle !== undefined) patch.instagram_handle = updates.instagram_handle?.trim() || null;
  if (updates.tiktok_handle !== undefined) patch.tiktok_handle = updates.tiktok_handle?.trim() || null;
  if (updates.content_themes !== undefined) patch.content_themes = updates.content_themes;
  if (updates.top_performing_patterns !== undefined) patch.top_performing_patterns = updates.top_performing_patterns?.trim() || null;
  if (updates.ai_analysis !== undefined) patch.ai_analysis = updates.ai_analysis;
  if (updates.is_default !== undefined) patch.is_default = updates.is_default;

  const { data, error } = await supabase
    .from("brand_profiles")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });

  const { error } = await supabase
    .from("brand_profiles")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
