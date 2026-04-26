'use client';

export const ledLineup = [
  {
    name: "Virtual LED Poster",
    badge: "Bestseller",
    sizes: `75" portrait · P1.8 / P2.5`,
    desc: "Standalone, freestanding LED poster. Built-in player, hot-swappable. Deployed at UCA (6 units) — the photos in our gallery are from this install.",
    imageSrc: "/products/led-poster-portrait-BDyzoSlM.png",
  },
  {
    name: "Virtual LED Video Wall",
    badge: "Modular",
    sizes: "Modular cabinets · Any size",
    desc: "Seamless direct-view LED cabinets for galleries, lobbies, atriums, gyms, and event spaces. Build it to fit the wall — not the other way around.",
    imageSrc: "/products/led-cabinet-integration-Db-ZWsBf.jpg",
  },
  {
    name: "Gym Scoreboard Display",
    badge: "Sports",
    sizes: "Custom configurations",
    desc: "Indoor LED scoreboards and team-info displays for high school and college gyms. Designed for high-brightness, wide-angle visibility.",
    imageSrc: "/products/led-scoreboard-gym-DcOkbaOy.png",
  },
] as const;

export const signageLineup = [
  {
    name: "Menu Board Displays",
    badge: "Hospitality",
    sizes: `43" · 55" · 65" · portrait or landscape`,
    desc: "Bright commercial-grade LCDs for QSR menu walls, cafés, and cafeterias. 24/7-rated panels with simple cloud playlist management.",
    imageSrc: "/products/led-poster-portrait-BDyzoSlM.png",
  },
  {
    name: "Wayfinding & Lobby Signage",
    badge: "Public spaces",
    sizes: `32" – 86" · touch optional`,
    desc: "Digital directories, room-booking displays, and lobby welcome screens for offices, schools, hospitals, and government buildings.",
    imageSrc: "/products/led-cabinet-integration-Db-ZWsBf.jpg",
  },
  {
    name: "High-Bright Window Displays",
    badge: "Storefront",
    sizes: `43" · 55" · 75" · 2,500+ nits`,
    desc: "Sun-readable LCDs designed for storefronts and atriums. Visible through glass even in direct sunlight.",
    imageSrc: "/products/led-scoreboard-gym-DcOkbaOy.png",
  },
] as const;

export const accessoriesLineup = [
  {
    name: "OPS Computers",
    desc: "Slot-in Windows PCs that turn any panel into a full workstation. i5 / i7 configurations stocked in the U.S.",
    icon: "cpu" as const,
  },
  {
    name: "Cameras & Conferencing",
    desc: "4K USB cameras, auto-framing camera bars, and ceiling array mics for hybrid classrooms and meeting rooms.",
    icon: "video" as const,
  },
  {
    name: "Audio & Microphones",
    desc: "Wireless lavalier kits, ceiling speaker arrays, and beamforming mics tuned for room-scale capture.",
    icon: "volume" as const,
  },
  {
    name: "Keyboards & Input",
    desc: "Wireless keyboard/trackpad combos and presenter remotes designed for OPS PCs and wall-mounted panels.",
    icon: "keyboard" as const,
  },
  {
    name: "Stands & Mobile Carts",
    desc: "Height-adjustable mobile carts, fixed-wall mounts, and tilt mounts rated for every panel size we sell.",
    icon: "hand" as const,
  },
  {
    name: "Cables & Connectivity",
    desc: "HDMI 2.1, USB-C, Cat6, and active optical runs for in-wall installations. Lengths cut to spec.",
    icon: "cable" as const,
  },
] as const;

export const softwareFeatures = [
  {
    title: "Palm-to-screen touch",
    desc: "Wipe with your palm to erase. Write with a finger. Switch to pen for precision. No mode switching — the panel knows what you mean.",
    icon: "hand",
  },
  {
    title: "Built-in whiteboard",
    desc: "Infinite canvas, multi-page, save-and-share. Works with any input device, no software install required.",
    icon: "pen",
  },
  {
    title: "Wireless casting",
    desc: "Cast from any device — Mac, Windows, iOS, Android, Chromebook — without dongles or driver downloads.",
    icon: "wifi",
  },
  {
    title: "Multi-touch collaboration",
    desc: "Up to 40 simultaneous touch points (depending on model). Multiple students or teammates work the panel at once.",
    icon: "users",
  },
] as const;

