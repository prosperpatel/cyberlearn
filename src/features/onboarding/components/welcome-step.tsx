export function WelcomeStep() {
  return (
    <section className="py-5 text-center sm:py-12">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl border border-cyber-blue/40 bg-cyber-blue/10 text-4xl shadow-cyber-md">
        ⌁
      </div>
      <p className="mt-8 text-sm font-bold uppercase tracking-[.2em] text-cyber-blue">Welcome, Agent</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
        Welcome to CyberLearn
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-slate-400">
        Your journey into cybersecurity starts now.
      </p>
    </section>
  )
}
