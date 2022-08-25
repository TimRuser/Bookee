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
    handleSubmit(event) {
        console.log(this.state.name)
        console.log(this.state.url)
        console.log({
            name: this.state.name,
            url: this.state.url,
            key: Date.now()
        })
        if (this.state.name === '' || this.state.url === '') {
            this.setState({full: false});
        } else {
            this.setState({full: true});
            this.jsonBookmarks.push({name: this.state.name, url: this.state.url, key: Date.now()})
            console.log(this.jsonBookmarks)
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
        });
    };
    

    render() {
        return (
            <form>
                <label>
                    Name:
                </label>
                <input required="required" type="text" id="name" autoComplete='off' value={this.state.name} onChange={this.handleChange} />
                <br />
                <label>
                    URL:
                </label>
                <input required="required" type="text" id="url" autoComplete='off' value={this.state.url} onChange={this.handleChange} />
                {!this.state.full &&
                    <p>Some fields are empty. Please try again</p>
                }
            </form>
        )
    }
    
}

export default CreateMarks;