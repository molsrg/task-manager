<template>
  <!-- <div class="container">
    <div :class="isReg ? 'frame' : 'frame frame-long'">
      <div class="section__logo">
        <img
          class="logo__img"
          src="../assets/images/auth/logo.svg"
          alt="logo"
        />
        <h3 class="section__text logo__text">Task Unity Tech</h3>
      </div>


      <div class="nav">
        <ul class="links">
          <li :class="isReg ? 'signup-inactive' : 'signin-active'">
            <a class="btn" @click="changeReg">Регистрация</a>
          </li>
          <li :class="isReg ? 'signin-active' : 'signup-inactive'">
            <a class="btn" @click="changeReg">Вход</a>
          </li>
        </ul>
      </div>

      <div>
        <form @submit="authUser"
          :class="isReg ? 'form-signin ' : 'form-signin form-signin-left'"
          action=""
          method="post"
          name="form"
        >
          <label for="email">E-mail</label>
          <input class="form-styling" type="email" v-model="mail" name="email" required/>

          <label for="password">Пароль</label>
          <input
            class="form-styling"
            type="password"
            name="password"
            placeholder=""
            required minlength="8" maxlength="128" pattern="[0-9A-Za-z]+" title="Пароль может содержать латинские буквы и цифры. Обязательно наличие 1 буквы."
          />
          
          <div class="btn-animate">
              <button type="submit" class="btn-signin">{{ auth }}</button>
          </div>

          <div class="form_services">
            <div class="section__text-or">
              <span>или</span>
            </div>

            <div class="form_services__container">
              <a
                href="https://accounts.google.com/o/oauth2/auth?client_id=429829081659-l7g63tlu2g45o46vkf54l5sk8i2rqjq1&redirect_uri=http://localhost:8080/waiting&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&state=123"
                ><img src="../assets/images/auth/google.svg"
              /></a>

              <a
                href="https://github.com/login/oauth/authorize?client_id=47940374a073fa8e62aa&redirect_uri=http://localhost:8080/waiting"
              >
                <img src="../assets/images/auth/github.svg"
              /></a>

              <a
                href="https://oauth.yandex.ru/authorize?client_id=5b1b15fa24b542948bbd72ac320d6b9f&redirect_uri=http://localhost:8080/waiting&response_type=code"
              >
                <img src="../assets/images/auth/facebook.svg"
              /></a>
            </div>
      
          </div>

        </form>

        <form @submit="authUser"
          :class="isReg ? 'form-signup' : 'form-signup form-signup-left'"
          action=""
          method="post"
          name="form"
        >
          <label for="fullname">Имя пользователя</label>
          <input
            class="form-styling"
            type="text"
            name="fullname"
            required
            v-model="login"
          />

          <label for="email">E-mail</label>
          <input class="form-styling" type="email" v-model="mail" name="email" required/>

          <label for="password">Пароль</label>
          <input
            class="form-styling"
            type="password"
            name="password"
            placeholder=""
            required minlength="8" maxlength="128" pattern="[0-9A-Za-z]+" title="Пароль может содержать латинские буквы и цифры. Обязательно наличие 1 буквы."
          />

          <label for="confirmpassword">Подтвердите пароль</label>
          <input
            class="form-styling"
            type="password"
            name="confirmpassword"
            placeholder=""
            required minlength="8" maxlength="128" pattern="[0-9A-Za-z]+" title="Пароль может содержать латинские буквы и цифры. Обязательно наличие 1 буквы."
          />

          <button type="submit" class="btn-signup">{{auth}}</button>

          <div class="form_services">
            <div class="section__text-or">
              <span>или</span>
            </div>

            <div class="form_services__container">
              <a
                href="https://accounts.google.com/o/oauth2/auth?client_id=429829081659-l7g63tlu2g45o46vkf54l5sk8i2rqjq1&redirect_uri=http://localhost:8080/waiting&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&state=123"
                ><img src="../assets/images/auth/google.svg"
              /></a>

              <a
                href="https://github.com/login/oauth/authorize?client_id=47940374a073fa8e62aa&redirect_uri=http://localhost:8080/waiting"
              >
                <img src="../assets/images/auth/github.svg"
              /></a>

              <a
                href="https://oauth.yandex.ru/authorize?client_id=5b1b15fa24b542948bbd72ac320d6b9f&redirect_uri=http://localhost:8080/waiting&response_type=code"
              >
                <img src="../assets/images/auth/facebook.svg"
              /></a>
            </div>
          </div>

        </form>
        
        {{ errors }}
      </div>
    </div>
  </div> -->
  <div class="inputCalendar">
    <input class="inputCal" id="input" type="text">
    Выберите дату
  </div>


</template>

<script>
import axios from 'axios';
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
export default {

  data() {
    return {
      isReg: false,
      auth: 'Зарегистрироваться',

      login: '', 
      mail: '', 
      password: '', 
      confirm_password: '', 
      errors: [],
    };
  },
  mounted(){
    if(localStorage.getItem('AccessToken')){
      window.location.href = "http://localhost:8080/home"
    }
    new AirDatepicker('#input');

  },
  methods: {

    changeReg() {
      this.isReg = !this.isReg;
      this.auth = this.auth == 'Зарегистрироваться' ? this.auth = 'Войти' : this.auth = 'Зарегистрироваться'
    },

    authUser(event) {
      event.preventDefault();
      this.validForm()

      if(this.errors.length == 0){
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

              const token = response.data.AccessToken
              localStorage.setItem('AccessToken', token); // write
              // console.log(localStorage.getItem('AccessToken')); // read
              window.location.href = "http://localhost:8080/home"

              
      
                
          }
          )

          .catch((error) => {
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
      if(this.auth == 'Регистрация'){
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
  }
};
</script>



<style scoped>

.inputCalendar {
  margin-left: 600px;
  margin-top: 150px;
  width: 600px;
  height: 100px;
  background-color: brown;
}

.inputCal{
  margin: 20px;
  width: 95%;
  height: 35px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
}






.section__logo {
  padding-left: 10px;
  padding-top: 15px;
  margin-bottom: 0;
}

.form_services {
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  color: white;
}

.form_services__container {
  display: flex;
  justify-content: space-between;
}

html,
body * {
  box-sizing: border-box;
}

.container {
  position: fixed;
  top: 150px;
  left: 150px;
}


.frame {
  background-color: #cacdd3;
  max-height: 545px;
  width: 430px;

  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.5s ease;
}

.frame-long {
  max-height: 745px;
}


.nav {
  height: 100px;
  padding-top: 40px;
}

li {
  font-family: Raleway;
  font-weight: 700;
  padding-left: 10px;
  font-size: 20px;
  display: inline;
  text-transform: uppercase;
  padding-right: 10px;
  color: #15616D;
}

.signin-active a {
  padding-bottom: 10px;
  color: #15616D;
  border-bottom: solid 2px #1059ff;
  transition: all 0.25s ease;
  cursor: pointer;
}

.signin-inactive a {
  cursor: pointer;
  color: #001524;
}

.signup-active a {
  cursor: pointer;
  color: #15616D;
  border-bottom: solid 2px #1059ff;
  padding-bottom: 10px;
}

.signup-inactive a {
  cursor: pointer;
  transition: all 0.25s ease;
  color: #001524;
}


.form-signin {
  font-family: Raleway;
  width: 430px;
  height: 375px;
  font-size: 18px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 35px;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.form-signin-left {
  transform: translateX(-400px);
  opacity: 0;
}

.form-signup {
  width: 430px;
  height: 375px;
  font-size: 18px;
  font-weight: 300;

  padding: 37px 35px 0;
  position: relative;
  top: -375px;
  left: 400px;
  transition: all 0.5s ease;
}

.form-signup-left {
  transform: translateX(-399px);
}


.form-signin input,
.form-signup input {
  font-family: Raleway;
  font-weight: 500;
  color: #001524;
  font-size: 14px;
}

.form-styling {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
}

label {
  font-family: Raleway;
  font-weight: 700;
  color: #001524;
  font-size: 14px;

  text-transform: uppercase;
  padding-left: 15px;
  padding-bottom: 10px;
  display: block;
}

:focus {
  outline: none;
}

.form-signin input:focus,
textarea:focus,
.form-signup input:focus,
textarea:focus {
  background: rgb(220, 219, 219);
  border: none;
  padding-right: 40px;
  transition: background 0.5s ease;
}



.btn-signin {
  font-family: Raleway;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  color: #ffffff;

  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin-top: 23px;
  background-color: #1059ff;
  margin-top: -8px;
}

.btn-signup {
  font-family: Raleway;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  color: #ffffff;

  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin-top: 23px;
  background-color: #1059ff;
}

</style>