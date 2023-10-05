<template>
    <div class="home" v-if="isAccessToken">
        <LeftNavbar/>
        <CalendarComponent/>
    <div class="modal" v-if="IS_ADDED_TASK"><AddTask/></div>
    <div class="modal" v-if="IS_ADDED_TASKLIST"><AddTaskList/></div>
    </div>
    <div class="unavailable" v-else>
        <div>Sorry.. you dont have AccessToken...</div>
        <button class="unavailable__button" @click="goOut">Выйти и зарегестрироваться</button>
    </div>
</template>

<script>
import CalendarComponent from './Home/CalendarComponent.vue';
import LeftNavbar from './Home/LeftNavbar.vue';
import AddTask from './AddTask.vue'
import AddTaskList from './AddTaskList.vue'

import { mapGetters } from 'vuex';
export default {
    components: {
        CalendarComponent, 
        LeftNavbar, 
        AddTask,
        AddTaskList
    }, 
    
    data(){
        return {
            isAccessToken: localStorage.getItem('AccessToken'),
        }  
    }, 
    methods: {
        goOut(){
            localStorage.removeItem('AccessToken')
            window.location.href = "http://localhost:8080/"
        }
    },
    computed: {
    ...mapGetters(['IS_ADDED_TASK', 'IS_ADDED_TASKLIST']),
    },
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Затемненный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Выше других элементов на странице */
}
</style>