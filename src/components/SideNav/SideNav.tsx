// React
import React from 'react';

// Routing
import { Link } from "react-router-dom";

// Interfaces
import MenuItem from '../../interfaces/menu-item';

// Assets
import './SideNav.scss';

const sideNav = (props: any) => {
  const updatePath = (path: string) => {
    props.handlePathChange(path);
  }

  const renderMenu = (items: MenuItem[]) => {
    const lineItems = items.map((item: MenuItem) => {
      let submenu: any;

      if (item.children && item.children.length > 0) {
        submenu = renderMenu(item.children);
      }

      return (
        <li className="menu__item" key={item.sha}>
          {(
            !item.children ?
            <Link to={`/${item.path}`} onClick={() => {updatePath(item.path)}}>{item.name}</Link> :
            <div>
              <span>{item.name}</span>
              <span>▾</span>
            </div>
          )}
          {submenu}
        </li>
      )
    });

    return (
      <ul className="menu">
        {lineItems}
      </ul>
    )
  }

  // const itemsList = props.items.map((item: Item) => {
  //   if (item.type === 'dir') {
  //     const children: Item[] = props.items.map((child: Item) => {
  //       return child.path.includes(`${item.path}/`) ? (
  //         <li className={`menu__sub-item ${props.location === '/' + child.path ? 'menu__sub-item--active' : ''}`} key={child.sha}>
  //           <Link to={`/${child.path}`} onClick={() => {updatePath(child.path)}}>
  //             {child.name}
  //           </Link>
  //         </li>
  //       ) : null;
  //     });

  //     return (
  //       <li className="menu__item" key={item.sha}>
  //         <span>{item.name} ▾</span>
  //         <ul className="menu__sub-menu">
  //           {children}
  //         </ul>
  //       </li>
  //     );
  //   }

  //   return !item.path.includes('/') ? (
  //     <li className={`menu__item ${props.location === '/' + item.path ? 'menu__item--active' : ''}`} key={item.sha}>
  //       <Link to={`/${item.path}`} onClick={() => {updatePath(item.path)}}>{item.name}</Link>
  //     </li>
  //   ) : null;
  // });

  return (
    <div className="SideNav">
      {renderMenu(props.menu)}
    </div>
  );
}

export default sideNav;
