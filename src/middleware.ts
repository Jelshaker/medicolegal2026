import { clerkMiddleware } from "@clerk/astro/server";

// Registers Clerk with the Astro server so that `Astro.locals.auth()` and
// `Astro.locals.currentUser()` are available on every request.
//
// Route protection is enforced per-resource (per the @clerk/astro v4 guidance):
//   - /members  -> guards in src/pages/members.astro
//   - /api/*    -> guards in each API route handler
export const onRequest = clerkMiddleware();