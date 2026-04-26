'use client';

export const compareRows = [
  {
    label: "Display sizes",
    a: `65" / 75" / 86"`,
    b: `75" / 86" / 98"`,
    c: `105"`,
  },
  {
    label: "Resolution",
    a: "4K UHD (3840×2160)",
    b: "4K UHD",
    c: "5K (5120×2160)",
  },
  { label: "Aspect ratio", a: "16:9", b: "16:9", c: "21:9" },
  { label: "Touch points", a: "20-point IR", b: "40-point IR", c: "20-point IR" },
  {
    label: "Built-in conferencing",
    a: "Add-on",
    b: "Yes (4K cam + array mic)",
    c: "Yes",
  },
  { label: "Wireless casting", a: "Yes", b: "Yes (multi-source)", c: "Yes" },
  { label: "OPS PC slot", a: "Yes", b: "Yes", c: "Yes" },
  { label: "Warranty", a: "5 years", b: "5 years", c: "5 years" },
] as const;

export const dimensionRows = [
  {
    size: `65"`,
    active: `57.0" × 32.1"`,
    outer: `60.0" × 36.5" × 3.4"`,
    weight: "88 lbs",
    vesa: "VESA 600 × 400",
  },
  {
    size: `75"`,
    active: `65.7" × 37.0"`,
    outer: `68.7" × 41.5" × 3.6"`,
    weight: "121 lbs",
    vesa: "VESA 800 × 400",
  },
  {
    size: `86"`,
    active: `75.4" × 42.4"`,
    outer: `78.5" × 47.0" × 3.8"`,
    weight: "159 lbs",
    vesa: "VESA 800 × 600",
  },
  {
    size: `98"`,
    active: `85.6" × 48.1"`,
    outer: `88.7" × 52.7" × 4.1"`,
    weight: "210 lbs",
    vesa: "VESA 800 × 600",
  },
  {
    size: `105"`,
    active: `96.5" × 40.6" (21:9)`,
    outer: `99.6" × 45.2" × 4.3"`,
    weight: "243 lbs",
    vesa: "VESA 800 × 600",
  },
] as const;

