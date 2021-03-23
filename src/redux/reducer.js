const initialState = {
    startWaitTime: 0,
    stopWaitTime: 0,
    waitFirstClicked: false,
    time: 0,
    interval: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_TIMER':
            console.log(`Started interval: ${action.interval}`)

            return {
                ...state,
                interval: action.interval
            };
        case 'STOP_TIMER':
            clearInterval(state.interval)
            console.log(`Stopped interval: ${action.interval}`)

            return {
                ...state,
                interval: false
            };
        case 'UPDATE_TIMER':
            return {
                ...state,
                time: state.time + 1
            };
        case 'RESET_TIMER':
            return {
                ...state,
                time: 0
            };
        case 'FIRST_CLICK':
            console.log(`first click time:${action.startWaitTime}`)
            return {
                ...state,
                startWaitTime: action.startWaitTime, // Время первого клика
                waitFirstClicked: true
            }
        case 'SECOND_CLICK':
            console.log(`second click time:${action.endWaitTime}`)
            return {
                ...state,
                stopWaitTime: action.endWaitTime
            };
        case 'STOPPED_AFTER_WAIT_ONCLICK':
            /* console.log(`Time between clicks is ${state.stopWaitTime - state.startWaitTime}`) */
            const afterWaitStop = () => {
                if (state.stopWaitTime - state.startWaitTime > 0 && state.stopWaitTime - state.startWaitTime < 300) {
                    clearInterval(state.interval)
                    return {
                        interval: false,
                    }
                } else {
                    return {
                        interval: state.interval,
                    }
                }
            };

            return {
                ...state,
                startWaitTime: 0,
                stopWaitTime: 0,
                interval: afterWaitStop().interval,
                waitFirstClicked: false
            };
        default:
            return state;
    }
};

export default reducer;