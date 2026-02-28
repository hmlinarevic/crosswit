export const LOGO_PREFERENCE_KEY = "crosswit-logo-preference";

/**
 * @returns {{ fontClass?: string, rightText?: string, colorClass?: string } | null}
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
 * @param {{ fontClass?: string, rightText?: string, colorClass?: string } | null} pref
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

/**
 * Set only the logo color, merging with existing preference.
 * @param {string | null} colorClass e.g. "text-white", "text-iris", or null to clear
 */
export function setLogoColorPreference(colorClass) {
  const existing = getLogoPreference() ?? {};
  if (colorClass == null) {
    const { colorClass: _, ...rest } = existing;
    setLogoPreference(Object.keys(rest).length ? rest : null);
  } else {
    setLogoPreference({ ...existing, colorClass });
  }
}

/**
 * Set only the brain icon color, merging with existing preference.
 * @param {{ iconColorClass?: string | null; iconColorHex?: string | null }} options
 *   - iconColorClass: preset e.g. "text-iris", null to clear
 *   - iconColorHex: custom hex e.g. "#c4a7e7", null to clear (takes precedence over iconColorClass)
 */
export function setLogoIconColorPreference({ iconColorClass, iconColorHex }) {
  const existing = getLogoPreference() ?? {};
  const rest = { ...existing };
  delete rest.iconColorClass;
  delete rest.iconColorHex;
  if (iconColorHex != null && iconColorHex !== "") {
    rest.iconColorHex = iconColorHex;
  } else if (iconColorClass != null && iconColorClass !== "") {
    rest.iconColorClass = iconColorClass;
  }
  setLogoPreference(Object.keys(rest).length ? rest : null);
}
