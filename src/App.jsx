import React from "react";
import Bookmarks from './Bookmarks'
import Settings from './Settings'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            main: true
        }
        this.changeSites = this.changeSites.bind(this);
    }

    changeSites(site) {
        this.setState({main: site === 'bookmarks' ? true : false})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.main &&
                    <Bookmarks changeSites={this.changeSites}/>
                }
                {!this.state.main &&
                    <Settings changeSites={this.changeSites}/>
                }
            </React.Fragment>
        )
    }
}

export default App;