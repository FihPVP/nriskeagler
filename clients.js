// ===== EDIT HERE: news images and credits =====
// NOTE: client versions and game file paths are FIXED inside app.js
// (1.8.8, 1.12.2, 1.5.2, 1.21.11 -> games/<version>.html). They cannot be edited here.
window.CONFIG = {
  name: "NoRiskClient",
  build: "v0.2.0",
  favicon: "faviconnorisk.png",

  // Side news cards: real Minecraft images (from the Minecraft Wiki).
  // Add or replace entries any time. If an image fails to load, the card shows a clean fallback.
  news: [
    { tag: "BIOME",     title: "Cherry Grove",       url: "https://minecraft.wiki/w/Cherry_Grove",     img: "https://minecraft.wiki/images/Big_Cherry_Grove.jpeg" },
    { tag: "MOB",       title: "Camels at sunset",   url: "https://minecraft.wiki/w/Camel",            img: "https://minecraft.wiki/images/Camel_Sunset.jpeg" },
    { tag: "MOB",       title: "The Sniffer",        url: "https://minecraft.wiki/w/Sniffer",          img: "https://minecraft.wiki/images/Windswept_Sniffer.png" },
    { tag: "STRUCTURE", title: "Trial Chambers",     url: "https://minecraft.wiki/w/Trial_Chambers",   img: "https://minecraft.wiki/images/Trial_Chambers_unidentified_chamber_1.jpg" },
    { tag: "BIOME",     title: "Ice Spikes",         url: "https://minecraft.wiki/w/Ice_Spikes",       img: "https://minecraft.wiki/images/Minecraft_1.8.8_Biome_IceSpike_2.png" },
    { tag: "BIOME",     title: "Bamboo Jungle",      url: "https://minecraft.wiki/w/Bamboo_Jungle",    img: "https://minecraft.wiki/images/Bamboo_Galore.jpg" },
    { tag: "LANDSCAPE", title: "Minecraft landscape", url: "https://minecraft.wiki/w/Biome",           img: "https://minecraft.wiki/images/Minecraft_landscape1.png" }
  ],

  credits: [
    ["Original launcher/client", "[OWNER NAME]"],
    ["Permission", "Authorized use / reproduction with credit"],
    ["Eaglercraft", "[Eaglercraft credits]"],
    ["News images", "Minecraft Wiki / Mojang Studios"],
    ["Additional contributors", "[contributors]"]
  ]
};
