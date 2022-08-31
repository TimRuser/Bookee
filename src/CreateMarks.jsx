import React, { useState, useEffect } from 'react';
import { readTextFile, createDir, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Box, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class CreateMarks extends React.Component {
    constructor(props) {
        super(props);
        this.jsonBookmarks;
        this.state = {name: '', url: '', full: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.id === 'name') {
            this.setState({name: event.target.value})
        } else if (event.target.id === 'url') {
            this.setState({url: event.target.value})
        }
    }
    handleSubmit() {
        if (this.state.name === '' || this.state.url === '') {
            this.setState({full: false});
        } else {
            this.setState({full: true});
            this.jsonBookmarks.bookmarks.push({name: this.state.name, url: this.state.url, key: Date.now()})
            
            writeTextFile('bookmarks.json', JSON.stringify(this.jsonBookmarks), { dir: BaseDirectory.App }).then(() => {
                console.log("Wrote file")
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
                this.setState({name: '', url: ''})
                this.handleSubmit();
            }
        }
        document.addEventListener('keydown', keyDownHandler);

        readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
            this.jsonBookmarks = JSON.parse(bookmarks);
        });
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
                        <IconButton className="closeIcon" onClick={() => this.props.handler('createMarks')}>
                            <CloseIcon sx={{color: 'grey.600'}} />
                        </IconButton>
                        <TextField id="name" label="Name" variant="outlined" onChange={this.handleChange} />
                        <br />
                        <TextField id="url" label="URL" variant="outlined" onChange={this.handleChange} />
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