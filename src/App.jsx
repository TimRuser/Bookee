import React from "react";
import ListMarks from "./ListMarks"
import CreateMarks from "./CreateMarks"

class App extends React.Component {


  render() {
    return (
      <div>
        <h1>Bookmarks</h1>
        <ListMarks />
        <h1>Folders</h1>

        <h1>Add a bookmark</h1>
        <CreateMarks />
      </div>
    );
  }
}

export { App };
