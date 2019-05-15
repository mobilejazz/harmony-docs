// React
import React, { Component } from 'react';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../assets/styles/theme';

// App services
import GitHubService from '../../services/github';

// Components
import AppBar from '../../components/AppBar/AppBar';

// Component files
import './App.scss';

class App extends Component {
  constructor(
    props: any,
    private gitHubService: GitHubService,
  ) {
    super(props);
    this.gitHubService = new GitHubService();
  }

  state = {
    file: '',
  }

  componentDidMount(): void {
    // Testing
    // this.gitHubService.getContents().subscribe((response: any) => {
    //   console.log(response);
    // });

    // this.gitHubService.getFileContents('CacheRepository.md').subscribe((response: string) => {
    //   this.setState({file: response})
    // });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppBar />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
