import {ref, onUnmounted, computed} from 'vue';
import {useStore} from 'vuex';

export const useToast = () => {
    const store = useStore();

    const toasts = computed(()=>store.state.toast.toasts);
    // const showToast = computed(()=>store.state.toast.showToast);
    // const toastMessage = computed(()=>store.state.toastMessage);
    // const toastMessage = computed(()=>store.getters['toast/toastMessageWithSmile']);
    // const toastAlertType = computed(()=>store.state.toast.toastAlertType);
    const triggerToast = (message, type) => {
        store.dispatch('toast/triggerToast', message, type); //actios 실행
    };

    return {
        // toastMessage,
        // toastAlertType,
        // showToast,
        toasts,
        triggerToast
    }
}