import MainPage from "./pages/MainPage";
import {DesignProvider} from "./DesignContext";

const App = () => {

    return (
        <DesignProvider>
            <MainPage />
        </DesignProvider>
    );
};

export default App;