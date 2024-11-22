import { useCallback, useEffect, useRef } from "react";

const FOLDER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>`;
const FILE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

const ICON_MANIFEST = {
  folder: FOLDER_ICON,
  file: FILE_ICON,
};

export type IconNames = keyof typeof ICON_MANIFEST;

export type IconEntries = [
  iconName: keyof typeof ICON_MANIFEST,
  { img: HTMLImageElement; src: string }
];

export type IconObj = { img: HTMLImageElement; src: string };
export type IconMap = Map<string, IconObj>;

export function useIcons() {
  const iconMap = useRef(new Map<string, IconObj>());

  const getIcons = useCallback<() => Promise<IconMap>>(async () => {
    if (iconMap.current.values.length !== 0) {
      return iconMap.current;
    }
    // create some promises
    const loadIcon = Object.entries(ICON_MANIFEST).map<Promise<IconEntries>>(
      ([iconName, svg]) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const svgBlob = new Blob([svg], {
            type: "image/svg+xml;charset=utf-8",
          });
          const url = URL.createObjectURL(svgBlob);

          img.onload = () => {
            URL.revokeObjectURL(url); // Clean up URL
            resolve([iconName as IconNames, { img, src: svg }]);
          };

          img.onerror = (err) => {
            URL.revokeObjectURL(url); // Clean up URL
            reject(err);
          };

          img.src = url;
        });
      }
    );
    const results = await Promise.all(loadIcon);
    for (const [iconName, iconObj] of results) {
      iconMap.current.set(iconName, iconObj);
    }
    return iconMap.current;
  }, []);

  useEffect(() => {
    getIcons();
  }, [getIcons]);

  return { getIcons };
}
