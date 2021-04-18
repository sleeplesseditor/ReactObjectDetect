import React, { useState, useEffect, useRef } from 'react';
import { NewMenu, useOutsideAlerter } from './MenuHelpers';
import './Menu.scss';

import MenuData from './Data/menu-data.json';

function Menu({ navIcon, title }) {
  const [open, setOpen] = useState(false);
  
  function Navbar({ children, title }) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-link">
          <h3 className='navbar-heading' data-testid='navbar-main'>
            {title}
          </h3>
        </a>
        <ul className="navbar-nav">{children}</ul>
      </nav>
    );
  }
  
  function NavItem({ icon, children }) {  
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {icon}
        </a>
        {open && children}
      </li>
    );
  }
  
  function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    useOutsideAlerter(dropdownRef, setOpen);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        <NewMenu
          activeMenu={activeMenu}
          activeMenuProp={activeMenu === 'main'}
          calcHeight={calcHeight}
          menuData={MenuData}
          setActiveMenu={setActiveMenu}
        />
      </div>
    );
  }

  return (
    <Navbar title={title}>
      <NavItem icon={navIcon}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}
  
export default Menu;