// React
import React, { Component } from 'react';

// Dependencies
import Markdown from 'react-markdown';

// Interfaces
import Item from '../../interfaces/item';

// Assets
import './Main.scss';

class Main extends Component<any> {
  public componentDidUpdate(): void {
    this.updateCurrentPath(this.getCurrentPath());
  }

  private getCurrentPath(): string {
    return this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
  }

  private updateCurrentPath(path: string): void {
    this.props.handlePathChange(path);
  }

  private getItemIndex(path: string): number {
    return this.props.items.findIndex((item: Item) => item.path === path);
  }

  render() {
    const itemToViewIndex: number = this.getItemIndex(this.getCurrentPath());
    let markdown: string = '';

    if (this.props.items[itemToViewIndex]) {
      markdown = this.props.items[itemToViewIndex].content;
    }

    return (
      <div className="Main">
        <Markdown source={markdown} />
      </div>
    );
  }
}

export default Main;
