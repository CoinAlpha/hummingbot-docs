import { colors as coreColors } from "gatsby-theme-apollo-core/src/utils/colors";
import { colors as spaceKitColors } from "@apollo/space-kit/colors";

/**
 * @todo Find a way to hook the brand colors up to this
 */
const hummingbot = {
  darkest: "#013D54",
  darker: "#04596E",
  dark: "#087887",
  base: "#0D999E",
  light: "#4ABBB6",
  lighter: "#8AD6CC",
  lightest: "#CCEFE7",
};

export const colors = {
  ...coreColors,
  primary: spaceKitColors.teal.dark,
  primaryLight: spaceKitColors.teal.base,
  primaryDark: spaceKitColors.teal.dark,
};
