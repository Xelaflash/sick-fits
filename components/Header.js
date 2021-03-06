import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
// import Search from './Search';

const Logo = styled.h1`
  background: var(--red);
  font-size: 2rem;
  z-index: 2;
  margin-left: 2rem;
  position: relative;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  position: fixed;
  width: 100%;
  z-index: 1000;
  .bar {
    border-bottom: 10px solid var(--black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    background: white;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black);
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Kicks</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">{/* <Search /> */}</div>
      <Cart />
    </HeaderStyles>
  );
}
