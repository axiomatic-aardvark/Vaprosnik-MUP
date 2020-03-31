export const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const formatChosenGroup = group => {
  if (group === "bpleven") {
    return "Биология - МУ Плевен";
  } else if (group === "hpleven") {
    return "Химия - МУ Плевен";
  } else if (group === "bplovdiv") {
    return "Биология - МУ Пловдив";
  } else if (group === "hplovdiv") {
    return "Химия - МУ Пловдив";
  }
};
