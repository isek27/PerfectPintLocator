import React, { Component } from "react";
import { connect } from "react-redux";
// import Map from "./Map";
import AddressSearchBar from "./AddressSearchBox";

class Locator extends Component {

    render() {
        return (
            <div>
                <div style={{textAlign:'center'}}>
                    <h1 style={{fontFamily: 'segoe ui'}}>Find My Perfect Pint</h1>
                    <div>Find nearby top-rated happy hours!</div>
                </div>

                <div style={{marginTop: "20px", marginRight:"20px", marginLeft:"20px", textAlign:'center', display:'inline-block'}}>
                    <div style={{textAlign:'center'}}>dfdf</div>
                    <div>
                        <AddressSearchBar />
                    </div>

                </div>
                <div style={{marginTop: "20px", marginRight:"20px", marginLeft:"20px"}}>
                    {/* <Map /> */}
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

export default connect(mapStateToProps)(Locator);
