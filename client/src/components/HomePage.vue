<template>
    <div class="home" v-if="isAccessToken">
        <LeftNavbar/>
        <CalendarComponent/>
    </div>
    <div class="unavailable" v-else>
        <div>Sorry.. you dont have AccessToken...</div>
        <button class="unavailable__button" @click="goOut">Выйти и зарегестрироваться</button>
    </div>
</template>

<script>
import CalendarComponent from './Home/CalendarComponent.vue';
import LeftNavbar from './Home/LeftNavbar.vue';
export default {
    components: {
        CalendarComponent, 
        LeftNavbar
    }, 
    mounted(){
    },
    data(){
        return {
            isAccessToken: localStorage.getItem('AccessToken')
        }  
    }, 
    methods: {
        goOut(){
            localStorage.removeItem('AccessToken')
            window.location.href = "http://localhost:8080/"
        }
    }
}
</script>
