import React from "react";
import ListMarks from "./ListMarks"

class App extends React.Component {


  render() {
    return (
      <div>
        <h1>Bookmarks</h1>
        <ListMarks />
        <h1>Folders</h1>

        <h1>Add a bookmark</h1>

      </div>
    );
  }
}

export { App };
