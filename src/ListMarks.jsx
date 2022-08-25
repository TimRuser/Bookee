import React, { useState, useEffect } from 'react';
import { readTextFile, createDir, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

function ListMarks() {
    const [ list, setList ] = useState([]);
    useEffect(() => {
            readTextFile('bookmarks.json', { dir: BaseDirectory.App }).then((bookmarks) => {
                if (bookmarks) {
                    if (JSON.parse(bookmarks).bookmarks.length > 0) {
                        const listItems = JSON.parse(bookmarks).bookmarks.map((object) => 
                            <li key={object.id}>
                                <p>{object.title}</p>
                                <a href={object.url}>{object.url}</a>
                            </li>
                        );
                        setList(listItems);
                        console.log(bookmarks);
                    } else {
                        const listItems = (
                            <p>You don't have any bookmarks</p>
                        )
                        setList(listItems);
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
            

    }, []);

    return (<ul>{list}</ul>);
}

export default ListMarks;