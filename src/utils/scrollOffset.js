export const SECTION_SCROLL_INSET = 8;

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

export function getSectionScrollOffset(headerHeight) {
  const height = headerHeight > 0 ? headerHeight : getMeasuredHeaderHeight();
  const sectionPadding = getSectionTopPadding();
  const offset = height + SECTION_SCROLL_INSET - sectionPadding;

  return -offset;
}
