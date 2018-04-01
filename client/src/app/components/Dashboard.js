import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    renderName() {
        if(this.props.auth) {
            return this.props.auth.name.givenName;
        }
        else {
            return "loading...";
        }
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h1>
                    Dashboard
                </h1>
                Welcome to the dashboard! {this.renderName()}
                <div className="fixed-action-btn">
                    <Link to="/" className="btn-floating btn-large red">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // look at combined reducers, we called this piece of state - auth
        auth : state.auth
    };
}

export default connect(mapStateToProps)(Dashboard);
