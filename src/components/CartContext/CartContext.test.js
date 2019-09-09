import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./CartContext";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter()});

describe("<CartProvider/>", ()=>{
    it("Renders without crashing.", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><CartProvider/></BrowserRouter>, div);

        ReactDOM.unmountComponentAtNode(div);
    })
})