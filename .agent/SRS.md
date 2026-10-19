# RoamPup — Software Requirements Specification
Version 1.0 | Phase 1 requirements baseline

## 1. Purpose
RoamPup is a responsive travel-planning and trip-companion website for day trips and multi-day road trips. It generates editable, day-wise itinerary drafts grounded in real place and routing data, supports active trips, and preserves trip history.

**Product principle: AI proposes. The traveler decides. Real map data grounds the plan.**

## 2. MVP goals
- Create, personalize, review, edit, save, schedule, and manage trips.
- Generate day-wise itinerary drafts using Gemini plus real place/route data.
- Support manual and AI-assisted replanning, always with user approval.
- Provide map-first active-trip experience, progress tracking, and graceful location/routing failures.
- Provide emergency information and user-confirmed trip completion.
- Preserve user data and edits when providers fail.

## 3. MVP exclusions
No native apps; no guaranteed background GPS; no in-app turn-by-turn navigation; no hotel/ticket booking; no automatic emergency dispatch; no automatic Google Calendar sync; no social network, public profiles, collaborative trips, photo sharing, face recognition, or AI photo carousel; no continuous location-history storage by default. Do not invent places, coordinates, distances, ETAs, hours, or costs.

## 4. Core journey
1. Sign in → dashboard.
2. Create trip: origin, destination, trip type, departure and applicable return date/time.
3. Choose interests, budget, pace, optional vehicle details and preferred stops.
4. Retrieve real places/routes, then ask Gemini to personalize/rank/explain candidates.
5. Review complete itinerary draft; edit, reorder, remove/replace stops, adjust durations, or regenerate suggestions.
6. Save/schedule trip.
7. During travel, use map-first active-trip screen and open external navigation when needed.
8. Manually mark stops visited/skipped. RoamPup may suggest skipping an impractical stop but never does it automatically.
9. Preview and approve replans before applying.
10. Explicitly confirm completion; trip moves to Completed Trips.

## 5. Platform and modes
Responsive, mobile-first website with desktop support:
- **Planning Mode:** detailed form, preferences, editable itinerary draft.
- **On-the-Road Mode:** map-first screen, next-stop card, ETA/distance when reliable, progress, quick actions.
- **Stopped Mode:** explore places, ask AI for alternatives, edit remaining itinerary.
Browser geolocation requires permission and may not work in background/when locked. Do not promise background tracking.

## 6. Functional requirements

### FR-01 Authentication and account (P0)
Users must sign in before planning. Support email/password; Google sign-in if feasible with selected auth solution. After sign-in, go directly to dashboard. Support sign-out and account deletion. Profile photo, phone, travel preferences and emergency contacts are optional. Protect private records with server-side authorization.

### FR-02 Dashboard and lifecycle (P0)
Dashboard sections: Saved Trip Presets, Scheduled Trips, Ongoing Trips, Completed Trips. Include prominent “Plan a New Trip” action and useful empty states. Mobile may use tabs/collapsibles; desktop may show all sections.

### FR-03 Presets (P0)
Create, edit, rename, duplicate, delete reusable presets. Creating a trip from a preset copies its details independently; later preset edits/deletion do not change that trip.

### FR-04 Trip creation (P0)
Plan a New Trip opens trip details first, then preferences and generation. Support day trips and multi-day trips. Origin, destination, departure date/time and applicable return date/time are required. Vehicle type, fuel type, mileage and preferred stops are optional. Validate before external calls and preserve input after errors.

### FR-05 Preferences (P0)
Interests: Nature, Food, Sightseeing, Adventure, Temples & spirituality, Shopping, History & culture, Hidden gems. Budget: budget-friendly, moderate, premium. Pace: relaxed, balanced, packed. Optional vehicle type, fuel type, mileage.

### FR-06 Places and routes (P0)
Search real places; select suggestions; add custom stops; reorder/remove/replace. Distinguish **en-route stops**, **optional detours**, and **destination exploration**. Recalculate route-dependent data after route-affecting edits using a real routing provider. If it fails, preserve edits and mark data unavailable. OSM is an ecosystem, not one API: choose and document tile, geocoding, POI and routing providers, terms, quotas, attribution and limits.

### FR-07 AI itinerary (P0)
Generate complete day-wise draft with map and, where reliable, arrival time, suggested duration, distance from previous stop, detour distance and estimated cost. Real provider data grounds places/routes; Gemini personalizes and explains. Validate AI output against schema. AI must not invent coordinates, routes, distances, ETAs, opening hours or definitive prices. Label estimates and unavailable data. User reviews before saving.

### FR-08 Editing and approval (P0)
Users review complete draft, edit stop details/order, remove or replace stops, adjust durations, and regenerate suggestions before saving. Distinguish draft, saved/scheduled and active states. Preserve edits if recalculation or AI fails.

### FR-09 Alternatives and replanning (P0)
Support manual and AI-assisted replanning using preferences and real place/route data. Revisions remain drafts until previewed and explicitly approved. Do not silently overwrite the active itinerary or discard user edits.

### FR-10 Active trip (P0)
Map-first screen with next-stop card, ETA/distance when reliable, trip progress and quick actions: external navigation, mark visited, skip, explore nearby, emergency panel. Keep controls glanceable; turn-by-turn directions are external.

### FR-11 Stop statuses (P0)
Users manually mark stops visited/skipped. RoamPup may suggest skipping impractical stops, but requires approval before changes. Recalculate remaining route after approved changes where possible.

### FR-12 Location/off-route (P0)
Request browser location only when needed and with explanation. If off-route, inform user and suggest recalculation; never replace route without approval. If location unavailable/denied, keep itinerary visible and offer manual navigation. No continuous location history by default.

### FR-13 Emergency panel (P0)
Recommended complete panel: verified emergency numbers where available; nearby hospitals/police from real place data; saved emergency contacts; call links where supported; directions to selected service. State when information is unavailable/unverified. No automatic dispatch or guaranteed call success. AI must not be the sole source of emergency information.

### FR-14 Completion/history (P0)
May suggest journey completion, but user confirms before marking complete. Completed trips remain in history until user deletes them/account deletion. Deletion requires confirmation.

### FR-15 Google Calendar (P1)
“Add to Google Calendar” uses a prefilled event link containing title, destination, departure date/time and useful details. User confirms event and reminder settings in Calendar. No Google sign-in required for this feature and no automatic sync. If trip changes later, warn that event may be outdated and provide updated link/details.

### FR-16 Graceful degradation (P0)
Gemini failure still allows manual planning/editing. Map/place/routing failures preserve data and edits. Show clear errors and retry options. Never replace missing facts with fabricated data.

## 7. Non-functional requirements
- **Security/privacy:** server-side auth and ownership checks; validate input; use maintained auth; keep keys server-only; no secrets in repo; minimize personal/location data; document account deletion.
- **Reliability:** schema validation; provider failures do not corrupt saved trips; loading/empty/error/retry/success states.
- **Performance:** dashboard/saved trips should not wait on Gemini; lazy-load map where useful; avoid unnecessary AI calls.
- **Accessibility:** responsive layout, keyboard support, visible focus, labels, contrast, errors not communicated by color alone, reduced-motion support.
- **Maintainability:** separate UI/domain/provider adapters/persistence; structured logs without secrets or unnecessary location data.
- **Provider compliance:** respect OSM/provider attribution, quotas, terms, caching and commercial-use rules.

## 8. Core entities
User, UserPreferences, EmergencyContact, TripPreset, Trip, ItineraryDay, ItineraryStop, RouteSummary, optional draft revision/calendar metadata. Every private resource belongs to a user. Trips created from presets are independent snapshots.

## 9. MVP acceptance criteria
1. Sign-up/sign-in works and opens dashboard.
2. Dashboard shows four trip sections and empty states.
3. Presets support CRUD/duplicate and independent-copy behavior.
4. User can enter required trip details/preferences.
5. Itinerary generation uses real candidate place/route data or clearly reports failure.
6. User can edit/reorder/remove/replace stops and durations before saving.
7. AI alternatives are previewed and require explicit approval.
8. Route data is recomputed by a real routing provider when available.
9. Provider failures preserve input, edits and saved data.
10. Active trip screen shows map, next-stop details, progress and actions.
11. Stop status is user-controlled; no silent skipping.
12. Location denial does not block manual use.
13. Emergency panel uses real/verified data when available and makes no dispatch claims.
14. Completion requires confirmation.
15. Calendar uses prefilled event link without sync claims.
16. Users cannot access another user's private records.
17. No API secrets in browser bundle or source control.
18. Deferred social/photo features are not added without approval.

## 10. Implementation rule
Inspect the existing repository before changing framework, package manager, styling, auth, database or deployment. Preserve working code. Record decisions and assumptions in `DECISIONS.md`.
