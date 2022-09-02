import React from 'react';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Box, TextField, IconButton, Typography, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class CreateMarks extends React.Component {
    constructor(props) {
        super(props);
        this.jsonBookmarks;
        this.state = {name: '', url: '', folderName: '', folders: Array(), full: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.id === 'name') {
            this.setState({name: event.target.value})
        } else if (event.target.id === 'url') {
            this.setState({url: event.target.value})
        } else if (event.target.name === 'folder-select') {
            this.setState({folderName: event.target.value})
        }
    }
    handleSubmit() {
        if (this.state.name === '' || this.state.url === '' || this.state.folderName === '') {
            this.setState({full: false});
        } else {
            this.setState({full: true});
            const folderIndex = this.jsonBookmarks.bookmarks.findIndex((object) => {
                return object.folderName == this.state.folderName;
            });
            this.jsonBookmarks.bookmarks[folderIndex].folderContent.push({name: this.state.name, url: this.state.url, key: Date.now()})
            
            writeTextFile('bookmarks.json', JSON.stringify(this.jsonBookmarks), { dir: BaseDirectory.App }).then(() => {
                this.setState({name: '', url: '', folderName: ''});
                this.props.handler('reload');
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    componentDidMount () {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit();
            }
        }
        document.addEventListener('keydown', keyDownHandler);

        readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
            this.jsonBookmarks = JSON.parse(bookmarks);
        }).then(() => {
            this.setState({folders: this.jsonBookmarks.bookmarks.map((bookmark) => {
                return (
                    <MenuItem value={bookmark.folderName}>{bookmark.folderName}</MenuItem>
                )})
            })
        })
        
    };

    render() {
        return (
            <div className="createMarks-wrapper">
                <Box
                    sx={{
                        width: 300,
                        height: "auto",
                        backgroundColor: 'grey.800',
                        borderRadius: 1
                    }}
                    className="createMarks-box"
                >
                    
                    <form onSubmit={this.handleSubmit} className="createMarks-form">
                        <IconButton id="createCloseIcon" onClick={() => this.props.handler('createMarks')}>
                            <CloseIcon sx={{color: 'grey.600'}} />
                        </IconButton>
                        <Typography variant="h4" sx={{color: "grey.100"}}>
                            New Bookmark
                        </Typography>
                        <FormControl fullWidth id="folder-selector">
                            <InputLabel id="folder-selector">Folder</InputLabel>
                            <Select
                                labelId="folder-select"
                                id="folder-select"
                                value={this.state.folderName}
                                label="Folder"
                                onChange={this.handleChange}
                                name="folder-select"
                            >
                                {this.state.folders}
                            </Select>
                        </FormControl>
                        
                        <TextField id="name" label="Name" variant="outlined" onChange={this.handleChange} value={this.state.name} />
                        <br />
                        <TextField id="url" label="URL" variant="outlined" onChange={this.handleChange} value={this.state.url} />
                        {!this.state.full &&
                            <p>Some fields are empty. Please try again</p>
                        }
                    </form>
                </Box>
            </div>

            
        )
    }
    
}

export default CreateMarks;