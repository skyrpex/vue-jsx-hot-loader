import Vue from "vue";
import Component from "./component.jsx";

const app = new Vue({
    el: "#app",
    render() {
        return (
            <div>
                <Component />
            </div>
        );
    },
});

window.app = app;
