# ✈️ AI Travel Planner

[![React](https://img.shields.io/badge/react-18.3-brightgreen)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/vite-^8.0-blueviolet)](https://vitejs.dev/) [![Firebase](https://img.shields.io/badge/firebase-11.x-orange)](https://firebase.google.com/) [![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Smart Travel Companion for Personalized Itineraries

A user-focused React + Vite web application that generates personalized travel itineraries using Google Generative AI (Gemini) and Firebase for auth & storage. Designed for quick prototyping and demoing an AI-driven travel planning flow with Google OAuth sign-in, Places autocomplete, and Firestore persistence.

---

## What this repo already provides

- Web UI built with React + Vite and Tailwind styles (client-side SPA).
- Google OAuth sign-in (via @react-oauth/google) and Google Places autocomplete for destination input.
- Integration with Google Generative AI (Gemini) via the @google/generative-ai client (AIModal service) to generate itinerary JSON.
- Firestore integration (firebase SDK) with initialization at `src/service/firebaseConfig.{js,jsx}`.
- Create Trip flow: user inputs preferences, AI generates trip JSON and the app saves it to Firestore (`AITrips` collection used by CreateTrip flow).
- My Trips flow: reads trips under `users/{uid}/trips` (see note about observed collection mismatch below).

---

## Features (evidence-backed)

- Landing page and visual UI screens (see `app-screenshots/` images included).
- Google Sign-In for authentication flow (`@react-oauth/google` used in `src/main.jsx` and create-trip).
- Destination input with Google Places Autocomplete (`react-google-places-autocomplete` used in `src/create-trip/index.jsx`).
- AI itinerary generation via `src/service/AIModal.jsx` using `@google/generative-ai`.
- Firestore reads/writes: `setDoc` in `create-trip/SaveAiTrip` writes to `AITrips` collection; `getDocs` in `src/my-trips/index.jsx` reads `users/{uid}/trips`.
- Firebase initialization and exports: `src/service/firebaseConfig.js` and `src/service/firebaseConfig.jsx` export `app`, `db`, `auth`, and `analytics`.

---

## Tech Stack

- Language: JavaScript (ESM)
- Framework / Runtime: React 18 + Vite
- UI: Tailwind CSS (+ shadcn/ui components), radux UI primitives
- Auth & DB: Firebase Authentication & Firestore
- AI: Google Generative AI (Gemini) via `@google/generative-ai`
- Other notable libs: axios, react-google-places-autocomplete, @react-oauth/google

---

## Project structure (top-level)

```text
.
├─ README.md                          # Project README (this file)
├─ package.json                       # Scripts & deps (dev: vite)
├─ src/
│  ├─ main.jsx                        # Router, app entry, Google OAuth provider
│  ├─ App.jsx                         # Main landing component
│  ├─ create-trip/                    # Create trip UI + logic (AI generation + save)
│  │  └─ index.jsx
│  ├─ my-trips/                       # My trips page (reads Firestore)
│  │  └─ index.jsx
│  ├─ service/                        # API & service wrappers
│  │  ├─ AIModal.jsx                  # Gemini/Generative AI session wrapper
│  │  ├─ GlobalApi.jsx                # helper API wrappers
│  │  └─ firebaseConfig.{js,jsx}      # firebase app, db, auth, analytics
│  └─ ...                             # other UI components, routes
├─ app-screenshots/                    # images used in README/screenshots
└─ public/
```

**How it fits together**: The React router (in `src/main.jsx`) mounts routes for the landing page, CreateTrip, ViewTrip and MyTrips. CreateTrip collects preferences, calls the Generative AI session in `AIModal.jsx` to generate itinerary JSON, and writes results to Firestore. MyTrips listens for auth state and then queries Firestore for the current user's trips.

---

## Installation (local development)

Prerequisites:
- Node.js (recommended latest LTS)
- npm or Yarn
- ffmpeg is not required by this project (unlike other repos) — skip.

Install and run:

```bash
# clone
git clone https://github.com/iamdhruvrathi/ai_travel-planner.git
cd ai_travel-planner

# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build
```

If you encounter peer dependency conflicts when running `npm install` (for example Vite vs @vitejs/plugin-react), follow the troubleshooting options in the repository issues or use one of:

- Quick (temporary) install: `npm install --legacy-peer-deps`
- Or align versions: pin `vite` to a compatible version or upgrade `@vitejs/plugin-react`.

---

## Environment variables

The app expects environment variables via Vite (prefix `VITE_`). Create a `.env` file in the project root with the values below (do not commit secrets):

```text
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=ai-travel-planner-b3987.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ai-travel-planner-b3987
VITE_GOOGLE_GEMINI_AT_API_KEY=YOUR_GOOGLE_GENERATIVE_AI_API_KEY
VITE_GOOGLE_AUTH_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
VITE_GOOGLE_PLACE_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
```

Note: `src/service/firebaseConfig.*` already hard-codes some Firebase values (authDomain, projectId, etc.) but expects the `VITE_FIREBASE_API_KEY` to be provided via env.

---

## Usage (what to try)

1. Start the app locally: `npm run dev` (default Vite port, e.g. http://localhost:5173).
2. On the landing page, sign in with Google when prompted (this uses Google OAuth and stores Google token locally).
3. Create Trip: provide destination (Google Places autocomplete), days, budget, travellers and generate a trip — the app will call Gemini and then attempt to save the generated trip to Firestore.
4. My Trips: visit the My Trips page to see trips for the signed-in user (relies on Firebase Authentication and Firestore reads).

---

## Key implementation notes & observed inconsistencies

- Firebase is initialized in `src/service/firebaseConfig.{js,jsx}` and exports `auth`, `db`, and `analytics` for use across the app.
- CreateTrip's `SaveAiTrip` writes to Firestore collection `AITrips` (`setDoc(doc(db, "AITrips", docId), tripDoc)`).
- MyTrips queries `users/{uid}/trips` (`collection(db, "users", uid, "trips")`) to list trips for the current user. These two write/read paths are not aligned in the current codebase; you may want to standardize on a single schema (either place generated trips under `AITrips` and query that, or write generated trips into `users/{uid}/trips`). This mismatch is observed in code and should be addressed if you expect the CreateTrip saved items to appear in MyTrips.

- If you see runtime errors like `Installations: ... API key not valid` or Firestore `Missing or insufficient permissions`, check:
  - That `VITE_FIREBASE_API_KEY` is the Web API key from Firebase Console for the same project (`ai-travel-planner-b3987`) and that the key is not restricted or has proper HTTP referrers added for your dev host (localhost).
  - That the app actually signs the Google OAuth user into Firebase Auth (the current code stores a Google access token in localStorage but does not always call `signInWithCredential(auth, GoogleAuthProvider.credential(...))`; Firestore rules expect `request.auth` for authorized reads/writes).

---

## Screenshots

(Existing project screenshots have been kept below — hosted from the repo)

- Landing Page

![Landing Page](https://raw.githubusercontent.com/iamdhruvrathi/ai_travel-planner/refs/heads/main/app-screenshots/landingPage.png)

- Google Authentication

![Google Authentication](https://raw.githubusercontent.com/iamdhruvrathi/ai_travel-planner/refs/heads/main/app-screenshots/googleAuth.png)

- Create Trip (screens)

![Create Trip Page 1](https://raw.githubusercontent.com/iamdhruvrathi/ai_travel-planner/refs/heads/main/app-screenshots/createTrip2.png)

![Create Trip Page 2](https://raw.githubusercontent.com/iamdhruvrathi/ai_travel-planner/refs/heads/main/app-screenshots/createTrip1.png)

- AI Generating

![AI Data Processing](https://github.com/iamdhruvrathi/ai_travel-planner/blob/main/app-screenshots/aiGenerating.png?raw=true)

- Show Trip / Hotels / Places

![Show Trip Page](https://github.com/iamdhruvrathi/ai_travel-planner/blob/main/app-screenshots/showTrip.png?raw=true)

![Hotel Section](https://github.com/iamdhruvrathi/ai_travel-planner/blob/main/app-screenshots/hotels.png?raw=true)

![Places to Visit](https://github.com/iamdhruvrathi/ai_travel-planner/blob/main/app-screenshots/placesToVisit.png?raw=true)

---

## Future improvements (recommended)

- Standardize Firestore schema (choose `AITrips` or `users/{uid}/trips`) and update read/write flows.
- After Google OAuth, sign user into Firebase Auth with `signInWithCredential` to make Firestore security rules straightforward.
- Add robust error handling and user feedback for network/API key failures (current console errors point to invalid API key or permission errors).
- Add tests, CI, and a Dockerfile to make development and deployment reproducible.
- Consider server-side proxying for secreted API calls (if applicable) and add rate-limiting / caching for Gemini requests.

---

## Author

Dhruv (GitHub: @iamdhruvrathi)

If you want, I can:
- open a PR that standardizes the Firestore schema and updates CreateTrip to write into `users/{uid}/trips`, or
- add the Firebase signInWithCredential flow after Google OAuth (small patch to `create-trip/index.jsx`) to fix the `Missing or insufficient permissions` errors.

---

*(This README preserves the original visual assets and descriptions and adds a developer-focused overview, setup steps, and observed code notes so maintainers and recruiters can quickly understand and run the project.)*
