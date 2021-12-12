function createStore (reducer) {
    let state
    let listeners = []

    function subscribe(callback) {
        listeners.push(callback)
    }

    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(i => {
            i()
        })
    }

    function getState(){
        return state
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}

exports.modules = {
    createStore
}