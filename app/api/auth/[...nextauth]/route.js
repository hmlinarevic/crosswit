import { NextRequest } from "next/server";
import { handlers } from "@/auth";

/**
 * Base-path workaround for NextAuth when app runs under a subpath (e.g. /projects/crosswit).
 * Keep in sync with: auth.js (basePath, trustHost), providers.js (SessionProvider basePath),
 * next.config.js (basePath), and server AUTH_URL. See ARCHITECTURE.md or auth docs.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const authOrigin = process.env.AUTH_URL
  ? new URL(process.env.AUTH_URL).origin
  : null;

/** Next.js strips basePath from the request; Auth.js expects it. Re-inject so basePath matching works. */
function withBasePath(handler) {
  return async (req) => {
    if (!basePath) return handler(req);
    const url = new URL(req.url);
    if (!url.pathname.startsWith(basePath)) {
      const pathname = basePath + url.pathname;
      const fullUrl = authOrigin
        ? `${authOrigin}${pathname}${url.search}`
        : url.toString().replace(url.pathname, pathname);
      const modifiedReq = new NextRequest(fullUrl, req);
      return handler(modifiedReq);
    }
    return handler(req);
  };
}

export const GET = withBasePath(handlers.GET);
export const POST = withBasePath(handlers.POST);
