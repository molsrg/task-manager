<template>
  <div class="auth">
    <div class="auth-info" style="display: flex;">
    <div class="auth-form">
      <div>
        Братаны и сестрички, я вам расскажу про это офигенное веб-приложение, называется оно "Таск-Батя"! Это жирный инструмент для тех, кто хочет хавать задачи на лету. 
      </div>
      <div>
        
Суть его проста как берёзка: ты создаёшь свои задачи, какие хочешь, когда хочешь. И делишься ими с друзьями или коллегами. Вот чёрт, как это работает:

<li>Cоздавай задачи: Быстро добавляй задачи, которые надо выполнить. Можно указать описание, сроки и приоритет.</li>
<li>Делегируй: Нет времени? Не проблема! Делегируй задачу своему бро или систрёнке, и пусть они крутят!</li>
<li>Отслеживай: Смотри статус каждой задачи, чтоб знать, что уже сделано, а что ещё в процессе.</li>
<li>Хавай задачи вместе: Если у вас команда, то здесь можно учесть все ваши задачи. Как батя, назначай ответственных за каждую задачу, и у нас всё будет под контролем.</li>
<li>Комментируй и обсуждай: Ну, и, конечно, общайтесь. Оставляйте комментарии, обсуждайте детали и держитесь в курсе всех движений.</li>

      </div>
      <div>И не забудьте, "Таск-Батя" работает в браузере, так что ты и твои друзья сможете пользоваться им откуда угодно, в любое время. Пусть никакие задачи не останутся невыполненными, а все они будут прямо в твоём контроле! Чётко, правда?</div>
    </div>
    <img style="width:50%" class="auth-info-img" src="../assets/images/auth/1647438350_34-kartinkin-net-p-kartinki-gopnikov-36.jpg" alt="">
  </div>
  <div class="auth-container">
    <div :class="isReg ? 'auth-form auth-form-short' : 'auth-form '">
      <div class="auth-form__section">
        <img
          src="../assets/images/auth/logo.svg"
          alt="logo"
        />
        <h3 class="auth-form__section_text">Task Unity Tech</h3>
      </div>
      <div class="auth-form__section">
        <button @click="changeReg" :class="isReg ? 'auth-form__section_button-inactive' : 'auth-form__section_button'">Регистрация</button>
        <button @click="changeReg" :class="isReg ? 'auth-form__section_button' : 'auth-form__section_button-inactive'">Вход</button>
      </div>
      <div style="overflow: hidden; max-height: 410px;"  >
        <form @submit="authUser"
          :class="isReg ? 'form-signin ' : 'form-signin form-signin-left'"
          action=""
          method="post"
          name="form"
        >
        <input class="auth-form-input"  type="email" placeholder="E-mail" v-model="mail">
        <input class="auth-form-input"  type="password" placeholder="Пароль" v-model="password">

        <a class="auth-form-input_forget">Забыли пароль?</a>

        <button type="submit" class="auth-form-button">{{ auth }}</button>

        </form>

        <form @submit="authUser"
          :class="isReg ? 'form-signup' : 'form-signup form-signup-left'"
          action=""
          method="post"
          name="form"
        >
        <div>
          <input class="auth-form-input" type="text" placeholder="Имя пользователя" v-model="login">
          <span class="invalid-span" v-if="v$.login.$invalid">Минимальная длина 6 символов</span>
          <!-- <span class="invalid-span" v-if="v$.login.$error">Неправильное имя</span> -->
          
        </div>
        <div>
          <input class="auth-form-input"  type="text" placeholder="E-mail" v-model="mail">
          <span class="invalid-span" v-if="v$.mail.$invalid">Некорректный email</span>
          <!-- <span class="invalid-span" v-if="v$.mail.$error">Эта почта уже была зерегестрирована</span> -->
        </div>
        <div>
          <input class="auth-form-input"  type="password" placeholder="Пароль"  v-model="password">
          <span class="invalid-span" v-if="v$.password.$invalid">Минимальная длина 8 символов</span>
        </div>
        <div>
          <input class="auth-form-input"  type="password" placeholder="Подтверждение пароля" v-model="confirm_password" >
          <span class="invalid-span" v-if="v$.confirm_password.$invalid">Минимальная длина 8 символов</span>
        </div>
          
          <button type="submit" class="auth-form-button">{{ auth }}</button>
      </form>
      
      </div> 

      <div class="auth-form-or">
          <div class="auth-form-or__text">
              <span>или</span>
            </div>
          <div class="auth-form-container">
            <a href="https://accounts.google.com/o/oauth2/auth?client_id=429829081659-l7g63tlu2g45o46vkf54l5sk8i2rqjq1&redirect_uri=http://localhost:8080/waiting&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&state=123"><img src="../assets/images/auth/google.svg"></a>

            <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=db3492f883c60a412c39&redirect_uri=http://localhost:8080/waiting"> <img src="../assets/images/auth/github.svg"></a>

            <a href="https://oauth.yandex.ru/authorize?client_id=5b1b15fa24b542948bbd72ac320d6b9f&redirect_uri=http://localhost:8080/waiting&response_type=code"> <img src="../assets/images/auth/facebook.svg"></a>
          </div>
      </div>
    </div>
  </div>

  </div>

</template>

<script>
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'

export default {
  setup () {
        return {
            v$: useVuelidate()
        }
    },
  data(){
    return { 
      login: '', 
      mail: '', 
      password: '', 
      confirm_password: '', 
      auth: 'Зарегестрироваться',

    isReg: false,
      errors: [],

    }
  }, 
  validations: {
    login: { required, minLength: minLength(6) },
    mail: { required, email },
    password: { required,  minLength: minLength(8)},
    confirm_password: { required,  minLength: minLength(8), sameAsPassword: sameAs("password") },
    },

  mounted(){
    if(localStorage.getItem('AccessToken')){
      window.location.href = "http://localhost:8080/home"
    }
  },
  methods: {
    changeReg(){
      this.isReg = !this.isReg
      this.auth = this.auth == 'Войти' ?  'Зарегестрироваться' : 'Войти'
    },

    async authUser(event) {
      event.preventDefault();
    
      const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect && this.auth == 'Зарегестрироваться') {
              console.log('Валидация формы не прошла')
              return
            }

      if(this.errors.length == 0){
        let data = {}
        let type = ''

        if(this.auth == 'Зарегестрироваться'){
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

              const token = response.data.AccessToken
              localStorage.setItem('AccessToken', token); // write
              // console.log(localStorage.getItem('AccessToken')); // read
              window.location.href = "http://localhost:8080/home"

              
      
                
          }
          )

          .catch((error) => {
            console.log(error)
            this.errors = [error.response.data?.errors]
            this.errors = [error.response.data?.message]

            if(error.response.data?.message == "Почтовый адрес уже был зарегистрирован"){
              this.mail = ""
            }
            if(error.response.data?.message == "Пользователь с таким именем уже существует"){
              this.login = ""
            }
            if(error.response.data?.message == "Введен неверный пароль"){
              this.password = ""
            }

          })   
      }
      
    },     
    validForm(){
      const regex = /^(?=.*[A-Za-z])([A-Za-z0-9]+)$/;
      this.errors = []
      if(this.title == 'Регистрация'){
        if(this.password !== this.confirm_password){
                this.errors.push("Пароли не совпадают")
                this.password = ''
                this.confirm_password = ''
              }
      }
      
      if(!regex.test(this.password)){
        this.errors.push("Пароль не прошел валидацию")
        this.password = ''
        this.confirm_password = ''
      }
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
.auth {
  display: flex;
  gap: 10px;
  background-color: #cacdd3;
  margin: 0 auto;
  margin-top: 100px;

  max-height: 60vh;
  max-width: 80vw;
  padding: 50px;
}

@media only screen and (max-width: 1585px) {
  .auth-info-img {
    display: none;
  }
  
}


.auth-form{
  background-color: #cacdd3;
  max-height: 660px;
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 5px;
  overflow: hidden;
  transition: all 0.5s ease;

  font-family: Raleway;
  padding:20px 10px ;
}

.auth-form-short{
  max-height: 500px;
}

.auth-form__section {
  display: flex;
  gap: 11px;
  align-items: center;
}

.auth-form__section h3{
  font-size: 20px;
  font-weight: 200;
}


.auth-form__section_button {
  font-size: 32px;
  font-weight: 700;

  padding-bottom: 10px;
  color: #15616D;

  border-bottom: solid 2px #15616D;
  transition: all 0.25s ease;
  cursor: pointer;
}

.auth-form__section_button-inactive {

  font-family: Raleway;
  font-size: 24px;
  font-weight: 400;

  color: #001524;
  cursor: pointer;
}






.form-signin {
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  gap: 41px;
  padding-top:10px;
  width: 100%;
  height: 375px;

  transition: opacity 0.5s ease, transform 0.5s ease;
}

.form-signin-left {
  transform: translateX(-400px);
}

.form-signup {

  display: flex;
  flex-direction: column;
  gap: 41px;
  padding-top:10px;
  /* background-color: blue; */
  width: 100%;
  height: 375px;

  position: relative;
  top: -375px;
  left: 400px;
  transition: all 0.5s ease;
}

.form-signup-left {
  transform: translateX(-400px);
}


.auth-form-input{
  margin: 0 auto;
  width:95%;
  margin-bottom: 3px;
  outline: none;
  border: 0px solid white;
  border-bottom: 1px solid rgba(0, 21, 36, 0.5);
  background: transparent;

  font-family: Raleway;
  font-size: 16px;
}

.auth-form-input_forget {
  color: #15616D;
  border-bottom: 1px solid #15616D;
  cursor: pointer;

  font-family: Raleway;
  font-size: 16px;

  max-width: 123px;
  margin-left: 2%;

}


.auth-form-button{
  width: 95%;
  margin: 0 auto;
  padding: 16px 53px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;


  color: rgba(255, 236, 209, 1);
  background:rgba(135, 151, 154, 1);

  cursor: pointer;
}


.auth-form-or{
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100px;
}

.auth-form-or__text{
  text-align: center;
  padding-bottom: 15px;
  position: relative;
}

.auth-form-or__text:before,
.auth-form-or__text:after {

    content: "";
    display: inline-block;
    vertical-align: middle;

    width: 100%;
    height: 1px;

    background-color: rgba(0, 21, 36, 0.5);

    position: relative;
}
.auth-form-or__text:before {

    margin-left: -100%;

    left: -14px;
}
.auth-form-or__text:after {

    margin-right: -100%;

    right: -14px;
}

.auth-form-container{
  display: flex;
  justify-content: space-between;
}




</style>

