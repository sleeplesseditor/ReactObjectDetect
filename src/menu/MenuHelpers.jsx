import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconSelector } from './Icons/IconSelector';

function useOutsideAlerter(ref, openView) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                openView(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function DropdownItem({ children, goToMenu, leftIcon, rightIcon, setActiveMenu, subMenu }) {
    return (
      <a href={subMenu ? subMenu : '#'} className="menu-item" onClick={() => goToMenu && setActiveMenu(goToMenu)}>
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </a>
    );
}

const NewMenu = ({
    activeMenu,
    activeMenuProp,
    calcHeight,
    menuData: { menuTitles, subMenus },
    setActiveMenu
}) => {
    if (menuTitles) {
        return (
            <>
            <CSSTransition
                in={activeMenuProp}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    {menuTitles.map(link => (
                        <DropdownItem 
                            leftIcon={IconSelector(link.icon)} 
                            setActiveMenu={setActiveMenu} 
                            goToMenu={link.link}
                        >
                            {link.title}
                        </DropdownItem>
                    ))}
                </div>
            </CSSTransition>
            {subMenus.map(submenu => (
                <CSSTransition
                in={activeMenu === `${submenu.activeMenu}`}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem 
                        goToMenu="main" 
                        leftIcon={IconSelector(submenu.backIcon)} 
                        setActiveMenu={setActiveMenu} 
                    >
                        <h3>{submenu.menuTitle}</h3>
                    </DropdownItem>
                    {submenu.menuLinks.map(link => (
                        <DropdownItem 
                            leftIcon={IconSelector(link.icon)} 
                            subMenu={link.link}
                        >
                            {link.title}
                        </DropdownItem>
                    ))}
                </div>
                </CSSTransition>
            ))}
            </>
        )
    } else {
        return null
    }
};

export { NewMenu, useOutsideAlerter };