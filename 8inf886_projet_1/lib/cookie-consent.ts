export const COOKIE_CONSENT_NAME = "cookie_consent";
export const COOKIE_CONSENT_ACCEPTED = "accepted";
export const COOKIE_CONSENT_DECLINED = "declined";

type CookieStoreLike = {
  get: (name: string) => { value: string } | undefined;
};

export function hasAcceptedCookieConsent(cookieStore: CookieStoreLike): boolean {
  return cookieStore.get(COOKIE_CONSENT_NAME)?.value === COOKIE_CONSENT_ACCEPTED;
}
