import { GoogleProfile } from "next-auth/providers/google"
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"

export default function Google<P extends GoogleProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "google",
    name: "google",
    type: "oauth",
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    authorization: { params: { scope: "openid email profile" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture
      }
    },
    style: { logo: "/google.svg", bg: "#fff", text: "#000" },
    options
  }
}