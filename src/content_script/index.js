import reactDom from "react-dom";
import browser from "../modules/browser";
import App from "./App";

browser.injectContainer();

const container = document.getElementById("translucent_ext")

reactDom.render(<App/>, container);