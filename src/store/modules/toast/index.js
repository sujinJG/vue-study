export default{
    namespaced: true,
    state: {
        toasts: [],
        toastMessage : '',
        toastAlertType :'',
        showToast : false,
    },
    mutations: {
        ADD_TOAST(state, payload){
            state.toasts.push(payload);
        },
        REMOVE_TOAST(state){
            state.toasts.shift();
        },
    },
    actions: {
        triggerToast({commit}, payload) { //데이터는 한 오브젝트로 받아와야 함
            commit('ADD_TOAST',{
                id: Date.now(),
                message: payload.message, 
                type: payload.type //key와 value가 같아 생략
            })

            setTimeout(() => {
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_STATUS', false);
                commit('REMOVE_TOAST')
            }, 10000)
        },
    },
    getters: {
        toastMessageWithSmile(state){
            return state.toastMessage+' ^^';
        }
    },
}