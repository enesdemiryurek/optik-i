import React from 'react';

export default function SocialTooltip({ scale = 1 }: { scale?: number }) {
  return (
    <>
      <style>{`
        .social-container {
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .social-container .icon-content {
          margin: 0 10px;
          position: relative;
        }
        .social-container .icon-content .tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          padding: 6px 10px;
          border-radius: 5px;
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          font-size: 14px;
          transition: all 0.3s ease;
          white-space: nowrap;
          z-index: 10;
        }
        .social-container .icon-content:hover .tooltip {
          opacity: 1;
          visibility: visible;
          bottom: -40px;
        }
        .social-container .icon-content a {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: #4d4d4d;
          background-color: #fff;
          transition: all 0.3s ease-in-out;
          border: 1px solid #eee;
        }
        .social-container .icon-content a:hover {
          box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
          color: white;
        }
        .social-container .icon-content a svg {
          position: relative;
          z-index: 1;
          width: 20px;
          height: 20px;
        }
        .social-container .icon-content a .filled {
          position: absolute;
          top: auto;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background-color: #000;
          transition: all 0.3s ease-in-out;
        }
        .social-container .icon-content a:hover .filled {
          height: 100%;
        }
        .social-container .icon-content a[data-social="instagram"] .filled,
        .social-container .icon-content a[data-social="instagram"] ~ .tooltip {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        .social-container .icon-content a[data-social="tiktok"] .filled,
        .social-container .icon-content a[data-social="tiktok"] ~ .tooltip {
          background-color: #000000;
        }
      `}</style>
      <ul className="social-container" style={{ transform: `scale(${scale})`, transformOrigin: 'center', margin: scale > 1 ? `${(scale - 1) * 20}px 0` : '0' }}>
        <li className="icon-content">
          <a href="https://instagram.com/caddeoptik_2025" aria-label="Instagram" data-social="instagram" target="_blank" rel="noopener noreferrer">
            <div className="filled" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <div className="tooltip">Instagram</div>
        </li>
        <li className="icon-content">
          <a href="https://tiktok.com/@caddeoptik" aria-label="TikTok" data-social="tiktok" target="_blank" rel="noopener noreferrer">
            <div className="filled" />
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          </a>
          <div className="tooltip">TikTok</div>
        </li>
      </ul>
    </>
  );
}
