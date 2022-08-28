import React from 'react';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';


class ListMarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: Array()
        }
        this.jsonBookmarks;
        this.removeMark = this.removeMark.bind(this);
        this.setListItems = this.setListItems.bind(this);
    }
    componentDidMount() {
        this.setListItems();
    };

    removeMark(key) {
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
                const listItems = this.jsonBookmarks.bookmarks.map((object) => 
                    <li key={object.key}>
                        <i className="fa-solid fa-xmark" onClick={() => this.removeMark(object.key)}></i>
                        <p className="bookmark-title">{object.name}</p>
                        <a className="bookmark-url" href={object.url} target="_blank">{object.url}</a>
                    </li>
                );
                this.setState({list: listItems});
            } else {
                const listItems = (
                    <p>You don't have any bookmarks</p>
                )
                this.setState({list: listItems});
            }
        } else {
            readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
                if (bookmarks) {
                    this.jsonBookmarks = JSON.parse(bookmarks);
                    console.log(JSON.parse(bookmarks));
                    if (this.jsonBookmarks.bookmarks.length > 0) {
                        const listItems = this.jsonBookmarks.bookmarks.map((object) => 
                            <li key={object.key}>
                                <i className="fa-solid fa-xmark" onClick={() => this.removeMark(object.key)}></i>
                                <p className="bookmark-title">{object.name}</p>
                                <a className="bookmark-url" href={object.url} target="_blank">{object.url}</a>
                            </li>
                        );
                        this.setState({list: listItems});
                    } else {
                        const listItems = (
                            <p>You don't have any bookmarks</p>
                        )
                        this.setState({list: listItems});
                    }
                } 
            }).catch((error) => {
                console.log(error);
                const fileContent = '{"bookmarks":[]}'
                writeTextFile('bookmarks.json', fileContent, { dir: BaseDirectory.App }).then(() => {
    
                }).catch((error) => {
                    console.log(error);
                })
            })
        }
    }

    render() {
        return (<ul>{this.state.list}</ul>);
    }
}

export default ListMarks;