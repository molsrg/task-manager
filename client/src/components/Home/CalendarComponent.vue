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
          day[1] == PRESENT_DAY[0] && day[2] == PRESENT_DAY[1]
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
    

      <!-- <div class="taskboard">
        
      </div>  -->
    </div>

  </div>
  </div>

</template>

<script>
import moment from "moment";
import { mapGetters, mapActions, mapMutations } from 'vuex';
moment.locale("ru");

export default {
  data() {
    return {
      currentWeek: moment().clone().startOf("week"),

      showSelect: false, // меняет состоянике стерлки в списке месяцев
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
      const taskboardContainer = document.querySelector('.calendar__taskboard'); // Используем селектор для taskboard
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
      const heightInPixels = this.calculateTaskLengthInPixels(task);
      const colorTask = this.calculateTaskColor(task)
      const leftPosition = this.calculateLeftPosition(task)
      const position = 'absolute'
      const startPosition = this.calculateTaskStartPosition(task)

      return {
        height: heightInPixels + 'px', 
        'background-color': colorTask, 
        position: position,
        top: startPosition + 'px',
        left: leftPosition + 'px', 

      }
    },
  
    // Функция для вычисления фона задачи 
    calculateTaskColor(task){
      if(task.type == 'EveryDay'){
        return '#C4D7DA'
      }
      if(task.type == 'Working') {
        return '#FFDEBF'
      }
      if (task.type == 'Common') {
        return '#DDC9C3'
      }
    },

    // Функция для вычисления длины задачи в пикселях
    calculateTaskLengthInPixels(task) {
      const [startTime, endTime] = task.time.split(' - ');

      // Разбиваем время начала и времени окончания на часы и минуты
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      // Вычисляем продолжительность задачи в минутах
      const durationInMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);

      // Вычисляем длину задачи в пикселях (1 час = 80 пикселей)
      const lengthInPixels = (durationInMinutes / 60) * 80;

      // Добавляем 10px за каждый пройденный час
      if(endHour - startHour > 1){
        const addedHours = endHour - startHour
        let additionalPixels = addedHours * 6;
        return lengthInPixels + additionalPixels;
      }
      console.log(lengthInPixels)
      return lengthInPixels ;
    },

    calculateLeftPosition(task) {
      if (task && task.date) {
        const date = task.date.split('-');
        for (let i = 0; i < this.CURRENT_WEEK.length; i++) {
          if (this.CURRENT_WEEK[i][1] == date[0]) {
            return i * 180 + 65 ;
          }
        }
      } else {
        // Обработка случая, когда task или task.date не существует
        console.error('Invalid task object:', task);
      }
    },

    calculateTaskStartPosition(task){
    
      const [startTime] = task.time.split(' - ');
      const [startHour] = startTime.split(':').map(Number);
      // const totalMinutes = startHour * 60 + startMinute;

      const startPosition = (startHour - 1) * 89 + 5 ;
      return startPosition;

    },


    // // заполнение днями недели текущей
    fillDays(startDate) {
      const daysArray = [];
      for (let i = 0; i <= 6; i++) {
        const day = moment(startDate).add(i, "days").format("dddd-DD-MMMM-YYYY");
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