import { createClient } from '@supabase/supabase-js'

const CARDS_BUCKET = 'career-cards'
const CARDS_TABLE = 'career_cards'

let client = null

function getClient() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey || url.includes('your_supabase') || anonKey.includes('your_supabase')) {
    throw new Error(
      'Supabase is not configured — add a real VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local',
    )
  }

  if (!client) {
    client = createClient(url, anonKey)
  }

  return client
}

function slugify(text) {
  return (text || 'explorer')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function saveCareerCard({ imageDataUrl, name, career }) {
  const supabase = getClient()

  const blob = await (await fetch(imageDataUrl)).blob()
  const fileName = `${Date.now()}-${slugify(name)}.png`

  const { error: uploadError } = await supabase.storage
    .from(CARDS_BUCKET)
    .upload(fileName, blob, { contentType: 'image/png' })

  if (uploadError) throw uploadError

  const { data: publicUrlData } = supabase.storage.from(CARDS_BUCKET).getPublicUrl(fileName)

  const { error: insertError } = await supabase.from(CARDS_TABLE).insert({
    name,
    career_title: career.title,
    designation: career.designation,
    workplace: career.workplace,
    image_url: publicUrlData.publicUrl,
  })

  if (insertError) throw insertError

  return publicUrlData.publicUrl
}
