import type { DoculaOptions } from "docula";

export const options: Partial<DoculaOptions> = {
	githubPath: "jaredwray/http-cache",
	siteTitle: "http-cache",
	siteDescription:
		"A modern HTTP caching gateway from the makers of keyv & cacheable",
	siteUrl: "https://http-cache.org",
	themeMode: "light",
	// Do NOT use the repository root README.md for the site. With no site README
	// and docs present, docula renders the first docs page (docs/overview.md) as
	// the home/landing page — the purpose-written "What is http-cache?" intro.
	autoReadme: false,
	// No GitHub releases yet — skip the release-driven changelog fetch.
	enableReleaseChangelog: false,
};
