import React, { useState, useEffect } from 'react';
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

function ListMarks() {
    const [ list, setList ] = useState([]);
    useEffect(() => {
        readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
            const listItems = JSON.parse(bookmarks).bookmarks.map((object) => 
                <li key={object.id}>
                    <p>{object.title}</p>
                    <a href={object.url}>{object.url}</a>
                </li>
            );
            setList(listItems);
        });
        
    }, []);

    return (<ul>{list}</ul>);
}

export default ListMarks;