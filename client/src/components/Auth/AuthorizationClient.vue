<template>
  <div class="section">
    <div class="section__item">
      <div class="section__logo">
        <img class="logo" src="../../assets/images/auth/logo.svg" alt="logo">
        <h3 class="section__text">Task Unity Tech</h3>
      </div>
    </div>
    <div class="section__item">
      <div class="section__auth">
        <h3 class="section__title">{{ title }}</h3>
        <button @click="AuthOrReg" class="section__subtitle">{{ subtitle }}</button>
      </div>
      
    </div>
    <div class="section__item">
      <form action="" method="post">
        <transition name="input">
          <input v-if="this.title == 'Регистрация' " class="section__input" type="text" placeholder="Имя пользователя" v-model="login">
        </transition>  
       
        <input class="section__input" type="email" placeholder="E-mail" v-model="mail">
        <input class="section__input" type="password" placeholder="Пароль" v-model="password">

        <transition name="input">
          <input v-if="this.title == 'Регистрация'" class="section__input" type="password" placeholder="Подтверждение пароля" v-model="confirm_password">
        </transition> 
        <div class="section__alert-forget">
          <span id="blink1" class="section__alert">{{this?.errors[0]}} </span>
        <a v-if="this.title == 'Вход'" class="section__forget" href="#">Забыли пароль?</a>
        </div>  

      </form>
    </div>
    <div class="section__item">
      <button type="submit" class="section__button" @click="authUser">{{ auth }}</button>
      <div class="section__text-or">
        <span>или</span>
      </div>

      <div class="section__bt-container">
        <a href="#"><img src="../../assets/images/auth/google.svg"></a>
        <a href="#"><img src="../../assets/images/auth/github.svg"></a>
        <a href="#"> <img src="../../assets/images/auth/facebook.svg"></a>
      </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return { 
      login: '', 
      mail: '', 
      password: '', 
      confirm_password: '', 


      title: 'Регистрация', 
      subtitle: 'Вход', 
      auth: 'Зарегистрироваться',
      errors: []
    }
  }, 

  methods: {
  
    authUser() {

      if(this.password !== this.confirm_password){
        this.errors.push("Пароли не совпадают")
        return 
      }

      let data = {}
      let type = ''
      if(this.auth == 'Зарегистрироваться'){
        data = {
        username: this.login,
        email: this.mail,
        password: this.password,
          } 
        
        type = 'registration'
      }
      else if (this.auth == 'Войти') {
        data = {
          email: this.mail,
          password: this.password,
        }

        type = 'login'
      }


      axios.post(`http://localhost:5000/auth/${type}`, data)
        .then((response) => {
            this.login = ''
            this.mail = '', 
            this.password = '', 
            this.confirm_password = ''

            
            console.log(response)
        })

        .catch((error) => {
          this.errors = error.response.data.errors
          console.log(error)
        })   
    },     

    AuthOrReg(){

      this.errors = []
      this.login = ''
      this.mail = '', 
      this.password = '', 
      this.confirm_password = ''

      if(this.subtitle == "Вход"){
        this.title = "Вход"
        this.subtitle = "Регистрация"
        this.auth = "Войти"

      }

      else if(this.subtitle == "Регистрация"){
        this.title = "Регистрация"
        this.subtitle = "Вход"
        this.auth = "Зарегистрироваться"
      }
    }
  }
}
</script>


<style>


/* .input-enter-active, .input-leave-active {
  transition: opacity 500ms;
}

.input-enter, .input-leave-to {
  opacity: 0;
} */



/* .section__subtitle:active  .section__input{

}
 */

/* 

.section__auth:target  .section__title
 {     transform: translate(80px,0);


 }  

 .section__auth:active .section__subtitle {
    transform: translate(-250px,0);
}  
 */

</style>