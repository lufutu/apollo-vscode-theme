/**
 * Apollo Color Palette Constants
 * 
 * This module contains all 48 Apollo palette colors organized into thematic groups
 * and provides helper functions for color assignment and theme-specific mappings.
 */

// Primary Blues/Teals
export const BLUES_TEALS = {
  DARKEST_BLUE: '#172038',
  DARK_BLUE: '#253a5e',
  MEDIUM_BLUE: '#3c5e8b',
  LIGHT_BLUE: '#4f8fba',
  BRIGHT_TEAL: '#73bed3',
  LIGHTEST_TEAL: '#a4dddb'
} as const;

// Greens
export const GREENS = {
  DARKEST_GREEN: '#19332d',
  DARK_GREEN: '#25562e',
  MEDIUM_GREEN: '#468232',
  BRIGHT_GREEN: '#75a743',
  LIGHT_GREEN: '#a8ca58',
  LIGHTEST_GREEN: '#d0da91'
} as const;

// Browns/Oranges
export const BROWNS_ORANGES = {
  DARKEST_BROWN: '#4d2b32',
  DARK_BROWN: '#7a4841',
  MEDIUM_BROWN: '#ad7757',
  LIGHT_BROWN: '#c09473',
  LIGHTEST_BROWN: '#d7b594',
  CREAM: '#e7d5b3'
} as const;

// Warm Tones
export const WARM_TONES = {
  DARKEST_WARM: '#341c27',
  DARK_WARM: '#602c2c',
  MEDIUM_WARM: '#884b2b',
  BRIGHT_WARM: '#be772b',
  LIGHT_WARM: '#de9e41',
  LIGHTEST_WARM: '#e8c170'
} as const;

// Purples/Magentas
export const PURPLES_MAGENTAS = {
  DARKEST_PURPLE: '#241527',
  DARK_PURPLE: '#411d31',
  MEDIUM_PURPLE: '#752438',
  BRIGHT_PURPLE: '#a53030',
  LIGHT_PURPLE: '#cf573c',
  LIGHTEST_PURPLE: '#da863e'
} as const;

// Deep Purples
export const DEEP_PURPLES = {
  DARKEST_DEEP: '#1e1d39',
  DARK_DEEP: '#402751',
  MEDIUM_DEEP: '#7a367b',
  BRIGHT_DEEP: '#a23e8c',
  LIGHT_DEEP: '#c65197',
  LIGHTEST_DEEP: '#df84a5'
} as const;

// Grayscale
export const GRAYSCALE = {
  BLACK: '#090a14',
  DARKEST_GRAY: '#10141f',
  DARKER_GRAY: '#151d28',
  DARK_GRAY: '#202e37',
  MEDIUM_DARK_GRAY: '#394a50',
  MEDIUM_GRAY: '#577277',
  LIGHT_MEDIUM_GRAY: '#819796',
  LIGHT_GRAY: '#a8b5b2',
  LIGHTER_GRAY: '#c7cfcc',
  WHITE: '#ebede9'
} as const;

// Complete Apollo Palette (all 48 colors)
export const APOLLO_PALETTE = {
  ...BLUES_TEALS,
  ...GREENS,
  ...BROWNS_ORANGES,
  ...WARM_TONES,
  ...PURPLES_MAGENTAS,
  ...DEEP_PURPLES,
  ...GRAYSCALE
} as const;

// Theme-specific color mappings
export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  accents: {
    primary: string;
    secondary: string;
    warning: string;
    error: string;
    info: string;
    success: string;
  };
}

/**
 * Dark theme color mappings using Apollo palette
 */
export const DARK_THEME_COLORS: ThemeColors = {
  background: {
    primary: GRAYSCALE.BLACK,
    secondary: GRAYSCALE.DARKEST_GRAY,
    tertiary: GRAYSCALE.DARKER_GRAY
  },
  text: {
    primary: GRAYSCALE.WHITE,
    secondary: GRAYSCALE.LIGHTER_GRAY,
    muted: GRAYSCALE.LIGHT_MEDIUM_GRAY
  },
  accents: {
    primary: BLUES_TEALS.BRIGHT_TEAL,
    secondary: GREENS.LIGHT_GREEN,
    warning: WARM_TONES.LIGHT_WARM,
    error: PURPLES_MAGENTAS.LIGHT_PURPLE,
    info: BLUES_TEALS.LIGHT_BLUE,
    success: GREENS.BRIGHT_GREEN
  }
};

/**
 * Light theme color mappings using Apollo palette
 */
export const LIGHT_THEME_COLORS: ThemeColors = {
  background: {
    primary: GRAYSCALE.WHITE,
    secondary: GRAYSCALE.LIGHTER_GRAY,
    tertiary: GRAYSCALE.LIGHT_GRAY
  },
  text: {
    primary: GRAYSCALE.BLACK,
    secondary: GRAYSCALE.DARKER_GRAY,
    muted: GRAYSCALE.MEDIUM_DARK_GRAY
  },
  accents: {
    primary: BLUES_TEALS.BRIGHT_TEAL,
    secondary: GREENS.LIGHT_GREEN,
    warning: WARM_TONES.LIGHT_WARM,
    error: PURPLES_MAGENTAS.LIGHT_PURPLE,
    info: BLUES_TEALS.LIGHT_BLUE,
    success: GREENS.BRIGHT_GREEN
  }
};
/*
*
 * Helper function to get theme-specific colors
 * @param isDark - Whether to return dark theme colors
 * @returns ThemeColors object for the specified theme
 */
export function getThemeColors(isDark: boolean): ThemeColors {
  return isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
}

/**
 * Helper function to get syntax highlighting colors for a specific theme
 * @param isDark - Whether to return dark theme colors
 * @returns Object with syntax highlighting color mappings
 */
export function getSyntaxColors(isDark: boolean) {
  const theme = getThemeColors(isDark);
  
  return {
    keyword: isDark ? BLUES_TEALS.LIGHT_BLUE : BLUES_TEALS.MEDIUM_BLUE,
    string: isDark ? GREENS.LIGHT_GREEN : GREENS.MEDIUM_GREEN,
    comment: isDark ? GRAYSCALE.MEDIUM_GRAY : GRAYSCALE.MEDIUM_DARK_GRAY,
    variable: isDark ? BLUES_TEALS.LIGHTEST_TEAL : BLUES_TEALS.DARK_BLUE,
    function: isDark ? WARM_TONES.LIGHTEST_WARM : WARM_TONES.MEDIUM_WARM,
    class: isDark ? PURPLES_MAGENTAS.LIGHTEST_PURPLE : PURPLES_MAGENTAS.MEDIUM_PURPLE,
    operator: isDark ? GRAYSCALE.LIGHT_GRAY : GRAYSCALE.DARK_GRAY,
    number: isDark ? DEEP_PURPLES.LIGHT_DEEP : DEEP_PURPLES.MEDIUM_DEEP,
    boolean: isDark ? DEEP_PURPLES.LIGHTEST_DEEP : DEEP_PURPLES.BRIGHT_DEEP,
    type: isDark ? BROWNS_ORANGES.LIGHTEST_BROWN : BROWNS_ORANGES.MEDIUM_BROWN,
    constant: isDark ? WARM_TONES.LIGHT_WARM : WARM_TONES.BRIGHT_WARM
  };
}

/**
 * Helper function to get workbench colors for VS Code theme
 * @param isDark - Whether to return dark theme colors
 * @returns Object with VS Code workbench color mappings
 */
export function getWorkbenchColors(isDark: boolean) {
  const theme = getThemeColors(isDark);
  
  return {
    // Editor colors
    'editor.background': theme.background.primary,
    'editor.foreground': theme.text.primary,
    'editor.selectionBackground': isDark ? BLUES_TEALS.DARK_BLUE : BLUES_TEALS.LIGHTEST_TEAL,
    'editor.lineHighlightBackground': theme.background.secondary,
    'editor.findMatchBackground': theme.accents.warning,
    'editor.findMatchHighlightBackground': isDark ? WARM_TONES.DARK_WARM : WARM_TONES.LIGHTEST_WARM,
    
    // Sidebar colors
    'sideBar.background': theme.background.secondary,
    'sideBar.foreground': theme.text.secondary,
    'sideBar.border': theme.background.tertiary,
    
    // Activity bar colors
    'activityBar.background': theme.background.tertiary,
    'activityBar.foreground': theme.text.primary,
    'activityBar.activeBorder': theme.accents.primary,
    
    // Status bar colors
    'statusBar.background': theme.background.tertiary,
    'statusBar.foreground': theme.text.primary,
    'statusBar.noFolderBackground': theme.background.secondary,
    
    // Tab colors
    'tab.activeBackground': theme.background.primary,
    'tab.inactiveBackground': theme.background.secondary,
    'tab.activeForeground': theme.text.primary,
    'tab.inactiveForeground': theme.text.muted,
    'tab.border': theme.background.tertiary,
    
    // Panel colors
    'panel.background': theme.background.secondary,
    'panel.border': theme.background.tertiary,
    'panelTitle.activeForeground': theme.text.primary,
    'panelTitle.inactiveForeground': theme.text.muted,
    
    // Terminal colors
    'terminal.background': theme.background.primary,
    'terminal.foreground': theme.text.primary,
    'terminal.ansiBlack': GRAYSCALE.BLACK,
    'terminal.ansiRed': theme.accents.error,
    'terminal.ansiGreen': theme.accents.success,
    'terminal.ansiYellow': theme.accents.warning,
    'terminal.ansiBlue': theme.accents.info,
    'terminal.ansiMagenta': isDark ? DEEP_PURPLES.LIGHT_DEEP : DEEP_PURPLES.MEDIUM_DEEP,
    'terminal.ansiCyan': theme.accents.primary,
    'terminal.ansiWhite': GRAYSCALE.WHITE
  };
}

/**
 * Utility function to validate hex color format
 * @param color - Color string to validate
 * @returns boolean indicating if color is valid hex format
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Utility function to get all colors from a thematic group
 * @param group - Color group object
 * @returns Array of color values
 */
export function getColorsFromGroup(group: Record<string, string>): string[] {
  return Object.values(group);
}

/**
 * Utility function to get all Apollo palette colors as an array
 * @returns Array of all 48 Apollo palette colors
 */
export function getAllApolloColors(): string[] {
  return Object.values(APOLLO_PALETTE);
}

/**
 * Type guard to check if a color exists in the Apollo palette
 * @param color - Color string to check
 * @returns boolean indicating if color exists in palette
 */
export function isApolloColor(color: string): boolean {
  return getAllApolloColors().includes(color);
}