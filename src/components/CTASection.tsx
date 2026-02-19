export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-[#131313] relative overflow-hidden" id="contact">
      {/* Purple glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#6052ff]/6 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="section-divider mb-16" />

        <div className="flex flex-col items-center gap-8">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            Prêt à démarrer ?
          </span>

          <h2 className="font-display font-900 text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
            Lancez votre campagne{" "}
            <span className="text-[#6052ff]">UGC artistique</span>
            {" "}dès aujourd&apos;hui.
          </h2>

          <p className="font-body text-[#9ca3af] text-lg max-w-xl leading-relaxed">
            Rejoignez les marques qui font confiance à InRealArt pour
            créer du contenu authentique qui convertit.
          </p>

          <a href="mailto:contact@inrealart.com" className="btn-primary btn-primary-pulse text-sm px-8 py-4">
            Faire ma demande →
          </a>

          {/* Trust bullets */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
            {["0 € de frais mensuels", "Artistes vérifiés", "Livraison < 1 semaine"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6052ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-sm text-[#9ca3af]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
