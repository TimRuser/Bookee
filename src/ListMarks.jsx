import React from 'react';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';


class ListMarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: Array()
        }
    }
    componentDidMount() {
        console.log(this.props.reload)
        readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
            if (bookmarks) {
                if (JSON.parse(bookmarks).bookmarks.length > 0) {
                    const listItems = JSON.parse(bookmarks).bookmarks.map((object) => 
                        <li key={object.id}>
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
        
    };

    render() {
        return (<ul>{this.state.list}</ul>);
    }
}

export default ListMarks;