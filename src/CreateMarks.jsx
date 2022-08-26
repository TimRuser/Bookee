import React, { useState, useEffect } from 'react';
import { readTextFile, createDir, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

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
                this.props.handler();
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
            <form onSubmit={this.handleSubmit}>
                <label className="input-wrapper">
                    <input className="nameInput" required="required" type="text" id="name" autoComplete='off' value={this.state.name} onChange={this.handleChange} />
                    <span className="placeholder">Enter Name</span>
                </label>
                <br />
                <label className="input-wrapper">
                    <input className="urlInput" required="required" type="text" id="url" autoComplete='off' value={this.state.url} onChange={this.handleChange} />
                    <span className="placeholder">Enter URL</span>
                </label>
                {!this.state.full &&
                    <p>Some fields are empty. Please try again</p>
                }
            </form>
        )
    }
    
}

export default CreateMarks;