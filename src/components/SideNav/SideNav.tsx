// React
import React from 'react';

// Routing
import { Link } from "react-router-dom";

// Assets
import './SideNav.scss';

const sideNav = (props: any) => {
  const fileListItems =  props.contents.map((item: any, index: number) => {
    if (item.info.type === 'dir') {
      return <li key={item.info.sha}>{item.info.name} ▾</li>;
    }

    return (
      <li key={item.info.sha}>
        <Link to={`/${item.info.path}`} onClick={() => {props.handlePathChange(item.info.path)}}>{item.info.name}</Link>
      </li>
    );
  });

  return (
    <div className="SideNav">
      <ul>
        {fileListItems}
      </ul>
    </div>
  );
}

export default sideNav;
