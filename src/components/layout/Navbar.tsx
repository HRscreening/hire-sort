import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const Navbar = () => {
  const linkHover = {
    rest: { y: 0 },
    hover: { y: -2, transition: { type: 'spring' as const, stiffness: 400, damping: 18 } },
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <motion.a
          href="/"
          className="logo"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
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

        <motion.div
          className="nav-links"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
          }}
        >
          {[
            { href: '/#how', label: 'How it works' },
            { href: '/#features', label: 'Features' },
            { href: '/#pricing', label: 'Pricing' },

          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              variants={{
                hidden: { opacity: 0, y: -10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              initial="rest"
              whileHover="hover"
            >
              <motion.span variants={linkHover} style={{ display: 'inline-block' }}>
                {item.label}
              </motion.span>
            </motion.a>
          ))}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            initial="rest"
            whileHover="hover"
          >
            <Link to="/about">
              <motion.span variants={linkHover} style={{ display: 'inline-block' }}>
                About
              </motion.span>
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            initial="rest"
            whileHover="hover"
          >
            <Link to="/contact_us">
              <motion.span variants={linkHover} style={{ display: 'inline-block' }}>
                Contact Us
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
