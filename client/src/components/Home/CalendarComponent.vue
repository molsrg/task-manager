<template>
  <div class="calendar__component">
    <div class="select__arrow">
    <div class="select">
      <div class="select__header">
        <div class="select__current">{{ FIRST_DAY }} </div>
        <img
          @click="showSelect = !showSelect"
          :class="showSelect ? 'select__btn' : 'select__btn-isActive'"
          src="../../assets/images/home/select__btn.svg"
          alt=""
          />
      </div>
      <div :class="showSelect ? 'select__body-show' : 'select__body'">
        <div
          @click="changeCurrentMonth(month)"
          class="select__item"
          v-for="month in CURRENT_MONTHS"
          :key="month"
        >
          {{ month[0] }} {{ month[1] }}
        </div>
      </div>
    </div>
    <div class="arrows">
      <img
        @click="prevWeek(this.USER_REGISTRATIONS)"
        src="../../assets/images/home/left-arrow.svg"
        alt=""
        :class="isArrowShow ? 'arrows__item' : 'arrows__item-hidden'"
      />
      <img
        @click="nextWeek()"
        src="../../assets/images/home/right-arrow.svg"
        alt=""
        class="arrows__item"
      />
    </div>
  </div>
  <div class="calendar">
    <div class="week">
      <div
        :class="
          day[1] == PRESENT_DAY[0] && day[2] == PRESENT_DAY[1] &&day[3] == PRESENT_DAY[2] 
            ? 'present-day'
            : 'day'
        "
        v-for="day in CURRENT_WEEK"
        :key="day"
      >
        <div class="day__number">{{ day[1] }}</div>
        <div class="day__text">{{ day[0] }}</div>
        <!-- <div class="day__text">{{ day[2] }}</div>
        <div class="day__text">{{ day[3] }}</div> -->

        <div class="day__line">―</div>
      </div>
    </div>
    <!-- заглушка -->
    <div class="wrapper" v-if="showLoader">
      <span class="loader"></span>
    </div>
  
    <div class="calendar__taskboard" v-else>
      <div class="time">
        <div class="time__container" >
          <span class="time__name" v-for="hour in CURRENT_HOURS" :key="hour" >{{ hour }}</span>
          
        </div>
      </div>
      <div class="task" v-for="task in USER_SELECT_TASKS" :key="task.id" :style="taskStyle(task)">
            <h5 class="task__name">{{ task.name }}</h5>
            <span class="task__time">{{ task.time }}</span>
            <span class="task__name">{{ task.date }}</span>
            <!-- <span class="task__name">{{ task.type }}</span> -->
          </div>
    </div>
  </div>
  </div>

</template>

<script>
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import Task from './../Task/Task'

import { mapGetters, mapActions, mapMutations } from 'vuex';
moment.locale("ru");

export default {
  data() {
    return {
      currentWeek: moment().clone().startOf("week"),

      showSelect: false, // меняет состоянике стрелки в списке месяцев
      isArrowShow: true, // убирает стрелку при достижении недели регистрации
      isFirstWeekReg: false, // тоже для первой регистрации

      // загрузка данных с сервера
      showLoader: false,
      showCalendar: true,

    };
  },
  computed: {
    ...mapGetters(['USER_SELECT_TASKS', 'CURRENT_HOURS', 'CURRENT_MONTHS', 'USER_REGISTRATIONS', 'PRESENT_DAY', 'CURRENT_WEEK', 'FIRST_DAY']), 
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToCurrentHour();
    });

    this.CHANGE_WEEK(moment())
    this.GET_HOURS();
    this.GET_PRESENT_DAY()
    this.GET_MONTHS(this.USER_REGISTRATIONS);
  },

  methods: {
    scrollToCurrentHour() { 
      const taskboardContainer = document.querySelector('.calendar__taskboard'); // 
      const currentHour = `${Number(moment().format('HH'))}:00`; 


        const hourElements = taskboardContainer.querySelectorAll('.time__name');


        for (let i = 0; i < hourElements.length; i++) {
        if (hourElements[i].textContent == currentHour) {
          const containerRect = taskboardContainer.getBoundingClientRect();
          const hourRect = hourElements[i].getBoundingClientRect();
          const scrollTop = hourRect.top - containerRect.top;
          taskboardContainer.scrollTop = scrollTop;
          break; 

          

    }
  }
      

        
    },
    ...mapActions(['GET_HOURS', 'GET_MONTHS', 'GET_PRESENT_DAY', 'CHANGE_WEEK']), 
    ...mapMutations(['UPDATE_WEEK', 'UPDATE_FIRST_DAY_WEEK']),
    
    // Функция для вычисления стиля задачи 
    taskStyle(task) {
      const heightInPixels = Task.calculateTaskLengthInPixels(task);
      // console.log(`${task.name}, длина задачи - ${heightInPixels}`)
      const colorTask = Task.calculateTaskColor(task)
      const leftPosition = Task.calculateLeftPosition(task, this.CURRENT_WEEK)
      const startPosition = Task.calculateTaskStartPosition(task)

      return {
        height: heightInPixels + 'px', 
        'background-color': colorTask, 
        top: startPosition + 'px',
        left: leftPosition + 'px', 
      }
    },
  
    // заполнение днями недели текущей
    fillDays(startDate) {
      const daysArray = [];
      for (let i = 0; i <= 6; i++) {
        const day = moment(startDate).add(i, "days").format("ddd-DD-MMMM-YYYY");
        daysArray.push(day.split("-"));
      }
      return daysArray;
    },

    // изменяет выбранный месяц в списке (визуально)
    changeCurrentMonth(value) {
      this.UPDATE_FIRST_DAY_WEEK(`${value[0]} ${value[1]}`);
      const newDate = moment(`${value[0]}-${value[1]}`, "MMMM-YYYY").startOf("month");
      this.CHANGE_WEEK(newDate);
      this.showSelect = false
    },

    // переключает неделю на предыдущую (стрелка)
    prevWeek(startDate) {
      this.startLoading();

      const previousWeek = this.currentWeek
            ? this.currentWeek.clone().subtract(1, "week")
            : moment().startOf("isoWeek").subtract(1, "week");

      const startDateNormalized = moment(startDate, "DD-MM-YYYY").startOf("month");

      if (previousWeek.isBefore(startDateNormalized)) {
        if(!this.isFirstWeekReg){
          this.currentWeek = previousWeek;
          this.isArrowShow = false;
        }
        this.isFirstWeekReg = true;
      }
      else {
        this.currentWeek.subtract(1, "week");
      }

      this.UPDATE_WEEK(this.fillDays(this.currentWeek));
      this.UPDATE_FIRST_DAY_WEEK(`${this.capitalizeFirstLetter(this.CURRENT_WEEK[0][2])}  ${this.CURRENT_WEEK[0][3]}`);
      this.loading();
      
    },

    // переключает неделю на следующую (стрелка)
    nextWeek() {
      this.startLoading();
      this.isFirstWeekReg = false 
      this.isArrowShow = true;
      if (!this.currentWeek) {
        // Если текущая неделя не определена, создаем ее и устанавливаем в текущую неделю
        this.currentWeek = moment().add(1, "week").startOf("isoWeek");
      } else {
        // Иначе переключаемся на следующую неделю
        this.currentWeek.add(1, "week");
      }

      this.UPDATE_WEEK(this.fillDays(this.currentWeek));
      this.UPDATE_FIRST_DAY_WEEK(`${this.capitalizeFirstLetter(this.CURRENT_WEEK[0][2])}  ${this.CURRENT_WEEK[0][3]}`);

      this.loading();

    },

    // делает заглавным первые буквы месяцев в списке (мб костыль)
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // старт загрузки
    startLoading() {
      this.showLoader = true;
      this.showCalendar = false;
    },
    // процесс загрузки
    loading() {
      // здесь будем получать данные с сервера
      setTimeout(() => {
        this.showLoader = false;
        this.showCalendar = true;
      }, 1000);
    },
    
  },
  

};
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