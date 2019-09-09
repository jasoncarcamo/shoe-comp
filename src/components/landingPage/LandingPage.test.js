import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import LandingPage from "./LandingPage";
import Enzyme, {shallow} from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adaptor()});


describe("<LadingPage/>", ()=>{
    it("Renders without crashing", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><LandingPage/></BrowserRouter>, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    it("Creates a snapshot", ()=>{
        const tree = renderer.create(<BrowserRouter><LandingPage/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    });
})
