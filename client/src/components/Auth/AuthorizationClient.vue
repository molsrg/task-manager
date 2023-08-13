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
        <button class="section__title" @click="toFalse">Регистрация</button>
        <button class="section__subtitle" @click="toFalse">Вход</button>
      </div>
      
    </div>
    <div class="section__item">
      <form action="" method="post">
        <input class="section__input" type="text" placeholder="Имя пользователя" name="name">
        <input class="section__input" type="email" placeholder="E-mail" name="email">
        <input class="section__input" type="password" placeholder="Пароль" name="password">
        <input class="section__input" type="password" placeholder="Подтверждение пароля" name="confirm-password">
      </form>
    </div>

    <div class="section__item">
      <button type="submit" class="section__button" @click="handleRegistration">Зарегистрироваться</button>
      <hr>
      <div>или</div>
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
  methods: {
    async handleRegistration(){
    const username = document.getElementsByName('name')[0].value;
    console.log(username);
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    try {
    const response = await axios.post('http://localhost:5000/auth/registration', {
      username: username,
      email: email,
      password: password,
    });
    const data = response.data;
    console.log(data);
    } catch (error) {
      console.log(error)
    }
    }
  }
}

</script>
