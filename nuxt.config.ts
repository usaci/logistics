// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      charset: 'utf-8', 
      viewport: 'width=device-width, initial-scale=1.0', 
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap&family=Noto+Sans+JP&display=swap" }
      ],

      title: "物流とわたしたち | 物流2024年問題を考える", 
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ]
    }
  }
})
