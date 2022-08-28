import React from "react";
import ListMarks  from "./ListMarks"
import CreateMarks from "./CreateMarks"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reload: false};
    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState({reload: true}, () => this.setState({reload: false}));
  }

  render() {
    return (
      <div id="root">
        <div className="first-container">
          <div className="bookmarks-wrapper">
            <h1 className="title">Bookmarks</h1>
            {this.state.reload == false &&
              <ListMarks reload={this.state.reload}/>
            }
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
