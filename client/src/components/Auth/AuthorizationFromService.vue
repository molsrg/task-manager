<template>
<div class="wrapper">
  <span class="loader"></span>
</div>

</template>

<script>
import axios from 'axios'
export default {

  mounted() {
    this.OAuth()
  }, 
  methods: {

    // 1) здесь я сделал минимальную разметку
    // 2) в хуке маунтед происходи отправка запроса к серверу, пока что он возвращает ошибку, скорее всего так и задумано
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