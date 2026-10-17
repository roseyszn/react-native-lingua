import { fontFamilies } from "./fonts";

export const typography = {
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38.4,
  },
  h2: {
    fontFamily: fontFamilies.semibold,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 31.2,
  },
  h3: {
    fontFamily: fontFamilies.semibold,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  h4: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22.4,
  },
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25.6,
  },
  bodyMedium: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22.4,
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20.8,
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 15.4,
  },
} as const;
