/* eslint-disable */
/**
 * Phase 1 PLACEHOLDER. Convex's `npx convex dev` overwrites this file with
 * type-safe function references generated from convex/*.ts. Until then, this
 * stub lets `src/` files compile.
 *
 * After running `pnpm convex dev` once, this file will be replaced and the
 * `any` types below give way to proper FunctionReference<...> signatures.
 */

export const api = {
  subscribers: {
    insert: 'subscribers:insert' as unknown as never,
    confirm: 'subscribers:confirm' as unknown as never,
    confirmedCount: 'subscribers:confirmedCount' as unknown as never,
  },
}

export const internal = {
  subscribers: {
    findByEmail: 'subscribers:findByEmail' as unknown as never,
  },
  emailEvents: {
    record: 'emailEvents:record' as unknown as never,
  },
  email: {
    sendDoubleOptIn: 'email:sendDoubleOptIn' as unknown as never,
    sendWelcome: 'email:sendWelcome' as unknown as never,
    sendLeadMagnet: 'email:sendLeadMagnet' as unknown as never,
  },
}
