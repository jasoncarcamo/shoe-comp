import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Register from "./Register";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adaptor()});



describe("<Register/>", ()=>{
    it("Renders without crashing", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><Register/></BrowserRouter>, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    it("Creates a snapshot", ()=>{
        const tree = renderer.create(<BrowserRouter><Register/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })
})