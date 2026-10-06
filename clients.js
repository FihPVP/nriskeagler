// ===== EDIT HERE: names, game files, news and credits =====
window.CONFIG = {
  name: "NoRiskClient",
  build: "v0.1.0",
  favicon: "faviconnorisk.png",

  versions: [
    { id: "1.8.8",   label: "NoRiskClient 1.8.8",   url: "games/1.8.8.html" },
    { id: "1.12.2",  label: "NoRiskClient 1.12.2",  url: "games/1.12.2.html" },
    { id: "1.21.11", label: "NoRiskClient 1.21.11", url: "games/1.21.11.html" },
    { id: "26.2",    label: "NoRiskClient 26.2",    url: "games/26.2.html" },
    { id: "1.5.2",   label: "NoRiskClient 1.5.2",   url: "games/1.5.2.html" }
  ],

  // Side news cards. Put an image link in "img" to show a real picture.
  // If the image fails to load, the card keeps its Minecraft-style art.
  news: [
    { tag: "NEWS",       title: "Latest Minecraft news",  text: "Read the newest articles and patch notes.",      url: "https://www.minecraft.net/en-us/articles", art: "a1", icon: "newspaper",     img: "" },
    { tag: "SNAPSHOT",   title: "Snapshots & previews",   text: "Follow experimental builds and feedback.",       url: "https://feedback.minecraft.net/",          art: "a2", icon: "flask-conical", img: "" },
    { tag: "COMMUNITY",  title: "Community builds",       text: "Browse screenshots and creations from players.", url: "https://www.reddit.com/r/Minecraft/",      art: "a4", icon: "users",         img: "" },
    { tag: "MOBS",       title: "Mobs & features",        text: "Explore every mob, block and biome.",            url: "https://minecraft.wiki/",                  art: "a5", icon: "skull",         img: "" },
    { tag: "EXPLORE",    title: "The End and beyond",     text: "Discover dimensions, structures and bosses.",    url: "https://minecraft.wiki/w/The_End",         art: "a3", icon: "compass",       img: "" },
    { tag: "LANDSCAPES", title: "Biomes & landscapes",    text: "From snowy peaks to deep oceans.",               url: "https://minecraft.wiki/w/Biome",           art: "a6", icon: "mountain-snow", img: "" }
  ],

  credits: [
    ["Original launcher/client", "[OWNER NAME]"],
    ["Permission", "Authorized use / reproduction with credit"],
    ["Eaglercraft", "[Eaglercraft credits]"],
    ["Additional contributors", "[contributors]"]
  ]
};
