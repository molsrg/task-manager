<template>
<div class="wrapper">
  <span class="loader"></span>
</div>

<div class="select">
  <div class="select__header">
    <div class="select__current">{{ currentMonth }}</div>
    <img @click="showCalendar = !showCalendar" :class="showCalendar ? 'select__btn' : 'select__btn-isActive'" src="../../assets/images/main/select__btn.svg" alt="">
  </div>
    <div :class="showCalendar ? 'select__body-show' : 'select__body'" >
      <div 
      @click="changeCurrent(month.name)"
      class="select__item" 
      v-for="month in months" 
      :key="month.id"
      v-bind:value="month.id"
      >{{ month.name }}</div>

    </div>
</div>

</template>

<script>
import axios from 'axios'


export default {
  data(){
    return {
      showCalendar: false, 
      currentMonth: 'May 2023', 
      months: [{name: 'June 2023', id: 1}, {name: 'Jule 2023', id: 2},{name: 'August 2023', id: 3}]
    }
  },
  mounted() {
    this.OAuth()
  }, 
    
  methods: {
    changeCurrent(value){
      this.currentMonth = value
    },



    // 1) здесь я сделал минимальную разметку
    // 2) в хуке маунтед происходит отправка запроса к серверу, пока что он возвращает ошибку, скорее всего так и задумано
    OAuth(){

      const string = window.location.search
      const code = string.split("?code=")[1];

      console.log(code) // выводит код доступа гитхаба 

      axios.post(`localhost:5000/auth/gh_oauth`, code)
        .then((response) => {           
            console.log(response)
        })

        .catch((error) => { 
          console.log(error)
        })   

    }
  }
}
</script>

<style>


.wrapper {
  margin: 100px auto;
  display: flex;
  justify-content: center;
}
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid black;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

</style>