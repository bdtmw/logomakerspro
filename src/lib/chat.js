/** Open the Zendesk messenger if it has loaded; returns false when it is unavailable. */
export function openLiveChat() {
  if (typeof window === 'undefined') return false;
  if (typeof window.zE === 'function') {
    try {
      window.zE('messenger', 'open');
      return true;
    } catch {
      try {
        window.zE('webWidget', 'open');
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
}
