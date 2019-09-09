import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Shoe from "./Shoe";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adaptor()});


describe("<Shoe/>", ()=>{

    let props;

    beforeEach(()=>{
        props = {
            tops: "lightgrey",
            middle: "white",
            bottom: "black"
        };
    })

    it("Renders without crashing", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><Shoe {...props}/></BrowserRouter>, div);
        
        ReactDOM.unmountComponentAtNode(div);
    });
});