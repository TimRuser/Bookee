import React from "react";
import ListMarks  from "./ListMarks"
import CreateMarks from "./CreateMarks"
import CreateFolders from "./CreateFolders"

import MenuIcon from "@mui/icons-material/Menu"
import FolderIcon from '@mui/icons-material/Folder';
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
      renderBookmarksCreate: false,
      renderFoldersCreate: false,
      folder: 1
    };
    this.handler = this.handler.bind(this);
  }

  handler(action, folder) {
    if (action === 'reload') {
      this.setState({reload: true}, () => this.setState({reload: false, folder: folder}));
    } else if (action === 'createMarks') {
      const value = this.state.renderBookmarksCreate ? false : true;
      this.setState({renderBookmarksCreate: value, renderFoldersCreate: false});
    } else if (action === 'createFolders') {
      const value = this.state.renderFoldersCreate ? false : true;
      this.setState({renderFoldersCreate: value, renderBookmarksCreate: false})
    }
  }

  render() {
    const actions = [
      { icon: <BookmarkIcon />, name: 'Add bookmark', event: 'createMarks' },
      { icon: <FolderIcon />, name: 'Add folder', event: 'createFolders' }
    ]
    return (
      <React.Fragment>
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
          {this.state.renderBookmarksCreate == true && 
            <CreateMarks handler={this.handler} />
          }
          {this.state.renderFoldersCreate == true &&
            <CreateFolders handler={this.handler} />
          }
          <div className="bookmarks-wrapper">
            {this.state.reload == false &&
              <ListMarks folder={this.state.folder}/>
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
      </React.Fragment>
    );
  }
}

export { App };
