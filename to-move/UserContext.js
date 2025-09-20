import { createContext, useEffect, useReducer } from "react";

export const UserProfileContext = createContext({});

const userProfileReducer = (state, action) => {
    if (action.type === "SET_HIDE_QUICK_TUTORIAL") {
        return {
            ...state,
            isHideQuickTutorial: action.payload,
            isUpdateLocalStorage: true,
        };
    }

    if (action.type === "RESET_IS_UPDATE_LOCAL_STORAGE") {
        return {
            ...state,
            isUpdateLocalStorage: false,
        };
    }

    if (action.type === "SET_HIDE_HINT_LOGO") {
        return {
            ...state,
            isHideHintLogo: true,
            isUpdateLocalStorage: true,
        };
    }

    if (action.type === "SET_HIDE_HINT_TIMER") {
        return {
            ...state,
            isHideHintTimer: true,
            isUpdateLocalStorage: true,
        };
    }

    return state;
};

export default function UserProfileProvider({ children }) {
    const [state, dispatch] = useReducer(userProfileReducer, {
        isHideQuickTutorial: false,
        isHideHintLogo: false,
        isHideHintTimer: false,
        isUpdateLocalStorage: false,
    });

    // load localStorage
    useEffect(() => {
        const uiSettings = JSON.parse(localStorage.getItem("ui_settings"));
        if (uiSettings) {
            uiSettings.isHideQuickTutorial &&
                dispatch({
                    type: "SET_HIDE_QUICK_TUTORIAL",
                    payload: uiSettings.isHideQuickTutorial,
                });
            uiSettings.isHideHintTimer &&
                dispatch({ type: "SET_HIDE_HINT_TIMER" });
            uiSettings.isHideHintLogo &&
                dispatch({ type: "SET_HIDE_HINT_LOGO" });
        }
    }, []);

    // set localStorage
    useEffect(() => {
        if (state.isUpdateLocalStorage) {
            localStorage.setItem(
                "ui_settings",
                JSON.stringify({
                    isHideHintLogo: state.isHideHintLogo,
                    isHideHintTimer: state.isHideHintTimer,
                    isHideQuickTutorial: state.isHideQuickTutorial,
                })
            );

            dispatch({ type: "RESET_IS_UPDATE_LOCAL_STORAGE" });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isUpdateLocalStorage]);

    return (
        <UserProfileContext.Provider value={[state, dispatch]}>
            {children}
        </UserProfileContext.Provider>
    );
}
