<template>
    <div class="home">
        <LeftNavbar/>
        <CalendarComponent/>
    </div>

</template>

<script>
import CalendarComponent from './Home/CalendarComponent.vue';
import LeftNavbar from './Home/LeftNavbar.vue';
export default {
    components: {
        CalendarComponent, 
        LeftNavbar
    }
}
</script>
