// Writes out/_headers for Cloudflare Pages after `next build`.
// Each page gets a Content-Security-Policy that allows only its own inline
// scripts (by SHA-256 hash), so no other script can run even if injected.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    const digest = createHash("sha256").update(m[1], "utf8").digest("base64");
    hashes.add(`'sha256-${digest}'`);
  }
  return [...hashes];
}

function csp(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function urlPath(file) {
  const rel = relative(OUT, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

const rules = [
  `/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin`,
  `/_next/static/*
  Cache-Control: public, max-age=31536000, immutable`,
];

const policies = new Map();
for (const file of htmlFiles(OUT)) {
  const path = urlPath(file);
  const policy = csp(inlineScriptHashes(readFileSync(file, "utf8")));
  policies.set(path, policy);
  // Pages also serves /foo/ at /foo; give both spellings the same policy.
  if (path.endsWith("/") && path !== "/") policies.set(path.slice(0, -1), policy);
}
for (const [path, policy] of policies) {
  rules.push(`${path}\n  Content-Security-Policy: ${policy}`);
}

writeFileSync(join(OUT, "_headers"), rules.join("\n\n") + "\n");
console.log(`Wrote ${OUT}/_headers (${rules.length} rules)`);
