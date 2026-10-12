// Checks the site content is consistent. Run with `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { DOCTORS, GALLERY, HOSPITAL, SPECIALTIES } from "../src/lib/content.ts";

test("there are 8 specialties with unique slugs", () => {
  assert.equal(SPECIALTIES.length, 8);
  const slugs = SPECIALTIES.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("every doctor listed under a specialty exists", () => {
  for (const s of SPECIALTIES) {
    for (const d of s.doctors) assert.ok(DOCTORS[d], `${s.slug} lists unknown doctor ${d}`);
  }
});

test("every image referenced exists in public/", () => {
  const images = [
    ...GALLERY.map((g) => g.src),
    ...Object.values(DOCTORS).flatMap((d) => (d.photo ? [d.photo] : [])),
  ];
  for (const src of images) assert.ok(existsSync(`public${src}`), `missing ${src}`);
});

test("contact links point to the appointment number", () => {
  assert.equal(HOSPITAL.phoneHref, "tel:+918290269412");
  assert.equal(HOSPITAL.whatsappHref, "https://wa.me/918290269412");
});
