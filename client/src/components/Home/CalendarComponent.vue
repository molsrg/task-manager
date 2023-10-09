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
      <img @click="goToCurrentWeek" class="arrows__item" src="../../assets/images/home/home.svg" alt="">
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
      <div class="task" v-for="task in USER_TASKS_IN_CALENDAR" :key="task.id" :style="taskStyle(task)" @click="showTask(task)">  
        <h5 class="task__name">{{ task.name }}</h5>
        <span class="task__time">{{ formatTime(task.startTime) }} - {{ formatTime(task.endTime) }}</span>
        <!-- <button @click="isTaskOverflowed">Выбрать</button> -->
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import Task from '../../store/modules/Task/Task'

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
    ...mapGetters(['USER_SELECT_TASKS', 'CURRENT_HOURS', 'CURRENT_MONTHS', 'USER_REGISTRATIONS', 'PRESENT_DAY', 'CURRENT_WEEK', 'FIRST_DAY',  'USER_TASKS_IN_CALENDAR', 'CHECKED_TASK']), 
    
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToCurrentHour();
    });

    this.CHANGE_WEEK(moment())
    this.GET_HOURS();
    this.GET_PRESENT_DAY()
    this.GET_MONTHS(this.USER_REGISTRATIONS);


    this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK)
    this.GET_THIS_DAY_TASKS(this.PRESENT_DAY)
    this.GET_TASKLIST() // other
  
  },

  methods: {
    ...mapActions(['GET_HOURS', 'GET_MONTHS', 'GET_PRESENT_DAY', 'CHANGE_WEEK', 'GET_THIS_WEEK_TASKS','GET_THIS_DAY_TASKS', 'GET_TASKLIST']), 
    ...mapMutations(['UPDATE_WEEK', 'UPDATE_FIRST_DAY_WEEK', 'UPDATE_CHECKED_TASK']),

    isTaskOverflowed(task) {
      const taskElement = this.$refs[`${task.id}`]; 
      console.log(taskElement)
    },

    // обновляет выбранную задачу 
    showTask(task){
      this.UPDATE_CHECKED_TASK(task)
    },

    // приводит дату к нужному формату в отображении задачи на календаре
    formatTime(dateTime){
      const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleTimeString(undefined, options);
    },
    // автоматически скролит к нужному времени при открытии страницы
    scrollToCurrentHour() { 
  const taskboardContainer = document.querySelector('.calendar__taskboard'); 
  if (taskboardContainer) {
    const currentHour = `${Number(moment().format('HH'))}:00`; 
    const hourElements = taskboardContainer.querySelectorAll('.time__name');
    
    for (let i = 0; i < hourElements.length; i++) {
      if (hourElements[i].textContent === currentHour) {
        const containerRect = taskboardContainer.getBoundingClientRect();
        const hourRect = hourElements[i].getBoundingClientRect();
        const scrollTop = hourRect.top - containerRect.top;
        taskboardContainer.scrollTop = scrollTop;
        return; // Выходим из цикла, когда нашли нужный час
      }
    }
    
    console.error("Час не найден в .calendar__taskboard.");
  } else {
    console.error("Элемент .calendar__taskboard не найден в DOM.");
  }
},
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
        const day = moment(startDate).add(i, "days").format("ddd-DD-MMMM-YYYY-MM");
        daysArray.push(day.split("-"));
      }
      return daysArray;
    },

    // изменяет выбранный месяц в списке (визуально)
    async changeCurrentMonth(value) {
      this.startLoading();
      this.UPDATE_FIRST_DAY_WEEK(`${value[0]} ${value[1]}`);
      const newDate = moment(`${value[0]}-${value[1]}`, "MMMM-YYYY").startOf("month");
      this.CHANGE_WEEK(newDate);
      this.showSelect = false
      this.currentWeek = newDate

      this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK)
      await this.loading()
      this.scrollToCurrentHour()
    },

    // переключает неделю на предыдущую (стрелка)
    async prevWeek(startDate) {
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
      this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK)
      this.UPDATE_FIRST_DAY_WEEK(`${this.capitalizeFirstLetter(this.CURRENT_WEEK[0][2])}  ${this.CURRENT_WEEK[0][3]}`);

      await this.loading();
      this.scrollToCurrentHour()
      
    },

    // переключает неделю на следующую (стрелка)
    async nextWeek() {
      this.startLoading();
      this.isFirstWeekReg = false;
      this.isArrowShow = true;
      if (!this.currentWeek) {
        // Если текущая неделя не определена, создаем ее и устанавливаем в текущую неделю
        this.currentWeek = moment().add(1, "week").startOf("isoWeek");
      } else {
        // Иначе переключаемся на следующую неделю
        this.currentWeek.add(1, "week");
      }

      this.UPDATE_WEEK(this.fillDays(this.currentWeek));
      this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK);
      this.UPDATE_FIRST_DAY_WEEK(`${this.capitalizeFirstLetter(this.CURRENT_WEEK[0][2])}  ${this.CURRENT_WEEK[0][3]}`);

      await this.loading();
      this.scrollToCurrentHour()
},


    // делает заглавным первые буквы месяцев в списке (мб костыль)
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    async goToCurrentWeek(){
      this.startLoading()
      this.CHANGE_WEEK(moment())
      this.currentWeek =  moment().clone().startOf("week")
      this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK)
      this.GET_THIS_DAY_TASKS(this.PRESENT_DAY)
      await this.loading()
      this.scrollToCurrentHour()
    },

    // старт загрузки
    startLoading() {
      this.showLoader = true;
      this.showCalendar = false;
    },
    // процесс загрузки
    async loading() {
  return new Promise((resolve) => {
    // Здесь выполняются асинхронные действия, например, задержка в 1 секунду
    setTimeout(() => {
      this.showLoader = false;
      this.showCalendar = true;
      resolve(); // Разрешить промис после выполнения
    }, 1000);
  });
},
    
  },
  

};
</script>

<style>
.wrapper {
  width: 1340px;
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