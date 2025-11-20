import React from "react";

// Vault × Atlys inspired single-file React landing page
// - TailwindCSS utility classes assumed in the host project
// - Default export is a React component that can be dropped into a React app
// - Uses VaultProptech content (services, trust badges, pricing) styled with Atlys-like clean hero + CTA

const SERVICES = [
  { id: 1, title: "E-Khata", subtitle: "Digital property record issued by BBMP", price: "₹3,000", tag: "Popular" },
  { id: 2, title: "Khata Transfer", subtitle: "Record of change in property ownership", price: "₹10,000", tag: "Offer" },
  { id: 3, title: "BESCOM Name Change", subtitle: "Update electricity bill records", price: "₹5,000", tag: "Quick" },
  { id: 4, title: "Deed Drafting", subtitle: "Sale deed, release deed, will drafting", price: "₹10,000", tag: "Legal" },
  { id: 5, title: "Due Diligence", subtitle: "Legal check before property transaction", price: "₹15,000", tag: "Pro" },
  { id: 6, title: "Registry of Property", subtitle: "Registers property ownership officially", price: "₹40,000", tag: "Full" },
];

const TRUSTED = [
  "DLF", "Prestige", "Sobha", "Brigade", "Godrej"
];

export default function VaultAtlysLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* NAV */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">V</div>
          <div>
            <div className="font-semibold">VaultProptech</div>
            <div className="text-xs text-slate-500">Property docs, simplified</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a className="hover:underline" href="#services">Services</a>
          <a className="hover:underline" href="#how">How it works</a>
          <a className="hover:underline" href="#pricing">Pricing</a>
          <a className="hover:underline" href="#contact">Contact</a>
          <button className="ml-2 px-4 py-2 rounded-lg border border-slate-200">Request a service</button>
        </nav>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-400 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              The fastest way to get property documentation — delivered.
            </h1>
            <p className="mt-4 text-lg opacity-90">Simplify and expedite legal & statutory property processes — trusted across Bengaluru.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#request" className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold shadow-sm">Request a service</a>
              <a href="#services" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 rounded-lg">Explore services</a>
            </div>

            <div className="mt-6 flex gap-6 text-sm opacity-90">
              <div>
                <div className="text-2xl font-bold">1,000+</div>
                <div className="text-xs">Societies across Bengaluru</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-xs">Property owners helped</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">E-Khata</h3>
                    <p className="text-xs opacity-90">Digital property record issued by BBMP</p>
                  </div>
                  <div className="text-lg font-semibold">₹3,000</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Khata Transfer</h3>
                    <p className="text-xs opacity-90">Record of change in property ownership</p>
                  </div>
                  <div className="text-lg font-semibold">₹10,000</div>
                </div>
                <div className="text-xs text-white/80">Offer valid till New Year</div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-4 w-64 bg-white rounded-xl p-4 shadow-lg">
              <div className="text-sm font-medium">Request a Service</div>
              <div className="mt-3 text-xs text-slate-600">Get your document checklist, quote & timeline.</div>
              <div className="mt-4">
                <a className="inline-block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium" href="#request">Start now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED LOGOS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center text-sm text-slate-500">Trusted by Bengaluru's leading communities</div>
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
          {TRUSTED.map((t) => (
            <div key={t} className="flex items-center justify-center py-4">
              <div className="text-xs font-semibold text-slate-600">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-bold">All property services you need, in one place</h2>
              <p className="mt-2 text-sm text-slate-600">Documentation, legal, conveyancing and more — curated by experts.</p>
            </div>
            <a href="#pricing" className="text-sm text-indigo-600 font-medium">See pricing →</a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <article key={s.id} className="rounded-xl bg-white p-6 shadow-sm border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{s.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{s.price}</div>
                    <div className="text-xs text-slate-400">starting</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500">{s.tag}</div>
                  <a href="#request" className="text-sm font-medium text-indigo-600">Apply now →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Simple steps. Trusted process.</h2>
        <p className="text-sm text-slate-600 mt-2">From request to delivery — three transparent steps.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-2xl font-bold">1</div>
            <h4 className="mt-3 font-semibold">Request a Service</h4>
            <p className="mt-2 text-sm text-slate-500">Tell us which service you need — upload documents or request a call.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-2xl font-bold">2</div>
            <h4 className="mt-3 font-semibold">Send Documents</h4>
            <p className="mt-2 text-sm text-slate-500">Securely share papers and we verify legally and logistically.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-2xl font-bold">3</div>
            <h4 className="mt-3 font-semibold">Delivery & Support</h4>
            <p className="mt-2 text-sm text-slate-500">Get updates and final deliverables. Local support available 24x7.</p>
          </div>
        </div>
      </section>

      {/* PRICING HIGHLIGHTS */}
      <section id="pricing" className="bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Pricing highlights</h3>
              <p className="text-sm text-slate-600 mt-1">Transparent, itemised price points so you know what you're paying for.</p>
            </div>
            <a className="text-indigo-600 font-medium" href="#contact">Get a custom quote</a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white p-6 border shadow-sm">
              <h4 className="font-semibold">E-Khata</h4>
              <div className="mt-2 text-2xl font-bold">₹3,000</div>
              <p className="text-sm text-slate-500 mt-2">Fast digital record issued by BBMP. 24–72 hour turnaround for most localities.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border shadow-sm">
              <h4 className="font-semibold">Khata Transfer</h4>
              <div className="mt-2 text-2xl font-bold">₹10,000</div>
              <p className="text-sm text-slate-500 mt-2">Assistance with ownership transfer and documentation.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border shadow-sm">
              <h4 className="font-semibold">Due Diligence</h4>
              <div className="mt-2 text-2xl font-bold">₹15,000</div>
              <p className="text-sm text-slate-500 mt-2">Comprehensive legal check prior to purchase — avoid surprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / REQUEST */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl font-bold">Request a service</h3>
            <p className="text-sm text-slate-600 mt-2">Tell us what you need and we'll get back with checklist & timeline.</p>

            <form className="mt-6 space-y-4 bg-white p-6 rounded-xl border shadow-sm">
              <div>
                <label className="text-xs font-medium">Name</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 text-sm" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs font-medium">Email</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 text-sm" placeholder="you@domain.com" />
              </div>
              <div>
                <label className="text-xs font-medium">Service required</label>
                <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm">
                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium">Phone (optional)</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 text-sm" placeholder="+91 9XXXXXXXXX" />
              </div>
              <div className="pt-2">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">Request Quote</button>
              </div>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl bg-white p-6 border shadow-sm">
              <h4 className="font-semibold">Local support</h4>
              <p className="text-sm text-slate-600 mt-2">Services tailored to Bengaluru residents. Multi-language support available.</p>
              <div className="mt-4 text-sm">Phone: <span className="font-medium">+91 80-XXXX-XXXX</span></div>
            </div>

            <div className="rounded-xl bg-white p-6 border shadow-sm">
              <h4 className="font-semibold">Why choose Vault</h4>
              <ul className="mt-2 text-sm text-slate-600 space-y-2">
                <li>Trusted legal expertise</li>
                <li>Fast turnaround for many services</li>
                <li>Transparent pricing</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-bold">VaultProptech</div>
            <div className="text-sm text-slate-400 mt-2">Simplifying property documentation for Bengaluru.</div>
          </div>
          <div>
            <div className="font-semibold">Quick links</div>
            <ul className="mt-2 text-sm text-slate-400 space-y-2">
              <li>Services</li>
              <li>Pricing</li>
              <li>About us</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <div className="text-sm text-slate-400 mt-2">support@vaultproptech.com</div>
            <div className="text-sm text-slate-400 mt-2">Bengaluru, India</div>
          </div>
        </div>
        <div className="mt-6 text-center text-slate-500 text-xs">© {new Date().getFullYear()} VaultProptech — All rights reserved.</div>
      </footer>
    </div>
  );
}
