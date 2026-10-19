---
name: roampup-builder
description: Build and maintain the RoamPup travel-planning website according to its SRS and architecture. Use for feature implementation, bug fixes, tests, and repository changes.
---

# RoamPup Builder Skill

## Read first
Read `SRS.md`, `ARCHITECTURE.md`, `ANTIGRAVITY_PROMPT.md`, and `README.md`. Inspect the repository tree, package manifest/lockfile, framework and versions, scripts, styling, routes, auth, DB, environment, tests and deployment. Report what works, what is missing, conflicts, and a small implementation plan before large edits. Record choices in `docs/DECISIONS.md`.

## Non-negotiable product rules
- **AI proposes. The traveler decides. Real map data grounds the plan.**
- Retrieve real place/route candidates first; Gemini personalizes, ranks and explains candidates.
- Never trust Gemini for coordinates, route geometry, distance, ETA, opening hours or definitive prices.
- Validate AI output against a strict schema and verify recommendations against retrieved candidates.
- AI itineraries/replans are drafts. Require explicit review and approval before saving or replacing an active itinerary.
- Never silently skip/remove a stop or apply a route revision.
- Preserve user input and saved data when providers fail.
- Never claim a route, save, call, location, calendar sync or provider operation succeeded if it did not.
- Do not promise background GPS in a browser or store continuous location history by default.
- Do not add native apps, hotel booking, social/photo sharing, face recognition or AI photo-carousel features to MVP without explicit approval.

## Security
- Keep Gemini, DB, OAuth and provider secrets server-side. Never commit secrets or real user data.
- Derive user identity from verified server session; never trust client-supplied `userId`.
- Check ownership for every private trip, preset, contact and revision operation.
- Use maintained auth libraries; do not invent password/session cryptography.
- Validate inputs, IDs, URLs, request sizes and AI outputs. Add rate limits and bounded retries to expensive operations.
- Avoid sending personal contacts or precise location to AI unless essential.
- Do not log passwords, tokens, secrets or unnecessary location data.
- Do not bypass provider terms, attribution, auth, validation or rate limits to make a demo work.

## Engineering workflow
1. Audit before edits; do not scaffold over or delete working code.
2. Follow existing language, package manager, style, test and component conventions unless a documented reason requires change.
3. Implement small vertical slices and report intended changes before each milestone.
4. Keep UI separate from provider/database logic; use typed domain services and provider adapters.
5. Include loading, empty, error, retry and success states; preserve edits after failure.
6. Use semantic, accessible, keyboard-operable responsive UI with visible focus and clear labels.
7. Mark fixtures as demo/mock; never present fake provider data as real.
8. Avoid unnecessary dependency upgrades.
9. Run available lint, typecheck, tests and build; report exactly what ran and its result.

## UX rules
- Planning Mode: detailed form, preferences and editable itinerary draft.
- On-the-Road Mode: map-first screen, compact next-stop card, ETA/distance only when reliable, progress and quick actions.
- Stopped Mode: place exploration, alternatives and remaining-itinerary edits.
- Dashboard sections: Saved Trip Presets, Scheduled Trips, Ongoing Trips, Completed Trips; prominent “Plan a New Trip”.
- Distinguish en-route stops, optional detours and destination exploration.
- Label estimates and unavailable data.
- Active-trip controls should be glanceable and not encourage complex interaction while driving.
- Emergency panel uses verified real data where available and never claims automatic dispatch.
- Trip completion requires explicit confirmation.

## Provider rules
Before integrating a provider, verify current API/SDK, quotas, pricing, terms, attribution, caching, and deployment compatibility. Document decisions. Keep map tiles, geocoding, POI search, routing and Gemini behind separate adapters. Do not assume public OSM services are unlimited. Use routing-provider results for distance/duration. On failure, mark route fields unavailable/stale rather than inventing values.

## Definition of done
A change is complete only when it satisfies SRS, respects scope, has server-side authorization and validation where relevant, handles loading/empty/error/success states, preserves data on failure, is responsive/accessibility-aware, has relevant tests, and has run available lint/typecheck/build. No secrets committed. Final summary lists files changed, behavior, verification results, assumptions and limitations.

## When uncertain
Choose the smallest safe implementation consistent with SRS, document assumptions, and ask only when the decision materially changes scope, privacy, cost, security or user experience.
