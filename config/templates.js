module.exports = {
  helpers: {
    dateFormat: require("./../helpers/dateFormat")
  },
  partials: {
    head: "head",
    foot: "foot",
    projectView: "project-view"
  },
  globals: {
    site: {
      title: "Gulp Static",
      description: "Prototype for a Gulp based static site generator"
    }
  }
};
