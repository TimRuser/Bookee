import React from "react";
import ListMarks  from "./ListMarks"
import CreateMarks from "./CreateMarks"

import MenuIcon from '@mui/icons-material/Menu'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { SpeedDial, SpeedDialAction, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      renderCreate: false
    };
    this.handler = this.handler.bind(this);
  }

  handler(action) {
    if (action === 'reload') {
      this.setState({reload: true}, () => this.setState({reload: false}));
    }
    if (action === 'createMarks') {
      const value = this.renderCreate ? false : true;
      this.setState({renderCreate: value});
    }
  }

  render() {
    const actions = [
      { icon: <BookmarkIcon />, name: 'Add', event: 'createMarks' },
      { icon: <MenuIcon />, name: 'Menu', event: 'createFolders' }
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
          {this.state.renderCreate == true && 
            <CreateMarks handler={this.handler}/>
          }
          <div className="bookmarks-wrapper">
            {this.state.reload == false &&
              <ListMarks />
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
                onClick={() => this.handler(action.event)}
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
