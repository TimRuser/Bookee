import React from 'react';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Box, TextField, IconButton, Typography, FormControl } from '@mui/material'
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
            const index = this.jsonBookmarks.bookmarks.push({"folderName": this.state.name, "folderKey": this.state.name, "folderContent": []});
            writeTextFile('bookmarks.json', JSON.stringify(this.jsonBookmarks), { dir: BaseDirectory.App }).then(() => {
                this.props.handler('reload', index);
                this.setState({name: ''});
                this.props.handler('createFolders')
            }).catch((error) => {
                console.log(error);
            })
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
                        <FormControl className="createFolders-form">
                            <TextField id="folder" label="Name" variant="outlined" value={this.state.name} onChange={this.handleChange} margin="normal"/>
                        </FormControl>
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