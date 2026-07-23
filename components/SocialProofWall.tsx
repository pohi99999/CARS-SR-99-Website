"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";

const posts = [
  {
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    caption: "Újabb elégedett ügyfél, zökkenőmentes átadás.",
  },
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    caption: "Prémium állapot, valós JSZP adatok.",
  },
  {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    caption: "Ságodi tesztvezetés után azonnali döntés.",
  },
  {
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    caption: "Korrekt beszámítás, gyors ügyintézés.",
  },
  {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
    caption: "Minden részlet transzparens, megbízható csapat.",
  },
];

export default function SocialProofWall() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <div className="mb-8">
        <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Social Proof</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Valós ügyfélélmény, prémium kiszolgálás
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <article
            key={post.image}
            className="flex h-full min-h-[400px] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image src={post.image} alt={post.caption} fill className="object-cover" />
            </div>
            <p className="flex-1 p-4 text-sm leading-6 text-slate-200">{post.caption}</p>
          </article>
        ))}
      </div>
      </m.section>
    </LazyMotion>
  );
}
