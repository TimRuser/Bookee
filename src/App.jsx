import React from "react";
import ListMarks from "./ListMarks"
import CreateMarks from "./CreateMarks"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reload: 0};
    this.handler = this.handler.bind(this);
  }

  handler() {
    window.location.reload();
  }

  render() {
    return (
      <div id="root">
        <div className="first-container">
          <div className="bookmarks-wrapper">
            <h1 className="title">Bookmarks</h1>
            <ListMarks />
          </div>
        </div>
        <div className="second-container">
          <div className="folders-wrapper">
            <h1 className="title">Folders</h1>
          </div>
          <div className="create-wrapper">
            <h1 className="title">Add a bookmark</h1>
            <CreateMarks handler={this.handler} />
          </div>
        </div>
      </div>
    );
  }
}

export { App };
