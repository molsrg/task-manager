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
        <input v-if="this.title == 'Регистрация' " class="section__input" type="text" placeholder="Имя пользователя" v-model="login">

        <input class="section__input" type="email" placeholder="E-mail" v-model="mail">
        <input class="section__input" type="password" placeholder="Пароль" v-model="password">
        <input v-if="this.title == 'Регистрация'" class="section__input" type="password" placeholder="Подтверждение пароля" v-model="confirm_password">
        <a v-if="this.title == 'Вход'" class="section__forget" href="#">Забыли пароль?</a>
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
  <!-- <img :src="flag == true ? require('../../assets/images/auth/ile.png') : require('../../assets/images/auth/ile2.png')"> -->

</template>

<script>
import axios from 'axios';

export default {
  data(){
    return { 
      login: '', 
      mail: '', 
      password: '', 
      confirm_password: '', 

      title: 'Регистрация', 
      subtitle: 'Вход', 
      auth: 'Зарегистрироваться'

    }
  }, 
  methods: {
    async authUser(){
    try {
    const response = await axios.post('http://localhost:5000/auth/registration', {
      username: this.login,
      email: this.mail,
      password: this.password,
    });
    const data = response.data;
    console.log(data); //  Ответ сервера ( если ответ не ошибка) помещается сюда.
    } catch (error) {
      console.log(error)
    }
    }, 
    AuthOrReg(){
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