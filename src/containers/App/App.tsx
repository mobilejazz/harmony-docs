// React
import React, { Component } from 'react';
// Dependencies
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
// Components
import SideNav from '../../components/SideNav/SideNav';
import Item from '../../interfaces/item';
import MenuItem from '../../interfaces/menu-item';
// Interfaces
import State from '../../interfaces/state';
// Services
import GitHubService from '../../services/github';
// Assets
import './App.scss';

class App extends Component<any> {
    constructor(
        props: any,
        private gitHubService: GitHubService,
    ) {
        super(props);
        this.gitHubService = new GitHubService();
    }

    state: State = {
        items: [],
        menu: [],
        path: '',
    }

    public componentDidMount(): void {
        const items: Item[] = [];
        const menu: MenuItem[] = [];
        this.getRepoContents(0, items, menu)
            .subscribe((response) => {
                const existingItems = [...this.state.items];
                const existingMenu = [...this.state.menu];
                console.log('REPAINT');
                console.log('response', response);
                this.setState({
                    items: [...existingItems, ...items],
                    menu: [...existingMenu, ...menu]
                });
                this.goToReadme();
            });
    }

    private getRepoContents(level: number, items: Item[], menu: MenuItem[], path?: string): Observable<any> {

        return new Observable((observer) => {

            console.log('Will call Github service for path: ' , path, ' Level : ', level);

            this.gitHubService.getContents(path)
                .pipe(take(1))
                .subscribe((response: Item[]) => {
                    console.log('Got Github service response for path: ' , path, ' Level : ', level);
                    const observablesArray: any[] = []; // TODO: Add interface

                    response.forEach((item: Item) => {
                        console.log(item.path);
                        // Add item
                        items.push(item)

                        // Create menu item
                        const menuItem: MenuItem = {
                            path: item.path,
                            name: item.name,
                            sha: item.sha,
                        };

                        menu.push(menuItem);

                        // If item is a directory, let's get it's children
                        if (item.type === "dir") {
                            menuItem.children = [];
                            observablesArray.push(this.getRepoContents(level + 1, items, menuItem.children, item.path));
                        }
                    });

                    console.log('oblength', observablesArray.length);

                    if(observablesArray.length > 0) {
                        forkJoin(observablesArray).subscribe(() => {
                            console.log('FORK JOIN COMPLETED');
                            observer.next(true);
                            observer.complete();
                        });
                    } else {
                        console.log('EMPTY COMPLETED');
                        observer.next(true);
                        observer.complete();
                    }

                })
            ;
        });
    }

    private getItemIndex(path: string): number {
        return this.state.items.length ? this.state.items.findIndex((item: Item) => item.path === path): -1;
    }

    private getMenuItem(path: string): MenuItem | undefined {
        return this.state.menu.find((menuItem: MenuItem) => menuItem.path === path);
    }

    private fileHasContents(path: string): boolean {
        const itemIndex: number = this.getItemIndex(path);
        return this.state.items[itemIndex] && this.state.items[itemIndex].hasOwnProperty('content');
    }

    private getFileContents(path: string): void {
        this.gitHubService.getFileContents(path)
            .pipe(
                take(1)
            )
            .subscribe(
                (response: string) => {
                    const itemIndex: number = this.getItemIndex(path);
                    const newItems: any[] = [...this.state.items];
                    newItems[itemIndex].content = response;
                    this.setState({items: newItems});
                },
                err => {}
            );
    }

    private handlePathChange(path: string): void {
        if (path === this.state.path) {
            return;
        }

        if (!this.fileHasContents(path)) {
            this.getFileContents(path);
        }

        const newPath: string = path;

        this.setState({path: newPath});
    }

    private goToReadme(): void {
        if (this.props.location.pathname !== '/') {
            return;
        }

        this.gitHubService.getReadme()
            .pipe(
                take(1)
            )
            .subscribe(
                (response: Item) => {
                    this.handlePathChange(response.path);
                    this.props.history.push(response.path);
                },
                err => {}
            );
    }

    render() {
        return (
            <div className="App">
                <SideNav
                    location={this.props.location.pathname}
                    menu={this.state.menu}
                    items={this.state.items}
                    handlePathChange={(path: string) => this.handlePathChange(path)}
                />
                {/* <Route
          path="/:path"
          render={(props) => (
            <Main
              {...props}
              items={this.state.items}
              handlePathChange={(path: string) => this.handlePathChange(path)}
            />
          )}
        /> */}
            </div>
        );
    }
}

export default App;
