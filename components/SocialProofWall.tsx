import Image from "next/image";

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
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">Social Proof</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Valós ügyfélélmény, prémium kiszolgálás
        </h2>
      </div>

      <div className="columns-2 gap-4 space-y-4 md:columns-4">
        {posts.map((post) => (
          <article
            key={post.image}
            className="break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-square w-full">
              <Image src={post.image} alt={post.caption} fill className="object-cover" />
            </div>
            <p className="p-3 text-xs leading-5 text-slate-200">{post.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
