export async function getPublicHolidays(year) {
  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
  if (!response.ok) {
    throw new Error('Unable to load public holidays.')
  }
  return response.json()
}
