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
        // UPDATE_TOAST_MESSAGE(state, payload){
        //     state.toastMessage = payload;
        // },
        // UPDATE_TOAST_ALERT_TYPE(state, payload){
        //     state.toastAlertType = payload;
        // },
        // UPDATE_TOAST_STATUS(state, payload){
        //     state.showToast = payload;
        // },
    },
    actions: {
        triggerToast({commit}, message, type='success') {
            // commit('UPDATE_TOAST_MESSAGE', message); //mutations 실행
            // commit('UPDATE_TOAST_ALERT_TYPE', type)
            // commit('UPDATE_TOAST_STATUS', true);
            commit('ADD_TOAST',{
                id: Date.now(), message, type //key와 value가 같아 생략
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