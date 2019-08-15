// React
import React, { Component } from 'react';

// Routing
import { Link } from "react-router-dom";

// Interfaces
import MenuItem from '../../interfaces/menu-item';

// Assets
import './SideNav.scss';

class SideNav extends Component<any> { // TODO: Add props and state interface
  state = {
    openSubmenus: ['sha'],
  }

  private updatePath(path: string): void {
    this.props.handlePathChange(path);
  }

  private isSubmenuOpen(sha: string): number {
    return this.state.openSubmenus.findIndex((itemSha: string) => itemSha === sha);
  }

  private toggleSubmenu(sha: string): void {
    const index = this.isSubmenuOpen(sha);
    const openSubmenus = [...this.state.openSubmenus];

    if (index === -1) {
      openSubmenus.push(sha);
    } else {
      openSubmenus.splice(index, 1);
    }

    this.setState({openSubmenus: openSubmenus});
  }

  private getMenuItemClass(item: MenuItem): string {
    const classes: string[] = ['menu__item'];

    if (this.isSubmenuOpen(item.sha) > 0) {
      classes.push('menu__item--submenu-open');
    }

    if (item.children) {
      classes.push('menu__item--submenu-toggle');
    } else {
      classes.push('menu__item--link')
    }

    if (this.isActiveMenuItem(item.path)) {
      classes.push('menu__item--active');
    }

    return classes.join(' ');
  }

  private isActiveMenuItem(path: string): boolean {
    return `/${path}` === this.props.location;
  }

  private renderMenu(items: MenuItem[]): JSX.Element {
    const lineItems = items.map((item: MenuItem) => {
      let submenu: any;

      if (item.children && item.children.length > 0) {
        submenu = this.renderMenu(item.children);
      }

      return (
        item.children ?
        <li className={this.getMenuItemClass(item)} key={item.sha}>
          <div onClick={() => {this.toggleSubmenu(item.sha)}}>
            <span>{item.name}</span>
            <span className={this.isSubmenuOpen(item.sha) > 0 ? 'caret-up' : 'caret-down'}></span>
          </div>
          {submenu}
        </li> :
        <li className={this.getMenuItemClass(item)} key={item.sha}>
          <Link to={`/${item.path}`} onClick={() => {this.updatePath(item.path)}}>
            {item.name}
          </Link>
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

  render() {
    return (
      <div className="SideNav">
        {this.renderMenu(this.props.menu)}
      </div>
    )
  }
}

export default SideNav;
