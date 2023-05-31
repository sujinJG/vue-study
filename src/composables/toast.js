import {ref, onUnmounted, computed} from 'vue';
import {useStore} from 'vuex';

export const useToast = () => {
    const store = useStore();

    const showToast = computed(()=>store.state.showToast);
    // const toastMessage = computed(()=>store.state.toastMessage);
    const toastMessage = computed(()=>store.getters.toastMessageWithSmile);
    const toastAlertType = computed(()=>store.state.toastAlertType);
    const triggerToast = (message, type) => {
        store.dispatch('triggerToast', message, type); //actios 실행
    };

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
    }
}