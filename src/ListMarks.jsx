import React from 'react';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Divider, Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


class ListMarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: Array(),
            tabValue: 0,
        }
        this.jsonBookmarks;
        this.removeMark = this.removeMark.bind(this);
        this.setListItems = this.setListItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.setListItems();
    };

    handleChange(event, newValue) {
        this.setState({tabValue: newValue})
    }

    removeMark(folder, key) {
        const newJsonBookmarks = this.jsonBookmarks;
        newJsonBookmarks.bookmarks = this.jsonBookmarks.bookmarks.filter((object) => {
            return object.key !== key;
        })

        writeTextFile('bookmarks.json', JSON.stringify(newJsonBookmarks), { dir: BaseDirectory.App }).catch((error) => {
            console.log(error);
        })
        this.setListItems(newJsonBookmarks);
    }

    setListItems(passedBookmarks) {
        if (passedBookmarks) {
            this.jsonBookmarks = passedBookmarks;
                    if (this.jsonBookmarks.bookmarks.length > 0) {
                        const listItems = this.jsonBookmarks.bookmarks.map((object) => {
                            if(object.folderContent.length > 0) {
                                const currentFolder = object.folderName
                                const returnObject = object.folderContent.map((object) => {
                                    return (
                                        <li key={object.key}>
                                            <i className="fa-solid fa-xmark" onClick={() => this.removeMark(currentFolder, object.key)}></i>
                                            <p className="bookmark-title">{object.name}</p>
                                            <a className="bookmark-url" href={object.url} target="_blank">{object.url}</a>
                                        </li>
                                    );
                                })
                            return (
                                <div>
                                    <div key="object.folderKey">
                                        <p className="bookmark-folder-title">{object.folderName}</p>
                                    </div>
                                    <ul>{returnObject}</ul>
                                </div>
                            );
                            }
                            
                        });
                        this.setState({list: listItems});
                    } else {
                        const listItems = (
                            <p className="no-bookmarks">You don't have any bookmarks</p>
                        )
                        this.setState({list: listItems});
                    }
        } else {
            readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
                if (bookmarks) {
                    this.jsonBookmarks = JSON.parse(bookmarks);
                    if (this.jsonBookmarks.bookmarks.length > 0) {
                        const listItems = this.jsonBookmarks.bookmarks.map((object) => {
                            if(object.folderContent.length > 0) {
                                const currentFolder = object.folderName
                                const returnObject = object.folderContent.map((object) => {
                                    return (
                                        <li key={object.key}>
                                            <i className="fa-solid fa-xmark" onClick={() => this.removeMark(currentFolder, object.key)}></i>
                                            <p className="bookmark-title">{object.name}</p>
                                            <a className="bookmark-url" href={object.url} target="_blank">{object.url}</a>
                                        </li>
                                    );
                                })
                            return (
                                <div key={object.key}>
                                    <div key={object.key}>
                                        <p className="bookmark-folder-title">{object.folderName}</p>
                                    </div>
                                    <ul>{returnObject}</ul>
                                </div>
                            );
                            }
                            
                        });
                        this.setState({list: listItems});
                    } else {
                        const listItems = (
                            <p className="no-bookmarks">You don't have any bookmarks</p>
                        )
                        this.setState({list: listItems});
                    }
                } 
            }).catch((error) => {
                console.log(error);
                const fileContent = '{"bookmarks":[{"folderName": "Default", "folderKey": "Default", "folderContent": []}]}'
                writeTextFile('bookmarks.json', fileContent, { dir: BaseDirectory.App }).then(() => {
    
                }).catch((error) => {
                    console.log(error);
                })
            })
        }
    }

    render() {

        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={this.state.tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={this.handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        );
    }
}

export default ListMarks;