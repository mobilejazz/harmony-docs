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
      return <li key={item.sha}>{item.name} ▾</li>;
    }

    return (
      <li key={item.sha}>
        <Link to={`/${item.path}`} onClick={() => {updatePath(item.path)}}>{item.name}</Link>
      </li>
    );
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
