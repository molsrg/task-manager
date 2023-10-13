<template>
    <div class="home" v-if="isAccessToken">
        <LeftNavbar/>
        <CalendarComponent/>
    <div class="modal" v-if="IS_ADDED_TASK"><AddTask/></div>
    <div class="modal" v-if="IS_ADDED_TASKLIST"><AddTaskList/></div>
    <div class="modal" v-if="CHECKED_TASK"><TaskApp/></div>
    <div class="modal" v-if="IS_CHECK_SELECTED_TASK"><SelectedTask/></div>
    </div>
    <div v-else>
        <UnauthorizedApp/>
    </div>
</template>

<script>
import CalendarComponent from './Home/CalendarComponent.vue';
import LeftNavbar from './Home/LeftNavbar.vue';
import AddTask from './AddSomething/AddTask.vue'
import AddTaskList from './AddSomething/AddTaskList.vue'
import UnauthorizedApp from './Home/UnauthorizedApp.vue';
import SelectedTask from './Home/SelectedTask.vue'
import TaskApp from './TaskApp.vue';

import { mapGetters } from 'vuex';
export default {
    components: {
        CalendarComponent, 
        LeftNavbar, 
        AddTask,
        AddTaskList, 
        UnauthorizedApp,
        TaskApp, 
        SelectedTask
    }, 
    
    data(){
        return {
            isAccessToken: localStorage.getItem('AccessToken'),
        }  
    }, 
    methods: {
        
    },
    computed: {
    ...mapGetters(['IS_ADDED_TASK', 'IS_ADDED_TASKLIST', 'CHECKED_TASK', 'IS_CHECK_SELECTED_TASK']),
    },
}
</script>

<style>
.modal {

    backdrop-filter: blur(3px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(44, 43, 43, 0.5); /* Затемненный фон */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11; /* Выше других элементов на странице */
    opacity: 0;
    animation: ani 1.5s linear forwards;
}

    @keyframes ani {
    0% {opacity: 0; }
    100% {opacity: 1;}
    }
</style>