module.exports = {
  helpers: {
    dateFormat: require("./../helpers/dateFormat")
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
        aboutTemplate: 'about/index',
        link: null
      },
      {
        name: "The Complete Thought",
        aboutTemplate: "about/the-complete-thought",
        link: "the-complete-thought"
      },
      {
        name: "Clients & Studio",
        aboutTemplate: "about/clients-studio",
        link: "clients-studio"
      }
    ]
  }
};
