export const validateProperty = (value: string | undefined) => {
  if (typeof value === 'undefined') return undefined
  if (typeof value === 'string' && value.trim() === '') return undefined
  if (typeof value === 'string' && value.trim() !== '') {
    if (isNaN(Number(value))) return value
    return Number(value)
  }
}
