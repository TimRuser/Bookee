import React from "react";

import MenuIcon from "@mui/icons-material/Menu"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';

import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#835BE7'
    }
  }
})

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorOpen: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState({anchorOpen: !this.state.anchorOpen})
    }

    render() {
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
                    <ListItemButton onClick={() => this.props.changeSites('bookmarks')}>
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
                    <ListItemButton onClick={() => this.props.changeSites('settings')}>
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
            <React.Fragment key="left">
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
                            Settings
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </React.Fragment>
        )
    }
}

export default Settings;