<template>
    <div class="goal">
        <ul>
            <li>ID - {{ CHECKED_TASK._id }}</li>
            <li>NAME - {{ CHECKED_TASK.name }}</li>
            <li>INFO - {{ CHECKED_TASK.text}}</li>
            <li>TYPE - {{ CHECKED_TASK.type }}</li>
            <li>START TIME - {{ CHECKED_TASK.startTime }}</li>
            <li>END TIME - {{ CHECKED_TASK.endTime }}</li>
            <li>OWNER ? - {{ CHECKED_TASK.owner }}</li>
        </ul>
        <button @click="closeTask">Закрыть</button>
    </div>
    
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
    ...mapGetters(['CHECKED_TASK']), 
    },
    data(){
        return {

        }
    }, 
    methods: {
        ...mapMutations(['UPDATE_CHECKED_TASK']), 
        closeTask(){
            this.UPDATE_CHECKED_TASK(undefined)
        }
    }
}
</script>

<style>
.goal {
    display: flex; 
    flex-direction: column; 
    width: 600px;
    background-color: white ;
}
</style>