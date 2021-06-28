import React from 'react';
import ReactDOM from 'react-dom';
import { Component1 } from 'common-1';
import { Component2 } from 'common-2';
import 'antd/dist/antd.css';

const App = () => {
    return (
        <div>
            <Component1 />
            <Component2 />
        </div>
    );
};

const container = document.createElement("div");
container.id = "root";
document.body.appendChild(container);
ReactDOM.render(<App />, container);
