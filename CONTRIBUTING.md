# Contribution guidelines

## Basic guidelines

### Use of generative AI is banned

Generative AI uses training data [based on plagiarism and piracy](https://web.archive.org/web/20250000000000*/https://www.theatlantic.com/technology/archive/2025/03/libgen-meta-openai/682093/), has [significant environmental costs associated with it](https://doi.org/10.21428/e4baedd9.9070dfe7), and [generates fundamentally insecure code](https://doi.org/10.1007/s10664-024-10590-1). GenAI is not ethically built, ethical to use, nor safe to use for programming applications. When caught, you will be permanently banned from contributing to the project, and any prior contributions will be checked and potentially reverted. Any and all contributions you've made cannot be trusted if AI slop machines were involved.

## Development setup

There's a [zellij](https://github.com/zellij-org/zellij) layout you can use for development. Using it is strongly recommended.

```bash
# Npm setup
npm i
# Then run the layout
zellij -n dev/zellij/default.kdl
# or, with https://github.com/LunarWatcher/umbra (still requires zellij installed)
umbra z
```

This handles building and testing of the plugin. Note that the tests do not run automatically, and need to be run manually. Simply press enter with the integration test pane focused to rerun the tests. The same applies to the ESLint tab.

To get the plugin into your vault, copy `.env.dev-example` to `.env.dev`, and replace `VAULT_LOCATION` with a path to the root of the vault you want to install the plugin in. Then run `./scripts/dev.sh` to create symlinks. Any future updates then only need a reload or a restart of obsidian to take effect.

### Testing

Testing exclusively uses Python-based integration tests. To run these, use `./scripts/e2e-test.sh`. You'll need:

* python3
* python-venv
* xvfb

If you can't or won't use the script, read the script for the commands to use. The script automates several steps, particularly bundling the plugin for use by the integration tests, and extracting the webdriver version from a second script. If you don't know which webdriver version to use, try using 138 and if it crashes, read the error message for the right version to use. Obsidian does not provide an easy way to identify which version to use other than trying and crashing.

The tests are based on pytest with a manually hacked-together selenium setup, since obsidian is just chrome in a trenchcoat.

As much functionality as possible should be tested when making changes. This makes it harder to break stuff, and makes it easier to tell if updates to Obsidian breaks something.

## Making a release

(You do not need to follow this unless you're me)

The version has to be bumped in two places:

* `package.json`
* `manifest.json`

There's also a [`versions.json`, described by obsidian](https://docs.obsidian.md/Reference/Versions), but this is not in use yet, as it doesn't seem to be required (plus, nothing has been released yet, and I do not have a way to make it useful, as I'll mostly be operating on the latest versions).

`./scripts/bump-versions.sh` exists to automate this process. If the minimum obsidian version is bumped, `versions.json` needs to be added and/or bumped.
