import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Must match the query param Docusaurus reads natively before first paint
// (see @docusaurus/theme-classic inlineScripts.js -> ThemeQueryStringKey).
// That inline script already applies the theme to *this* page load with no
// flash of the wrong theme; this component only makes the choice stick for
// later visits that don't carry the query param.
const THEME_QUERY_PARAM = 'docusaurus-theme';

// Must match ColorModeStorageKey in @docusaurus/theme-common, so writing it
// here is equivalent to the user picking this mode via the theme toggle.
const THEME_STORAGE_KEY = 'theme';

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const theme = params.get(THEME_QUERY_PARAM);
      if (theme !== 'light' && theme !== 'dark') {
        return;
      }

      window.localStorage.setItem(THEME_STORAGE_KEY, theme);

      // Strip the param from the URL so it doesn't linger in the address
      // bar or get reapplied unexpectedly via back/forward navigation.
      params.delete(THEME_QUERY_PARAM);
      const query = params.toString();
      const cleanedUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
      window.history.replaceState(window.history.state, '', cleanedUrl);
    } catch {
      // localStorage may be unavailable (privacy mode, etc.) - not fatal,
      // the theme still applied correctly for this page load.
    }
  }, []);

  return <>{children}</>;
}
