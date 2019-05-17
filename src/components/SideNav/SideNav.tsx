// React
import React from 'react';

// Assets
import './SideNav.scss';

const sideNav = (props: any) => {
  const fileListItems =  props.fileTree.map((item: any, index: number) => {
    if (item.type === 'dir') {
      return <li key={item.sha}>{item.name} ▾</li>;
    }

    return <li key={item.sha}>{item.name}</li>
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
