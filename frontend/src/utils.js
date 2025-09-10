export const STORAGE_KEY = "shortly:urls";

export const loadStore = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

export const saveStore = (s) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));

const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const randomSlug = (len = 6) =>
  Array.from({ length: len }, () =>
    base62[Math.floor(Math.random() * base62.length)]
  ).join("");

export const normalizeUrl = (url) => {
  try {
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    return new URL(url).toString();
  } catch {
    return null;
  }
};
