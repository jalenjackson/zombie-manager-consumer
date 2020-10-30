import { SetterOrUpdater } from 'recoil';

function alterRecoilState(setState: SetterOrUpdater<any>, nextState: {[key: string]: any}) {
    return setState((prevState: {[key: string]: string}) => {
        return { ...prevState, ...nextState }
    })
}

export default alterRecoilState;