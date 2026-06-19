export const SECTION_SCROLL_INSET = 12;

export const DEFAULT_HEADER_HEIGHT = 76;
export const DEFAULT_HEADER_HEIGHT_MOBILE = 68;

export const SECTION_TOP_PADDING_DESKTOP = 64;
export const SECTION_TOP_PADDING_MOBILE = 40;

export function getDefaultHeaderHeight() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return DEFAULT_HEADER_HEIGHT;
  }

  return window.matchMedia('(max-width: 768px)').matches
    ? DEFAULT_HEADER_HEIGHT_MOBILE
    : DEFAULT_HEADER_HEIGHT;
}

export function getSectionTopPadding() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return SECTION_TOP_PADDING_DESKTOP;
  }

  return window.matchMedia('(max-width: 768px)').matches
    ? SECTION_TOP_PADDING_MOBILE
    : SECTION_TOP_PADDING_DESKTOP;
}

export function getMeasuredHeaderHeight() {
  if (typeof document === 'undefined') {
    return getDefaultHeaderHeight();
  }

  const header = document.querySelector('.header');
  return header?.offsetHeight || getDefaultHeaderHeight();
}

/** Target scroll offset for react-scroll (negative = stop higher on the page). */
export function getSectionScrollOffset(headerHeight) {
  const height = headerHeight > 0 ? headerHeight : getMeasuredHeaderHeight();
  const sectionPadding = getSectionTopPadding();
  const offset = height + SECTION_SCROLL_INSET - sectionPadding;

  return -offset;
}

export function getSectionScrollTop(sectionId) {
  if (typeof document === 'undefined') {
    return null;
  }

  const element = document.getElementById(sectionId);

  if (!element) {
    return null;
  }

  const headerHeight = getMeasuredHeaderHeight();
  const sectionPadding = getSectionTopPadding();
  const top = window.scrollY
    + element.getBoundingClientRect().top
    - headerHeight
    - SECTION_SCROLL_INSET
    + sectionPadding;

  return Math.max(0, top);
}

/** Delay after closing the mobile menu before scrolling (menu-lock + panel transition). */
export const MOBILE_MENU_SCROLL_DELAY_MS = 80;

export function scrollToSection(sectionId) {
  const top = getSectionScrollTop(sectionId);

  if (top === null) {
    return false;
  }

  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}
