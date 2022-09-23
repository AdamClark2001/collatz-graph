export const collatzOrbit = (number) => {
  let currentNumber = number
  const orbit = [currentNumber]

  while (currentNumber !== 1) {
    if (currentNumber % 2 === 0) {
      currentNumber = currentNumber / 2
    } else {
      currentNumber = currentNumber * 3 + 1
    }

    orbit.push(currentNumber);
  }

  return orbit
}
