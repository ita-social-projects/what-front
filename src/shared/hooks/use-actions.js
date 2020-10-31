import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export function useActions(actions, deps) {
    const dispatch = useDispatch();

    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map((action) => bindActionCreators(action, dispatch))
            }

            if (Object.prototype.toString.apply(actions) === '[object Object]') {
                return Object.entries(actions).reduce((bindActions, [actionName, action]) => {
                    bindActions[actionName] = bindActionCreators(action, dispatch);

                    return bindActions
                }, {});
            }

            return bindActionCreators(actions, dispatch)
        },
        deps ? [dispatch, ...deps] : [dispatch]
    );
}