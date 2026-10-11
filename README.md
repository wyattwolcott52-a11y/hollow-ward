# The Hollow Ward: Windows + Android apps

GitHub builds both for you. No coding, nothing to install on your computer.

## Get your apps (about 10 minutes, once)
1. Make a free account at github.com and click **New repository** (any name, set to Private). Don't add a README.
2. On the new repo page click **uploading an existing file**. Unzip this folder and drag EVERYTHING inside it
   into the page (including the `app`, `assets`, `scripts` folders), then **Commit changes**.
3. Check that `.github/workflows/build.yml` made it. If not: **Add file > Create new file**, type the name
   `.github/workflows/build.yml`, paste the contents of that file from this zip, and commit.
4. Open the **Actions** tab. A run called "Build apps" starts by itself (or click it, then **Run workflow**).
   Wait ~5-10 minutes for green checks.
5. Click the finished run and scroll to **Artifacts** at the bottom:
   - **HollowWard-Windows**: a zip with `The Hollow Ward Setup.exe` (installer) and a portable `.exe`.
   - **HollowWard-Android**: a zip with `app-debug.apk`.

## Install
- **Windows:** run the Setup `.exe`. If SmartScreen warns, click **More info > Run anyway** (the app isn't code-signed).
  It opens full screen. F11 or G toggles, Esc leaves.
- **Android:** send the `.apk` to your phone, open it, allow "install unknown apps" when asked.
  It runs full screen, landscape, with no browser bar. (Play Store needs a signed release build and a $25 developer account; ask me when you want that.)

## Updating the game
Edit `app/index.html` in GitHub (pencil icon) or upload a new one, commit, and Actions rebuilds both apps.

Local run (optional, Windows/Mac/Linux): `npm install` then `npm start`.
