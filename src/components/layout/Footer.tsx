import { motion, type Variants } from 'framer-motion';
import { Link } from '@tanstack/react-router';

const ease = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const col: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={grid}
    >
      <div className="footer-grid">
        <motion.div className="footer-brand" variants={col}>
          <motion.a
            href="#"
            className="logo"
            style={{ marginBottom: '4px' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
          <motion.img
            src='/logo.png'
            width={28}
            // className="logo-icon"
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 320, damping: 14 }}

          />
            <span className="logo-text">HireSort</span>
          </motion.a>
          <p>AI-powered resume screening that explains its reasoning. Built for hiring teams who value transparency.</p>
        </motion.div>

        {([
          {
            title: 'Product',
            links: [{ label: 'Features' , to: '/#featur'}, { label: 'Pricing' ,to: '/#pricing'},],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Blogs' },
              { label: 'FAQs', to: '/faq' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact_us' },
            ],
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy', to: '/privacy' },
              { label: 'Terms', to: '/terms' },
            ],
          },
        ] as { title: string; links: { label: string; to?: string; href?: string }[] }[]).map((c) => (
          <motion.div key={c.title} className="footer-col" variants={col}>
            <h4>{c.title}</h4>
            {c.links.map((l) =>
              l.to ? (
                <motion.div
                  key={l.label}
                  whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                  style={{ display: 'block' }}
                >
                  <Link to={l.to}>{l.label}</Link>
                </motion.div>
              ) : (
                <motion.a
                  key={l.label}
                  href={l.href ?? '#'}
                  whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                >
                  {l.label}
                </motion.a>
              )
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease }}
      >
        <span>© 2026 HireSort. All rights reserved.</span>
        <span>Made with care for hiring teams everywhere.</span>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
