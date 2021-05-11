  // Title case
  const titleCase = function(string) {
    const newString = string.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
    return newString;
  }

  export { titleCase };