import styled from 'styled-components';
import { Facebook, Instagram, Mail, Phone, Youtube } from 'lucide-react';
import { SCHOOL_NAME, SCHOOL_NAME_EN } from '../config';

const logoSrc = '/images/logo-2.jpeg';

const Shell = styled.footer`
  margin-top: 3rem;
  background: linear-gradient(180deg, rgba(26, 18, 8, 0.98), rgba(20, 14, 6, 1));
  color: rgba(245, 240, 232, 0.94);
  border-top: 1px solid rgba(201, 168, 76, 0.3);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LogoBox = styled.div`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 16px;
  border: 1px solid rgba(201, 168, 76, 0.38);
  overflow: hidden;
  background: rgba(245, 240, 232, 0.04);
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Social = styled.a`
  width: 2.75rem;
  height: 2.75rem;
  display: inline-grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgba(201, 168, 76, 0.26);
  background: rgba(245, 240, 232, 0.03);
`;

export function Footer() {
  return (
    <Shell>
      <Inner>
        <div>
          <Brand>
            <LogoBox>
              {logoSrc ? (
                <img src={logoSrc} alt={SCHOOL_NAME} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: 'var(--light-gold)', fontFamily: 'var(--font-display)' }}>✝</span>
              )}
            </LogoBox>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--light-gold)' }}>{SCHOOL_NAME}</div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(245, 240, 232, 0.72)' }}>{SCHOOL_NAME_EN}</div>
            </div>
          </Brand>
          <p style={{ marginTop: '1rem', lineHeight: 1.8, color: 'rgba(245, 240, 232, 0.82)' }}>
            منصة تعليمية قبطية تجمع بين اللحن واللغة والطقس في مسار واحد منظم للأعمار والمستويات المختلفة.
          </p>
        </div>

        <div>
          <h3 style={{ marginTop: 0, color: 'var(--light-gold)' }}>Contact</h3>
          <div style={{ display: 'grid', gap: '0.85rem', color: 'rgba(245, 240, 232, 0.86)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}><Mail size={16} /> info@coptic-school.org</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}><Phone size={16} /> +20 000 000 0000</span>
          </div>
        </div>

        <div>
          <h3 style={{ marginTop: 0, color: 'var(--light-gold)' }}>Social</h3>
          <LinkRow>
            <Social href="#" aria-label="Facebook"><Facebook size={17} /></Social>
            <Social href="#" aria-label="Instagram"><Instagram size={17} /></Social>
            <Social href="#" aria-label="YouTube"><Youtube size={17} /></Social>
          </LinkRow>
          <p style={{ marginTop: '1rem', color: 'rgba(245, 240, 232, 0.7)' }}>
            © 2026 {SCHOOL_NAME} · جميع الحقوق محفوظة · All rights reserved.
          </p>
        </div>
      </Inner>
    </Shell>
  );
}
