<template>
    <div class="form-group">
        <label>{{ lable }}</label>
        <input :value="subject" @input="onInput" type="text" class="form-control" />
        <div v-if="error" class="text-red">{{error}}</div>
    </div>
</template>

<script>
import {getCurrentInstance} from 'vue';
export default {
    props: {
        lable:{
            type: String,
            required: true
        },
        error:{
            type: String,
            required: true
        },
        subject:{
            type: String,
            required: true
        },
    },

    setup(){
        const {emit} = getCurrentInstance(); // emit을 구조분해하여 가져옴(setup()에서 props를 사용하지 않고 emit만 사용할 경우)
        const onInput=(e)=>{
            emit('update:subject', e.target.value);
        }

        return {
            onInput
        }
    }
}
</script>

<style scoped>
    .text-red{
        color:red;
    }
</style>