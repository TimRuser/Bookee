import React from "react";
import ListMarks  from "./ListMarks"
import CreateMarks from "./CreateMarks"
import CreateFolders from "./CreateFolders"

import MenuIcon from "@mui/icons-material/Menu"
import FolderIcon from '@mui/icons-material/Folder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';

import { SpeedDial, SpeedDialAction, AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#835BE7'
    }
  }
})

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      renderBookmarksCreate: false,
      renderFoldersCreate: false,
      folder: 1,
      anchorOpen: false
    };
    this.handler = this.handler.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({anchorOpen: !this.state.anchorOpen})
  }

  handler(action, folder) {
    if (action === 'reload') {
      this.setState({reload: true}, () => this.setState({reload: false, folder: folder}));
    } else if (action === 'createMarks') {
      this.setState({renderBookmarksCreate: !this.state.renderBookmarksCreate, renderFoldersCreate: false});
    } else if (action === 'createFolders') {
      this.setState({renderFoldersCreate: !renderFoldersCreate, renderBookmarksCreate: false})
    }
  }

  render() {
    const actions = [
      { icon: <BookmarkIcon />, name: 'Add bookmark', event: 'createMarks' },
      { icon: <FolderIcon />, name: 'Add folder', event: 'createFolders' }
    ]
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={this.toggleDrawer}
        onKeyDown={this.toggleDrawer}
      >
        <List>
          {['Bookmarks'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );  
    return (
      <React.Fragment key='left'>
        <ThemeProvider theme={darkTheme}>
          <Drawer
            anchor='left'
            open={this.state.anchorOpen}
            onClose={this.toggleDrawer}
          >
            {list('left')}
          </Drawer>
          <AppBar position="sticky">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={this.toggleDrawer}>
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

export default Bookmarks;