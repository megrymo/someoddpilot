module.exports = {
  helpers: {
    dateFormat: require("./../src/helpers/dateFormat")
  },
  partials: {
    head: "head",
    foot: "foot",
    mainNav: "main-nav",
    aboutNav: "about-nav",
    aboutProfile: "about-profile",
    workBlock: "work-block",
    workBlockImage: "work-block-image",
    workBlockTitle: "work-block-title",
    workTopHeader: "work-top-header",
    workSectionHeader: "work-section-header",
    workStack: "work-stack"
  },
  globals: {
    site: {
      title: "someoddpilot",
      description: "Lorem"
    },
    navFeatures: [
      {
        name: "Reel",
        link: null
      },
      {
        name: "Clients",
        link: "/about/clients-studio#clients"
      },
      {
        name: "Public Works",
        link: null
      }
    ],
    aboutNav: [
      {
        name: "Truth, Vision & Wonder",
        numeral: "I",
        aboutTemplate: 'about/index',
        link: null
      },
      {
        name: "The Complete Thought",
        numeral: "II",
        aboutTemplate: "about/the-complete-thought",
        link: "the-complete-thought"
      },
      {
        name: "Clients & Studio",
        numeral: "III",
        aboutTemplate: "about/clients-studio",
        link: "clients-studio"
      }
    ]
  }
};
