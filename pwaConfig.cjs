const withPWA = require("next-pwa")({
    dest: "public",
    fallbacks: {
      document: "/offline",
    },
  });
  
  module.exports = withPWA;
  