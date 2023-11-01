// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/OpenKWRTool",
    buildAssetsDir: 'assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title:"Open source Keyword research tool"
    }
  },
  nitro: { output: { publicDir: "../nandolopez.github.io/OpenKWRTool" } },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vuestic/nuxt"],
  ssr: false,
  vuestic: {
    config: {
      colors: {
        variables: {
          primary: "#3E82F8",
          secondary: "#818992",
          success: "#03505C",
          info: "#1E429F",
          danger: "#F87F7F",
          warning: "#F9CA16",
          backgroundPrimary: "#111827",
          backgroundSecondary: "#1E262F",
          backgroundElement: "#111827",
          backgroundBorder: "#3D4C58",
          textPrimary: "#F1F1F1",
          textInverted: "#0B121A",
          shadow: "rgba(255, 255, 255, 0.12)",
          focus: "#3E82F8",
          transparent: "rgba(0, 0, 0, 0)",
          backgroundLanding: "#070d14",
          backgroundLandingBorder: "rgba(43, 49, 56, 0.8)",
        },
      },
    },

    css: ["typography", "reset"],
  },
});
