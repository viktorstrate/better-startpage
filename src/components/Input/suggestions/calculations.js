import { eval as mathEval } from 'mathjs'

export default async function calculations(query) {
  if (!query.startsWith('=')) {
    return null
  }

  // let math = await import('mathjs')

  query = query.substr(1)
  try {
    const result = mathEval(query)

    return {
      type: 'text',
      value: result.toString(),
    }
  } catch (e) {
    return null
  }
}
