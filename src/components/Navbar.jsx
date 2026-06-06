import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SCHOOL_NAME } from '../config';
import { useAuth } from '../context/AuthContext';

const logoSrc = '/images/logo-2.jpeg';

const Shell = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(18px);
  background: rgba(245, 240, 232, 0.72);
  border-bottom: 1px solid rgba(201, 168, 76, 0.28);
  transition: box-shadow 180ms ease, background 180ms ease;

  &.scrolled {
    box-shadow: 0 12px 30px rgba(26, 18, 8, 0.1);
    background: rgba(245, 240, 232, 0.9);
  }
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;
`;

const BrandLogo = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(27, 58, 107, 0.14), rgba(201, 168, 76, 0.25));
  border: 1px solid rgba(201, 168, 76, 0.48);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    inset-inline: 0;
    background: rgba(245, 240, 232, 0.98);
    border-bottom: 1px solid rgba(201, 168, 76, 0.22);
    padding: 1rem 1.25rem 1.2rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const NavItem = styled(NavLink)`
  color: rgba(26, 18, 8, 0.82);
  font-weight: 700;
  padding: 0.55rem 0.6rem;
  border-radius: 999px;

  &.active {
    color: var(--dark-ink);
    background: rgba(201, 168, 76, 0.12);
  }
`;

const GoldButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  font-weight: 700;
  color: var(--dark-ink);
  background: linear-gradient(135deg, var(--gold), var(--light-gold));
  box-shadow: 0 10px 20px rgba(201, 168, 76, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const homeTarget = isLoggedIn ? '/home' : '/login';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Shell className={scrolled ? 'scrolled' : ''}>
      <Inner>
        <Brand to={homeTarget} aria-label={SCHOOL_NAME}>
          <BrandLogo>
            {logoSrc ? (
              <img src={logoSrc} alt={SCHOOL_NAME} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--cobalt)', fontWeight: 700 }}>✝</span>
            )}
          </BrandLogo>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.02em' }}>{SCHOOL_NAME}</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(26, 18, 8, 0.64)' }}>Coptic Educational Platform</div>
          </div>
        </Brand>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((current) => !current)}
          style={{
            display: 'none',
            border: 0,
            background: 'transparent',
            color: 'var(--dark-ink)',
            padding: 0,
          }}
          className="mobile-menu-trigger"
        >
          {open ? <X /> : <Menu />}
        </button>

        <Nav $open={open}>
          <NavItem to={homeTarget}>Home</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <Actions>
            {!isLoggedIn ? (
              <>
                <GoldButton
                  type="button"
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  <LogIn size={16} />
                  Login
                </GoldButton>
                <GoldButton
                  type="button"
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  <UserPlus size={16} />
                  Sign Up
                </GoldButton>
              </>
            ) : (
              <GoldButton
                type="button"
                onClick={() => {
                  signOut();
                  navigate('/login');
                }}
              >
                <LogOut size={16} />
                Logout
              </GoldButton>
            )}
          </Actions>
        </Nav>
      </Inner>
      <style>{`@media (max-width: 768px) { .mobile-menu-trigger { display: inline-flex !important; align-items: center; justify-content: center; } }`}</style>
    </Shell>
  );
}
