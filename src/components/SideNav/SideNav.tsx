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
          <li key={child.sha}>
            <Link to={`/${child.path}`} onClick={() => {updatePath(child.path)}}>
              {child.name}
            </Link>
          </li>
        ) : null;
      });

      return (
        <li key={item.sha}>
          {item.name} ▾
          <ul>
            {children}
          </ul>
        </li>
      );
    }

    return !item.path.includes('/') ? (
      <li key={item.sha}>
        <Link to={`/${item.path}`} onClick={() => {updatePath(item.path)}}>{item.name}</Link>
      </li>
    ) : null;
  });

  return (
    <div className="SideNav">
      <ul>
        {itemsList}
      </ul>
    </div>
  );
}

export default sideNav;
