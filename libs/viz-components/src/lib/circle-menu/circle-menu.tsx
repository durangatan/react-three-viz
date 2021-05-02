import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import styled from 'styled-components';

export interface MenuItemProps {
  icon: React.ReactNode;
  children?: React.ReactChild;
  onClick?: () => void;
  id?: string;
}

export interface CircleMenuProps {
  onClose?: () => void;
  items: MenuItemProps[];
  isVisible: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledCircleMenu = styled.ul<{ isVisible: boolean }>`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  right: 0;
  flex-direction: column;
  z-index: 99;
  .MuiSvgIcon-root {
    height: 36px;
    width: 36px;
  }
`;
const CircleMenuLi = styled.li`
  position: relative;
`;

const CircleMenuItem = ({ icon, children, ...rest }: MenuItemProps) => (
  <CircleMenuLi {...rest}>
    {icon}
    {children}
  </CircleMenuLi>
);

export function CircleMenu({
  items,
  onClose,
  isOpen,
  setIsOpen,
  isVisible,
}: CircleMenuProps) {
  const close = useCallback(() => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  }, []);
  const menu = useRef(null);
  useEffect(() => {
    const listener = (event) => {
      const isClickOutside = !event.composedPath().includes(menu.current);
      if (isOpen && isClickOutside) {
        setIsOpen(false);
        close();
      }
    };
    document.addEventListener('click', listener);
  });
  return (
    <StyledCircleMenu ref={menu} isVisible={isVisible}>
      {isOpen ? (
        <>
          <CircleMenuItem icon={<CloseIcon />} onClick={close} />
          {items.map(({ icon, id, ...rest }) => (
            <CircleMenuItem key={id} icon={icon} {...rest} />
          ))}
        </>
      ) : (
        <CircleMenuItem icon={<EditIcon />} onClick={() => setIsOpen(true)} />
      )}
    </StyledCircleMenu>
  );
}

export default CircleMenu;
