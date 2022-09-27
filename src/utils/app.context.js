import { Component, createContext } from "preact";
import { useContext } from "preact/hooks";

/** Context used to pass application wise data and services to nested components */
export const AppContext = createContext();

export class AppContextProvider extends Component {
    constructor(props) {
        super(props);
        this.cancelFbw = this.cancelFbw.bind(this);
        this.setMenuEnabled = this.setMenuEnabled.bind(this);
        this.state = {
            fbwCanceled: false,
            menuEnabled: true,
            cancelFbw: this.cancelFbw,
            setMenuEnabled: this.setMenuEnabled,
        };
        this.initialState = this.state;
    }

    cancelFbw() {
        this.setState({ fbwCanceled: true });
    }

    setMenuEnabled(value) {
        this.setState({ menuEnabled: value });
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("AppContext must be used within an AppContextProvider");
    }
    return context;
}
