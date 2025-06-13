/* eslint-disable no-unused-vars */
// import "./styles.module.css"
import colors from "./enums/colors"
import { useEffect, useState } from "react";
import Toggler from "./Toggler";
import React from "react";

const SidebarMain = ({ bgColor, children, isCollapsed, position = 'left', classes }) => {
    const color = colors[bgColor] || colors['white'];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.querySelector('.container-wrapper');
            const toggle = document.querySelector('.mobile-menu-toggle');

            if (container && toggle && !container.contains(event.target) && !toggle.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Clone children and add onClick handler to close mobile menu
    const childrenWithCloseHandler = React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type.name === 'Item') {
            const originalOnClick = child.props.onClick;
            return React.cloneElement(child, {
                onClick: (e) => {
                    // Close mobile menu first
                    setIsMobileMenuOpen(false);
                    // Then call original onClick if exists
                    if (originalOnClick) {
                        originalOnClick(e);
                    }
                }
            });
        }
        return child;
    });

    return (
        <>
            <div className={`container-wrapper ${color} ${classes} pos-${position} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                {childrenWithCloseHandler}
            </div>
            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <i className={`fas fa-${isMobileMenuOpen ? 'times' : 'bars'}`}></i>
            </div>
        </>
    )
}

export default SidebarMain