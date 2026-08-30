/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as affiliateClicks from "../affiliateClicks.js";
import type * as amazon from "../amazon.js";
import type * as amazonOffers from "../amazonOffers.js";
import type * as crons from "../crons.js";
import type * as email from "../email.js";
import type * as emailEvents from "../emailEvents.js";
import type * as http from "../http.js";
import type * as subscribers from "../subscribers.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  affiliateClicks: typeof affiliateClicks;
  amazon: typeof amazon;
  amazonOffers: typeof amazonOffers;
  crons: typeof crons;
  email: typeof email;
  emailEvents: typeof emailEvents;
  http: typeof http;
  subscribers: typeof subscribers;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
