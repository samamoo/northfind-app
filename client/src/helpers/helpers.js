  // Title case
  const titleCase = function(string) {
    const newString = string.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
    return newString;
  }

  const weightedAverage = (arr) => {
    console.log(arr)
    let weightedAvg = 0;
    let sumOfWeights = 0;
    let sumOfScores = 0;
    if (arr === []) {
      return 0;
    }
    for (const item of arr) {
      sumOfScores = sumOfScores + item.score;
      sumOfWeights = sumOfWeights + item.weight;
    }
    weightedAvg = sumOfScores / sumOfWeights;
    weightedAvg = (weightedAvg/5) *100;
    weightedAvg = Math.round(weightedAvg);
    return weightedAvg;
  };

  export { titleCase, weightedAverage };