const usaStates = [
  'alabama',
  'alaska',
  'arizona',
  'arkansas',
  'california',
  'colorado',
  'connecticut',
  'delaware',
  'florida',
  'georgia',
  'hawaii',
  'idaho',
  'illinois',
  'indiana',
  'iowa',
  'kansas',
  'kentucky',
  'louisiana',
  'maine',
  'maryland',
  'massachusetts',
  'michigan',
  'minnesota',
  'mississippi',
  'missouri',
  'montana',
  'nebraska',
  'nevada',
  'new hampshire',
  'new jersey',
  'new mexico',
  'new york',
  'north carolina',
  'north dakota',
  'ohio',
  'oklahoma',
  'oregon',
  'pennsylvania',
  'rhode island',
  'south carolina',
  'south dakota',
  'tennessee',
  'texas',
  'utah',
  'vermont',
  'virginia',
  'washington',
  'west virginia',
  'wisconsin',
  'wyoming',
]

export const isLocationInUSA = (location: string) => {
  // List of common US state and city names

  if (!location) {
    return false
  }

  // Convert the input location to lowercase for case-insensitive matching
  const lowercasedLocation = location.toLowerCase()

  // Check if any of the common US state or city names are present in the input string
  for (const state of usaStates) {
    if (lowercasedLocation.includes(state)) {
      return true
    }
  }

  // If no US state or city name matches found, check if the word "united states" is present
  if (lowercasedLocation.includes('united states')) {
    return true
  }

  // If none of the above conditions are met, assume the location is not in the United States
  return false

  // Test cases
  console.log(isLocationInUSA('New York')) // true
  console.log(isLocationInUSA('Los Angeles, California')) // true
  console.log(isLocationInUSA('Toronto, Canada')) // false
  console.log(isLocationInUSA('London, United Kingdom')) // false
}
