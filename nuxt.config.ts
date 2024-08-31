// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-08-18",
  devtools: { enabled: true },
  ignore:  [
    'pages/enroll.vue',
  ],
  modules: [
    "@nuxt/ui",
    '@nuxt/fonts',
    'nuxt-vuefire',
  ],
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: "AIzaSyA_sRoMYbMnrbeHj6zHeelAoVX-3H2usDI",
      authDomain: "daboss-tournament-locri.firebaseapp.com",
      projectId: "daboss-tournament-locri",
      storageBucket: "daboss-tournament-locri.appspot.com",
      messagingSenderId: "134958375917",
      appId: "1:134958375917:web:2a00ed4174bea16bf07de4",
      measurementId: "G-GXBVM4WK2G"
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side

    // Keys within public, will be also exposed to the client-side
    public: {}
  }
})