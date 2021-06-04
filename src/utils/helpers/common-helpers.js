export class CommonHelpers {
  static capitalizeTheme = (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
}