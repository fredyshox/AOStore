var printMethods = (obj) => {
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        console.log(id + ": Function");
      }
    } catch (err) {
      console.log(id + ": inaccessible");
    }
  }
};

module.exports = printMethods;
