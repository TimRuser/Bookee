import React from 'react';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Box, TextField, IconButton, Typography, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class CreateFolders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            full: true
        }
        this.jsonBookmarks;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.name === '') {
            this.setState({ full: false });
        } else {
            
        }
    }

    componentDidMount() {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.setState({name: '', url: ''})
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
    }

    render() {
        return (
            <div className="createFolders-wrapper">
                <Box
                    sx={{
                        width: 300,
                        height: "auto",
                        backgroundColor: 'grey.800',
                        borderRadius: 1
                    }}
                    className="createFolders-box"
                >
                    
                    <form onSubmit={this.handleSubmit} className="createFolders-form">
                        <IconButton id="createFoldersIcon" onClick={() => this.props.handler('createFolders')}>
                            <CloseIcon sx={{color: 'grey.600'}} />
                        </IconButton>
                        <Typography variant="h4" sx={{color: "grey.100"}}>
                            New Folder
                        </Typography>
                        <TextField id="folder" label="folder name" variant="outlined" onChange={this.handleChange} />
                        {!this.state.full &&
                            <p>Enter a name!</p>
                        }
                    </form>
                </Box>
            </div>

            
        )
    }
}

export default CreateFolders;