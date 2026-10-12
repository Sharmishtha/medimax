import { HOSPITAL } from "@/lib/content";

export function SiteFooter() {
  return (
    <>
      <footer id="contact" className="scroll-mt-24 bg-ink pb-8 pt-18 text-white">
        <div className="wrap grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-4xl font-black">Visit or call us</h2>
            <address className="not-italic leading-relaxed text-[#D9DEE5]">
              {HOSPITAL.name}
              <br />
              {HOSPITAL.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </address>
            <a
              href={HOSPITAL.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-extrabold text-[#9FD3FF] hover:text-white"
            >
              Get directions →
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-extrabold text-[#9FD3FF]">Appointments (call or WhatsApp)</div>
            <a href={HOSPITAL.phoneHref} className="text-3xl font-black text-white">
              {HOSPITAL.phoneDisplay}
            </a>
            <a
              href={HOSPITAL.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#D9DEE5] hover:text-white"
            >
              Message on WhatsApp →
            </a>
            <div className="mt-4 font-extrabold text-[#9FD3FF]">OPD timings</div>
            {HOSPITAL.opdTimings.map((t) => (
              <div key={t} className="text-[#D9DEE5]">{t}</div>
            ))}
            <div className="mt-4 font-extrabold text-[#9FD3FF]">Emergency</div>
            <div className="text-[#D9DEE5]">Open 24 × 7</div>
          </div>
          <div className="overflow-hidden rounded-[20px]">
            <img
              src="/images/building-side.jpg"
              alt="Medimax Hospital building"
              className="h-full min-h-52 w-full object-cover"
            />
          </div>
        </div>
        <div className="wrap mt-12 flex flex-wrap justify-between gap-2 border-t border-[#4A515C] pt-6 text-sm text-[#B9C0CA]">
          <span>© {new Date().getFullYear()} {HOSPITAL.name} · {HOSPITAL.domain}</span>
          <a
            href={HOSPITAL.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Instagram {HOSPITAL.instagramHandle}
          </a>
        </div>
      </footer>
      <div className="logo-stripe" />
    </>
  );
}
