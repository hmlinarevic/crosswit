export const LOGO_PREFERENCE_KEY = "crosswit-logo-preference";

/**
 * @returns {{ fontClass: string, rightText?: string } | null}
 */
export function getLogoPreference() {
  if (typeof window === "undefined") return null;
  try {
    const s = localStorage.getItem(LOGO_PREFERENCE_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

/**
 * @param {{ fontClass: string, rightText?: string } | null} pref
 */
export function setLogoPreference(pref) {
  if (typeof window === "undefined") return;
  try {
    if (pref == null) {
      localStorage.removeItem(LOGO_PREFERENCE_KEY);
    } else {
      localStorage.setItem(LOGO_PREFERENCE_KEY, JSON.stringify(pref));
    }
    window.dispatchEvent(new CustomEvent("crosswit-logo-preference-change"));
  } catch {}
}
