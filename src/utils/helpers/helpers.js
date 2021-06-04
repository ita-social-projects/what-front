export class Cookie{
  static set(cname, cvalue, exdays) {
      const currentDay = new Date();
      currentDay.setTime(currentDay.getTime() + (exdays * 24 * 60 * 60 * 1000));

      const expires = `expires=${currentDay.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }
  static get(cname) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${cname.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  static del(cname){
      document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export class CommonHelpers {
  static capitalizeTheme = (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
}