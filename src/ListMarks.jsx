import React from 'react';
import { readTextFile, writeTextFile, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

class ListMarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsOutput: Array(),
            tabContentOutput: Array(),
            tabValue: this.props.folder,
            noFolders: false,
            anchorEl: null,
            openMenu: false
        }
        this.tabCount = 0;
        this.outputList = Array();
        this.jsonBookmarks;
        this.removeMark = this.removeMark.bind(this);
        this.setListItems = this.setListItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.convertToOutput = this.convertToOutput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.writeTextFile = this.writeTextFile.bind(this);
    }
    componentDidMount() {
        this.setListItems();
    };

    handleChange(event, newValue) {
        this.setState({tabValue: newValue});
    }

    handleClick(event) {
        this.setState({anchorEl: event.currentTarget, openMenu: true});
    }
    handleClose(action) {
        if(action === 'delete') {
            this.setState({anchorEl: null, openMenu: false});
            this.removeFolder(this.state.tabValue - 1)
        }
    }

    removeMark(folder, key) {
        const newJsonBookmarks = this.jsonBookmarks;
        const folderIndex = newJsonBookmarks.bookmarks.findIndex((object) => {
            return object.folderName === folder;
        })
        newJsonBookmarks.bookmarks[folderIndex].folderContent = this.jsonBookmarks.bookmarks[folderIndex].folderContent.filter((object) => {
            return object.key !== key;
        })

        this.writeTextFile(newJsonBookmarks);
    }
    removeFolder(folder) {
        const newJsonBookmarks = this.jsonBookmarks;
        newJsonBookmarks.bookmarks.splice(folder, 1);
        this.writeTextFile(newJsonBookmarks);
        if (this.state.tabValue > 1) {
            this.setState({tabValue: this.state.tabValue - 1});
        }
    }

    setListItems(passedBookmarks) {
        this.tabCount = 0;
        if (passedBookmarks) {
            this.jsonBookmarks = passedBookmarks;
            if (this.jsonBookmarks.bookmarks.length > 0) {
                const listItems = this.jsonBookmarks.bookmarks.map((object) => {
                    if(object.folderContent.length > 0) {
                        const currentFolder = object.folderName;
                        const returnObject = object.folderContent.map((object) => {
                            return (
                                <li key={object.key}>
                                    <IconButton id="closeIcon" size="small" onClick={() => this.removeMark(currentFolder, object.key)}>
                                        <CloseIcon />
                                    </IconButton>
                                    <p className="bookmark-title">{object.name}</p>
                                    <a className="bookmark-url" href={object.url} target="_blank">{object.url}</a>
                                </li>
                            );
                        })
                        this.tabCount++;
                        return (
                            [
                                <Tab label={object.folderName} value={this.tabCount.toString()} />,
                                <TabPanel value={this.tabCount.toString()}>{returnObject}</TabPanel>
                            ]
                        );
                    } else {
                        this.tabCount++;
                        return (
                            [
                                <Tab label={object.folderName} value={this.tabCount.toString()} />,
                                <TabPanel value={this.tabCount.toString()}><p className="no-bookmarks">There are no bookmarks in this folder.</p></TabPanel>
                            ]
                        );
                    }
                });
                this.outputList = listItems;
                this.convertToOutput();
            } else {
                this.setState({noFolders: true})
            }
        } else {
            readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
                if (bookmarks) {
                    this.jsonBookmarks = JSON.parse(bookmarks);
                    if (this.jsonBookmarks.bookmarks.length > 0) {
                        const listItems = this.jsonBookmarks.bookmarks.map((object) => {
                            if(object.folderContent.length > 0) {
                                const currentFolder = object.folderName;
                                const returnObject = object.folderContent.map((object) => {
                                    return (
                                        <li key={object.key}>
                                            <IconButton size="small" id="closeIcon" onClick={() => this.removeMark(currentFolder, object.key)}>
                                                <CloseIcon />
                                            </IconButton>
                                            <p className="bookmark-title">{object.name}</p>
                                            <a className="bookmark-url" href={object.url} target="_blank">{object.url}</a>
                                        </li>
                                    );
                                })
                                this.tabCount++
                                return (
                                    [
                                        <Tab label={object.folderName} value={this.tabCount.toString()} />,
                                        <TabPanel value={this.tabCount.toString()}>{returnObject}</TabPanel>
                                    ]
                                );
                            } else {
                                this.tabCount++;
                                return (
                                    [
                                        <Tab label={object.folderName} value={this.tabCount.toString()} />,
                                        <TabPanel value={this.tabCount.toString()}><p className="no-bookmarks">There are no bookmarks in this folder.</p></TabPanel>
                                    ]
                                );
                            }
                        });
                        this.outputList = listItems;
                        this.convertToOutput();
                    } else {
                        this.setState({noFolders: true})
                    }
                } 
            }).catch((error) => {
                console.log(error);
                const fileContent = '{"bookmarks":[{"folderName": "Default", "folderKey": "Default", "folderContent": []}]}'
                createDir('', { dir: BaseDirectory.App, recursive: true }).then(() => {
                    this.writeTextFile(JSON.parse(fileContent));
                })
            })
        }
    }

    writeTextFile(newJsonBookmarks) {
        writeTextFile('bookmarks.json', JSON.stringify(newJsonBookmarks), { dir: BaseDirectory.App }).catch((error) => {
            console.log(error);
        })
        this.setListItems(newJsonBookmarks);
    }

    convertToOutput() {
        const oldTabsOutput = [];
        const oldTabContentOutput = [];
        for (let i = 0; i < this.outputList.length; i++) {
            oldTabsOutput.push(this.outputList[i][0])
            oldTabContentOutput.push(this.outputList[i][1])
        }
        this.setState({tabContentOutput: oldTabContentOutput, tabsOutput: oldTabsOutput})
    }

    render() {
        return (
            <React.Fragment>
               {this.state.noFolders == false &&
                    <React.Fragment>
                        <IconButton id="listMarks-moreIcon" onClick={this.handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.openMenu}
                            onClose={this.handleClose}
                            className="listMarks-menu"
                        >
                            <MenuItem onClick={() => this.handleClose('delete')}>Delete Folder</MenuItem>
                        </Menu>
                        <Box sx={{ width: '100%', typography: 'body1' }} className="list-wrapper">
                            <TabContext value={this.state.tabValue.toString()}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={this.handleChange} aria-label="lab API tabs example">
                                    {this.state.tabsOutput}
                                </TabList>
                                </Box>
                                {this.state.tabContentOutput}
                            </TabContext>
                        </Box>
                    </React.Fragment>
                }
                {this.state.noFolders == true &&
                    <p className="no-folders">You don't have any folders. To get started, hover over the button in the bottom right and select "Add folder".</p>
                }
            </React.Fragment>
            
            
        );
    }
}

export default ListMarks;