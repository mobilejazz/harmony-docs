// React
import React from 'react';

// Dependencies
import Markdown from 'react-markdown';

// Assets
import './Main.scss';

const main = (props: any) => {
  return (
    <div className="Main">
      <Markdown source= {props.item ? props.item.content : null} />
    </div>
  );
}

export default main;
