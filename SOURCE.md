# Source and release versions

This repository contains New API at the revision recorded in [UPSTREAM.json](UPSTREAM.json), ItaRouter modifications and the build instructions. [CHANGES.md](CHANGES.md) records the changes. The existing New API frontend and backend are included in `app/new-api/`; its original README files and notices are preserved.

## Source scope

Provide the source needed to generate, install, run and modify the version offered to users, following the Corresponding Source provisions of [AGPLv3](LICENSE). This includes frontend/backend source, local modifications, required interface and schema definitions, build/control scripts and configuration examples without secrets.

The Go modules, dependency manifests, frontend package manifest/lockfile and upstream build files are retained. Excluding `node_modules` or download caches does not by itself establish that all required dependency source is available. Check combined dependencies, fixed versions, source locations and notices against the actual release. The license defines the system-library and general-tool exceptions.

Do not publish provider/payment credentials, passwords, customer databases, session secrets or personal account configuration. Document the required configuration fields and setup instead.

## Before offering a release

1. Fix the release's source commit and build conditions.
2. Prepare a tag or source archive matching the code users receive, and verify free download access. A moving `main` link does not identify a particular deployed version.
3. Link that version's source, license and legal notices from the user interface and API documentation. The upstream project link is separate from the source link for ItaRouter's own modifications.
4. For distributed images/binaries, verify the corresponding source and notices for those artifacts too.
5. Update the matching source and change record when upstream or local changes are deployed.

The public website is available at https://itarouter.com. Its footer links to the exact deployed source revision, license and notices. A release tag, a complete dependency-source review and a full dependency-source archive remain unverified.

Read [LICENSE](LICENSE), [upstream NOTICE](NOTICE), [ItaRouter notice](ITAROUTER-NOTICE.md), [third-party notices](app/new-api/THIRD-PARTY-LICENSES.md) and the [local run guide](docs/development/LOCAL-RUN.md).
