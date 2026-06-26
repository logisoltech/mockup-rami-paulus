import ApproachSection from "@/components/ApproachSection";
import BrandRevealSection from "@/components/BrandRevealSection";

export default function HomeContent() {
  return (
    <>
      <div className="page">
        <header>
          <div className="logo reveal-item reveal-nav">Northline Advisory</div>
          <nav>
            <a href="#" className="reveal-item reveal-nav">
              Work
            </a>
            <a href="#" className="reveal-item reveal-nav">
              Approach
            </a>
            <a href="#" className="reveal-item reveal-nav">
              Insights
            </a>
            <a href="#" className="reveal-item reveal-nav">
              Contact
            </a>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="eyebrow reveal-item reveal-hero">
              Operator-focused B2B advisory
            </div>

            <h1 className="reveal-item reveal-hero">
             Moving Companies With Intent.
            </h1>

            <div className="hero-bottom">
              <p className="reveal-item reveal-hero">
                We help founders, operators, and leadership teams clarify their
                position, refine their offer, and build disciplined growth
                systems.
              </p>

              <div>
                <p className="reveal-item reveal-hero">
                  No noise. No bloated decks. Just rigorous thinking, decisive
                  execution, and a clear path forward.
                </p>
                <a href="#" className="button reveal-item reveal-hero">
                  Start a conversation
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <BrandRevealSection />


      <div className="page">
        <main>
          <section>
            <div className="section-label">What we believe</div>
            <p className="statement">
              Growth does not come from doing more. It comes from knowing what
              matters, removing what does not, and executing with precision.
            </p>
          </section>

        <section>
          <div className="section-label">Services</div>

          <div className="grid">
            <div className="card">
              <span>01</span>
              <h3>Positioning</h3>
              <p>
                Define the strategic narrative that makes your company easier to
                understand, trust, and buy from.
              </p>
            </div>

            <div className="card">
              <span>02</span>
              <h3>Growth Systems</h3>
              <p>
                Build simple, repeatable structures for acquisition, conversion,
                retention, and operational focus.
              </p>
            </div>

            <div className="card">
              <span>03</span>
              <h3>Operator Advisory</h3>
              <p>
                Work directly with leadership to solve high-leverage business
                problems with clarity and restraint.
              </p>
            </div>
          </div>
        </section>
        </main>
      </div>

      <ApproachSection />

      <div className="page">
        <main>
        <section>
          <div className="quote">
            <div className="section-label">Client note</div>
            <blockquote>
              &ldquo;They brought the restraint, clarity, and strategic pressure
              we needed.&rdquo;
            </blockquote>
            <p>&mdash; Managing Partner, B2B Services Firm</p>
          </div>
        </section>

        <section className="final-cta">
          <div>
            <div className="section-label">Begin</div>
            <h2>Let&apos;s make the business easier to understand.</h2>
          </div>

          <a href="#" className="button">
            Discuss the project
          </a>
        </section>
        </main>

        <footer>
          <p>&copy; 2026 Northline Advisory</p>
          <p>New York / Remote</p>
        </footer>
      </div>
    </>
  );
}
