import styles from './page.module.css';
import CloseMediaPackButton from '@/components/CloseMediaPackButton';

export const metadata = {
  title: 'Media Pack (Print) | Young Astronomers UK',
  description: 'Print-friendly one-page media pack for partners and advertisers.',
};

export default function MediaPackPrintPage() {
  return (
    <main className={styles.page}>
      <style>{`nav, footer { display: none !important; }`}</style>
      <div className={styles.toolbar}>
        <CloseMediaPackButton />
      </div>
      <article className={styles.sheet}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Young Astronomers UK</p>
          <h1 className={styles.title}>Media Pack 2026</h1>
          <p className={styles.subtitle}>
            Partner with a mission-led platform connecting families, schools, and young people with astronomy and science learning across the UK.
          </p>
        </header>

        <section className={styles.grid}>
          <div className={styles.card}>
            <h2>Audience Profile</h2>
            <ul>
              <li>Parents and carers seeking high-quality STEM enrichment</li>
              <li>Children and teenagers exploring astronomy and science</li>
              <li>Educators, clubs, outreach teams, and community groups</li>
              <li>Mission-aligned audience focused on educational outcomes</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Partnership Formats</h2>
            <ul>
              <li>Themed content sponsorships</li>
              <li>Outreach and event support opportunities</li>
              <li>Educational product and service features</li>
              <li>Bespoke partnerships designed around shared goals</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>What You Receive</h2>
            <ul>
              <li>Collaborative campaign planning</li>
              <li>Placement and visibility options</li>
              <li>Timeline and delivery coordination</li>
              <li>Mission-safe brand alignment</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Campaign Information To Include</h2>
            <ul>
              <li>Organisation name and website</li>
              <li>Primary campaign objective</li>
              <li>Desired audience or region</li>
              <li>Preferred launch window and budget range</li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p className={styles.contact}>
            Contact: hello@youngastronomersuk.science
          </p>
          <div className={styles.actions}>
            <a className={styles.button} href="mailto:hello@youngastronomersuk.science?subject=Media%20Pack%20Enquiry">
              Request Partnership Call
            </a>
            <span className={`${styles.button} ${styles.buttonSecondary}`}>
              Export: Press Ctrl+P (Cmd+P on Mac), then Save as PDF
            </span>
          </div>
        </footer>
      </article>
    </main>
  );
}
