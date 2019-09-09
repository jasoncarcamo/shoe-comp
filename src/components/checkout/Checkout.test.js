import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Checkout from "./Checkout";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter()});



describe("<Checkout/>", ()=>{
    
    it("Renders without crashing", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><Checkout/></BrowserRouter>, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    it("Creates a snapshot", ()=>{
        const tree = renderer.create(<BrowserRouter><Checkout/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    });

})