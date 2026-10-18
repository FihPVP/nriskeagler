// ===== EDIT HERE: news and credits =====
// NOTE: client versions and game file paths are FIXED inside app.js
// (1.8.8, 1.12.2, 1.5.2, 26.2 -> games/<version>.html). They cannot be edited here.
window.CONFIG = {
  name: "NoRiskClient",
  build: "v0.3.0",
  favicon: "faviconnorisk.png",

  // News panel (right side of the Play page). Images are stored in the news/ folder.
  news: [
    { tag: "CLIENT",    title: "NoRisk Client 1.8.8 is live",        desc: "A new look, a custom main menu and one clean menu for every mod.", img: "news/menu.jpg" },
    { tag: "MODS",      title: "73 mods in one menu",                 desc: "Open the NoRisk Menu from the main menu, or press Right Shift in game.", img: "news/ingame.jpg" },
    { tag: "FPS",       title: "Pick your PC: Potato, Laptop or PC",  desc: "One click sets render distance, graphics and FPS boosters for your computer.", img: "news/presets.png" },
    { tag: "CROSSHAIR", title: "Build your own crosshair",            desc: "Paint a 15x15 crosshair and add an indicator that shows when a target is in range.", img: "news/crosshair.png" },
    { tag: "SKINS",     title: "New built-in skins",                  desc: "Soft Girl, Soft Boy, Emo Girl and Emo Boy join Steve and Alex.", img: "news/skins.png" }
  ],

  // The real mod list of NoRisk Client 1.8.8: [name, description, on by default, category]
  mods: [
 [
  "Coordinates",
  "Shows your current coordinates.",
  true,
  "HUD"
 ],
 [
  "FPS",
  "Shows your current frames per second (FPS).",
  true,
  "HUD"
 ],
 [
  "CPS",
  "Shows how many times per second you click.",
  true,
  "HUD"
 ],
 [
  "Ping",
  "Shows your latency to the server.",
  true,
  "HUD"
 ],
 [
  "Keystrokes",
  "Visualize your keyboard inputs in real-time.",
  false,
  "HUD"
 ],
 [
  "Armor",
  "Shows your armor and its durability.",
  false,
  "HUD"
 ],
 [
  "Potion Effects",
  "Shows your active potion effects and how long they last.",
  false,
  "HUD"
 ],
 [
  "Direction",
  "Shows the direction you are facing.",
  false,
  "HUD"
 ],
 [
  "Compass Bar",
  "Adds a compass tape at the top of your screen.",
  false,
  "HUD"
 ],
 [
  "Health & Food",
  "Shows your health and hunger.",
  false,
  "HUD"
 ],
 [
  "Target Info",
  "Shows name, health and distance of the entity you are looking at.",
  false,
  "HUD"
 ],
 [
  "Inventory",
  "Shows the contents of your inventory on screen.",
  false,
  "HUD"
 ],
 [
  "Item Count",
  "Tracks how many of your held item (or arrows with a bow) you have.",
  false,
  "HUD"
 ],
 [
  "Server Info",
  "Shows the server you are on and how many players are online.",
  false,
  "HUD"
 ],
 [
  "Waypoint List",
  "Shows your nearest waypoints, their distance and direction.",
  false,
  "HUD"
 ],
 [
  "Speed",
  "Shows how fast you are moving in blocks per second.",
  false,
  "HUD"
 ],
 [
  "Biome",
  "Shows the name of the biome you are in.",
  false,
  "HUD"
 ],
 [
  "Clock",
  "Shows your real time or the time of day in Minecraft.",
  false,
  "HUD"
 ],
 [
  "Combo Counter",
  "Shows how many hits in a row you have landed.",
  false,
  "HUD"
 ],
 [
  "Reach Display",
  "Shows the distance of your last hit in blocks.",
  false,
  "HUD"
 ],
 [
  "Day Counter",
  "Shows which in-game day you are on.",
  false,
  "HUD"
 ],
 [
  "Looking At",
  "Shows the block or entity you are looking at and how far away it is.",
  false,
  "HUD"
 ],
 [
  "Light Level",
  "Shows the light level where you are standing.",
  false,
  "HUD"
 ],
 [
  "Nether Coordinates",
  "Shows what your coordinates would be in the other dimension.",
  false,
  "HUD"
 ],
 [
  "Chunk Coordinates",
  "Shows which chunk you are standing in.",
  false,
  "HUD"
 ],
 [
  "Session Timer",
  "Shows how long you have been playing this session.",
  false,
  "HUD"
 ],
 [
  "Saturation",
  "Shows your saturation as a golden outline on the hunger bar.",
  false,
  "HUD"
 ],
 [
  "Armor Points",
  "Shows how many armor points you have.",
  false,
  "HUD"
 ],
 [
  "Held Item",
  "Shows the name and remaining durability of the item in your hand.",
  false,
  "HUD"
 ],
 [
  "Rotation",
  "Shows the direction you are looking in degrees.",
  false,
  "HUD"
 ],
 [
  "Entity Count",
  "Shows how many entities are loaded around you.",
  false,
  "HUD"
 ],
 [
  "Movement State",
  "Shows if you are sprinting, sneaking, flying or walking.",
  false,
  "HUD"
 ],
 [
  "Potion Counter",
  "Counts the potions in your inventory.",
  false,
  "HUD"
 ],
 [
  "Fullbright",
  "Removes darkness and improves visibility in all areas.",
  true,
  "Render"
 ],
 [
  "Low Fire",
  "Lowers the fire overlay so you can see while burning.",
  true,
  "Render"
 ],
 [
  "Crosshair",
  "Design your own crosshair in a pixel editor.",
  false,
  "Render"
 ],
 [
  "Crosshair Indicator",
  "Shows a shape around your crosshair when a target is in hit range.",
  true,
  "Render"
 ],
 [
  "Hide HUD",
  "Hide the hotbar background, status bars, boss bar or scoreboard.",
  false,
  "Render"
 ],
 [
  "No Hurt Cam",
  "Stops the screen from shaking when you take damage.",
  false,
  "Render"
 ],
 [
  "FOV Changer",
  "Set your field of view beyond the normal slider range.",
  false,
  "Render"
 ],
 [
  "Hit Color",
  "Changes the color entities flash when you hit them.",
  false,
  "Render"
 ],
 [
  "Glint Colorizer",
  "Changes the color of the enchantment glint.",
  false,
  "Render"
 ],
 [
  "Hitboxes",
  "Shows the hitboxes of entities around you, in any color.",
  false,
  "Render"
 ],
 [
  "Render Distance",
  "Sets how many chunks you can see. Lower is a lot faster.",
  false,
  "FPS"
 ],
 [
  "Fast Graphics",
  "Switches to fast graphics (simpler leaves, water and effects) for more FPS.",
  false,
  "FPS"
 ],
 [
  "Smooth Lighting Off",
  "Turns off smooth lighting. Big FPS gain on weak PCs.",
  false,
  "FPS"
 ],
 [
  "No Clouds",
  "Removes clouds from the sky for more FPS.",
  false,
  "FPS"
 ],
 [
  "Minimal Particles",
  "Reduces particles to the minimum for more FPS.",
  false,
  "FPS"
 ],
 [
  "No Entity Shadows",
  "Turns off the dark circles under entities.",
  false,
  "FPS"
 ],
 [
  "Uncapped FPS",
  "Turns off VSync so the game can run above your screen refresh rate.",
  false,
  "FPS"
 ],
 [
  "Entity Culling",
  "Does not draw mobs, players and dropped items that are far away.",
  false,
  "FPS"
 ],
 [
  "Block Entity Culling",
  "Does not draw chests, signs, banners and similar blocks that are far away.",
  false,
  "FPS"
 ],
 [
  "No Weather Rendering",
  "Does not draw rain and snow. Large FPS gain during storms.",
  false,
  "FPS"
 ],
 [
  "No Enchant Glint",
  "Turns off the enchantment shine on items.",
  false,
  "FPS"
 ],
 [
  "No Texture Animations",
  "Freezes animated textures like water, lava and fire.",
  false,
  "FPS"
 ],
 [
  "Hide Hand",
  "Does not draw your hand or held item.",
  false,
  "FPS"
 ],
 [
  "No FXAA",
  "Turns off FXAA anti-aliasing for more FPS.",
  false,
  "FPS"
 ],
 [
  "No Shaders",
  "Turns off shader effects, the heaviest option in the game.",
  false,
  "FPS"
 ],
 [
  "No Dynamic Lights",
  "Turns off lights that move with held torches and similar items.",
  false,
  "FPS"
 ],
 [
  "Fast Skins",
  "Uses simpler player models for better FPS in crowded servers.",
  false,
  "FPS"
 ],
 [
  "No Sky",
  "Does not draw the sun, moon, stars and sky details.",
  false,
  "FPS"
 ],
 [
  "No Fire Overlay",
  "Hides the fire on your screen while you are burning.",
  false,
  "FPS"
 ],
 [
  "Particle Filter",
  "Hides chosen particle types to reduce lag.",
  false,
  "FPS"
 ],
 [
  "Block Outline",
  "Change the color, opacity and thickness of the block outline.",
  false,
  "Render"
 ],
 [
  "No Water Overlay",
  "Removes the blue water overlay when your head is underwater.",
  false,
  "Render"
 ],
 [
  "No View Bobbing",
  "Stops the camera from swaying while you walk.",
  false,
  "Render"
 ],
 [
  "Static FOV",
  "Keeps your FOV the same while sprinting or using speed effects.",
  false,
  "Render"
 ],
 [
  "Cinematic Camera",
  "Smooths your camera movement for recording.",
  false,
  "Render"
 ],
 [
  "Toggle Sprint",
  "Automatically sprints while you move forward.",
  false,
  "Player"
 ],
 [
  "Toggle Sneak",
  "Tap the sneak key to sneak, tap again to stop.",
  false,
  "Player"
 ],
 [
  "Time Changer",
  "Locks the time of day you see (only for you).",
  false,
  "World"
 ],
 [
  "Weather Changer",
  "Choose clear, rainy or stormy weather (only for you).",
  false,
  "World"
 ],
 [
  "Waypoints",
  "Create waypoints to navigate in your world.",
  false,
  "World"
 ]
],

  credits: [
    ["Original launcher/client", "[OWNER NAME]"],
    ["Permission", "Authorized use / reproduction with credit"],
    ["Eaglercraft", "EaglercraftX by lax1dude"],
    ["Minecraft", "Mojang Studios"],
    ["Additional contributors", "[contributors]"]
  ]
};
