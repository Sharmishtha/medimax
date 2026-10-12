// Checks the built site in out/ (run `npm run build` first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { SPECIALTIES } from "../src/lib/content.ts";

const headers = existsSync("out/_headers") ? readFileSync("out/_headers", "utf8") : "";

function cspFor(path) {
  const block = headers.split("\n\n").find((b) => b.startsWith(`${path}\n`));
  return block?.match(/Content-Security-Policy: (.*)/)?.[1];
}

const pages = [
  ["/", "out/index.html"],
  ...SPECIALTIES.map((s) => [`/specialties/${s.slug}/`, `out/specialties/${s.slug}/index.html`]),
];

test("build output exists", () => {
  assert.ok(headers, "out/_headers missing — run `npm run build` first");
  for (const [, file] of pages) assert.ok(existsSync(file), `missing ${file}`);
});

test("security headers are set for every page", () => {
  for (const h of [
    "Strict-Transport-Security",
    "X-Content-Type-Options: nosniff",
    "X-Frame-Options: DENY",
    "Referrer-Policy",
    "Permissions-Policy",
  ]) {
    assert.ok(headers.includes(h), `missing ${h}`);
  }
});

test("each page's CSP allows only its own inline scripts", () => {
  for (const [path, file] of pages) {
    const csp = cspFor(path);
    assert.ok(csp, `no CSP for ${path}`);
    const scriptSrc = csp.split(";").find((d) => d.trim().startsWith("script-src"));
    assert.ok(!scriptSrc.includes("unsafe-inline"), `${path} allows unsafe-inline scripts`);
    assert.ok(!scriptSrc.includes("unsafe-eval"), `${path} allows unsafe-eval`);
    assert.ok(csp.includes("frame-ancestors 'none'"));

    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
      const hash = createHash("sha256").update(m[1], "utf8").digest("base64");
      assert.ok(scriptSrc.includes(`sha256-${hash}`), `${path} has an inline script not in its CSP`);
    }
  }
});

test("pages make no requests to unexpected third parties", () => {
  const allowed = ["medimaxhospitals.in", "fonts.googleapis.com", "fonts.gstatic.com"];
  for (const [path, file] of pages) {
    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(/<(?:script|link|img)[^>]+(?:src|href)="https?:\/\/([^/"]+)/g)) {
      assert.ok(allowed.includes(m[1]), `${path} loads from ${m[1]}`);
    }
  }
});

test("SEO basics: sitemap, robots, canonical and structured data", () => {
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  for (const [path, file] of pages) {
    assert.ok(sitemap.includes(`https://medimaxhospitals.in${path}`), `${path} missing from sitemap`);
    const html = readFileSync(file, "utf8");
    assert.ok(html.includes(`rel="canonical" href="https://medimaxhospitals.in${path}"`), `${path} canonical`);
    assert.ok(html.includes('type="application/ld+json"'), `${path} structured data`);
    assert.equal(html.match(/<h1[\s>]/g)?.length, 1, `${path} should have exactly one <h1>`);
  }
  assert.ok(readFileSync("out/robots.txt", "utf8").includes("Sitemap: https://medimaxhospitals.in/sitemap.xml"));
});
