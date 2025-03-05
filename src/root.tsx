import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App";
import { store } from "./app/store";

const Root: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <Toaster />
            </Provider>
        </BrowserRouter>
    );
};

export default Root;
