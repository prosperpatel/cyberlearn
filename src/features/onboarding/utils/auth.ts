/** Builds the OAuth return URL from the active browser origin. */
export function getAuthCallbackUrl(): string {
  return new URL('/auth/callback', window.location.origin).toString()
}
