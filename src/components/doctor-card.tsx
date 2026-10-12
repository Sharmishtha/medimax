import type { Doctor, Tone } from "@/lib/content";
import { TONES, whatsappLink } from "@/lib/content";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .join("");
}

export function DoctorCard({
  doctor,
  dept,
  tone,
}: {
  doctor: Doctor;
  dept: string;
  tone: Tone;
}) {
  const t = TONES[tone];
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white">
      {doctor.photo ? (
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="h-72 w-full object-cover object-center"
        />
      ) : (
        <div
          className={`flex h-72 items-center justify-center ${t.bg} ${t.text} text-6xl font-black`}
          aria-hidden="true"
        >
          {initials(doctor.name)}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className={`eyebrow ${t.text}`}>{dept}</div>
        <h3 className="text-2xl font-black">{doctor.name}</h3>
        <div className="font-bold text-body">{doctor.role}</div>
        <div className="text-sm font-semibold text-body">{doctor.credentials}</div>
        <p className="mb-3 mt-1 leading-relaxed text-body">{doctor.bio}</p>
        <a
          href={whatsappLink(`Hello, I would like to book an appointment with ${doctor.name}.`)}
          className="pill mt-auto self-start bg-ink px-5 py-3 text-white hover:bg-black"
        >
          Book with doctor
        </a>
      </div>
    </article>
  );
}
