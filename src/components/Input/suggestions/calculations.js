import math from 'mathjs'

export default async function calculations(query) {
  if (!query.startsWith('=')) {
    return null
  }

  // Wait for next parcel-bundler update
  // let math = await import('mathjs')

  query = query.substr(1)
  try {
    const result = math.eval(query)

    return {
      type: 'text',
      value: result.toString(),
    }
  } catch (e) {
    return null
  }
}
