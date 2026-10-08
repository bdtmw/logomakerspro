// The site's chat is the AI assistant (src/components/chat/ChatWidget.jsx). Buttons open it with this event.
export const CHAT_OPEN_EVENT = 'lmp:open-chat';

/** Open the chat assistant. Returns false on the server, where there is nothing to open. */
export function openLiveChat() {
  if (typeof window === 'undefined') return false;
  window.dispatchEvent(new Event(CHAT_OPEN_EVENT));
  return true;
}
