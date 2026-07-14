import Anthropic from '@anthropic-ai/sdk'

const UAE_WORKPLACES = [
  'DEWA',
  'SEWA',
  'RTA',
  'EDGE Group',
  'Dubai Police',
  'DHA',
  'Etihad Rail',
  'Al Futtaim',
  'Military',
  'Hospitals',
  'Own Business',
]

function buildPrompt(skillLabels) {
  return `You are a fun and encouraging career advisor for kids aged 10–12 in the UAE.

The child's selected skills are: ${skillLabels.join(', ')}

Based ONLY on these skills, suggest exactly 3 career paths. For each career:
1. Give a job title (e.g. "Robotics Engineer")
2. A UAE workplace from this list: [${UAE_WORKPLACES.join(', ')}]
3. A match percentage (how well the skills align) — be honest, range 60–99%
4. A fun job designation title (e.g. "Sr. Robotics Specialist")
5. A short inspiring message (max 2 sentences, written TO the child, age-appropriate)
6. 4 fun tips on how to reach this career (for the back of their card)

Respond in valid JSON only, no extra text:
{
  "careers": [
    {
      "title": "...",
      "designation": "...",
      "workplace": "...",
      "matchPercent": 90,
      "message": "...",
      "tips": ["...", "...", "...", "..."]
    }
  ]
}`
}

function parseCareers(responseText) {
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : responseText)
  if (!Array.isArray(parsed.careers) || parsed.careers.length === 0) {
    throw new Error('Unexpected response shape from Claude')
  }
  return parsed.careers
}

export async function getCareerRecommendations(skillLabels, { timeoutMs = 15000 } = {}) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Missing VITE_ANTHROPIC_API_KEY')
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const response = await client.messages.create(
    {
      model: 'claude-haiku-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: buildPrompt(skillLabels) }],
    },
    { timeout: timeoutMs },
  )

  const textBlock = response.content.find((block) => block.type === 'text')
  if (!textBlock) {
    throw new Error('No text content in Claude response')
  }

  return parseCareers(textBlock.text)
}
