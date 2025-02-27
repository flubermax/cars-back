function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

export const idfGenerator = () => {
  return String(getRandomInt(100, 999)).concat(Date.now())
}

