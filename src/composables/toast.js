import {ref, onUnmounted, computed} from 'vue';
import {useStore} from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toasts = computed(()=>store.state.toast.toasts);

    const triggerToast = (message, type) => {
        store.dispatch('toast/triggerToast', {message, type}); //actios 실행 (payload를 줄땐 url과 데이터를 담은 오브젝트 하나)
    };

    return {
        toasts,
        triggerToast
    }
}