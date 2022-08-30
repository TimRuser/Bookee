import React from "react";
import ListMarks  from "./ListMarks"

import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { SpeedDial, SpeedDialAction, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reload: false};
    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState({reload: true}, () => this.setState({reload: false}));
  }

  render() {
    const actions = [
      { icon: <AddIcon />, name: 'Add' },
      { icon: <MenuIcon />, name: 'Menu' }
    ]
    return (
      <div id="root">
        <ThemeProvider theme={darkTheme}>
          <AppBar position="sticky">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                Bookmarks
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="bookmarks-wrapper">
            {this.state.reload == false &&
              <ListMarks reload={this.state.reload}/>
            }
          </div>
          <SpeedDial
            ariaLabel="Add Bookmarks and Folders"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            id="add-button"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              >
              </SpeedDialAction>
            ))}
          </SpeedDial>
        </ThemeProvider>
        
      </div>
    );
  }
}

export { App };
