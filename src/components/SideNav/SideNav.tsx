// React
import React from 'react';

// Routing
import { Link } from "react-router-dom";

// Interfaces
import Item from '../../interfaces/item';

// Assets
import './SideNav.scss';

const sideNav = (props: any) => {
  const updatePath = (path: string) => {
    props.handlePathChange(path);
  }

  const itemsList = props.items.map((item: Item) => {
    if (item.type === 'dir') {
      const children: Item[] = props.items.map((child: Item) => {
        return child.path.includes(`${item.path}/`) ? (
          <li className={`menu__sub-item ${props.location === '/' + child.path ? 'menu__sub-item--active' : ''}`} key={child.sha}>
            <Link to={`/${child.path}`} onClick={() => {updatePath(child.path)}}>
              {child.name}
            </Link>
          </li>
        ) : null;
      });

      return (
        <li className="menu__item" key={item.sha}>
          <span>{item.name} ▾</span>
          <ul className="menu__sub-menu">
            {children}
          </ul>
        </li>
      );
    }

    return !item.path.includes('/') ? (
      <li className={`menu__item ${props.location === '/' + item.path ? 'menu__item--active' : ''}`} key={item.sha}>
        <Link to={`/${item.path}`} onClick={() => {updatePath(item.path)}}>{item.name}</Link>
      </li>
    ) : null;
  });

  return (
    <div className="SideNav">
      <ul className="menu">
        {itemsList}
      </ul>
    </div>
  );
}

export default sideNav;
