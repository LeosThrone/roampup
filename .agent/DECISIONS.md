# RoamPup Architecture and Provider Decisions

## Repository audit
- Framework/version: Next.js 16.4.2 (App Router), React 19.3.0
- Language: TypeScript 5
- Package manager: npm
- Styling: Tailwind CSS v4 with Turbopack, Neobrutalism custom design system
- Existing auth: Auth.js (next-auth v5 beta) with credentials provider & bcrypt password hashing
- Existing database: MongoDB with Mongoose ODM (cached connection pool)
- Map/provider integrations: Planned Leaflet, Nominatim, OSRM
- Deployment: Node / Vercel compatible
- Test/lint/build scripts: npm run lint (ESLint 9), npm run build (Turbopack)
- Working features: User Registration flow (`/register`, `/api/auth/register`), Auth.js handler (`/api/auth/[...nextauth]`)
- Known issues: None

## Provider choices
### Authentication
- Provider/library: Auth.js (next-auth v5.0.0-beta.32)
- Email/password and Google sign-in support: Email/password implemented; Google provider ready for OAuth client config
- Session strategy: JWT with server-side cookie verification
- Rationale: Fully compatible with Next.js 16 App Router, standard secure session handling without custom cryptography

### Database
- Hosting: MongoDB Atlas (or local MongoDB)
- Driver/ODM: Mongoose 9
- Indexes/backups/deletion considerations: Unique index on email; password `select: false` by default for safe queries

### Gemini
- SDK/model:
- Structured-output validation:
- Rate/cost controls:
- Timeout/retry strategy:

### Maps and tiles
- Library/provider:
- Attribution:
- Terms/quotas:

### Geocoding and POI search
- Provider:
- Coverage, terms, limits, caching:

### Routing
- Provider/profile:
- ETA/traffic limitations:
- Terms/limits/fallback:

## Security and privacy
- Required environment variables:
- Rate limiting:
- Logging policy:
- Location retention:
- Account deletion behavior:

## Deviations from SRS
- Decision:
- Reason:
- User approval needed?:
