'use client';

import { useEffect, useState, type ReactNode } from 'react';

// Works in production but not in dev 
const BfcacheRemount = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setKey((k) => k + 1);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  return <div key={key} className="contents">{children}</div>;
};

export default BfcacheRemount;
