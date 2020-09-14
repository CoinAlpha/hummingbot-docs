import { colors as coreColors } from "gatsby-theme-apollo-core/src/utils/colors";
import { colors as spaceKitColors } from "@apollo/space-kit/colors";

export const colors = {
  ...coreColors,
  primary: spaceKitColors.green.dark,
  primaryLight: spaceKitColors.green.light,
  primaryDark: spaceKitColors.green.darkest,
};
