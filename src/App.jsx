import React from "react";
import Bookmarks from './Bookmarks'
import Settings from './Settings'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            main: true
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.main &&
                    <Bookmarks />
                }
                {!this.state.main &&
                    <Settings />
                }
            </React.Fragment>
        )
    }
}

export default App;