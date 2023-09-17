<template>
  <div class="calendar__component">
    <div class="select__arrow">
    <div class="select">
      <div class="select__header">
        <div class="select__current">{{ firstDay }} </div>
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
          v-for="month in months"
          :key="month"
        >
          {{ month[0] }} {{ month[1] }}
        </div>
      </div>
    </div>
    <div class="arrows">
      <img
        @click="prevWeek(this.registrationMonth)"
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
          day[1] == presentDay[0] && day[2] == presentDay[1]
            ? 'present-day'
            : 'day'
        "
        v-for="day in days"
        :key="day"
      >
        <div class="day__number">{{ day[1] }}</div>
        <div class="day__text">{{ day[0] }}</div>
        <div class="day__text">{{ day[2] }}</div>
        <div class="day__text">{{ day[3] }}</div>
        <div class="day__line">―</div>
      </div>
    </div>
    <div class="wrapper" v-if="showLoader">
      <span class="loader"></span>
    </div>
    <div class="calendar__taskboard" v-else>
      <div class="time">
      <div class="time__container">
        <span class="time__name" v-for="hour in hours" :key="hour">{{ hour }}</span>
        
      </div>
    </div>
    <div class="taskboard">
      
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      <div class="task">
        <h5 class="task__name">Утренняя рутина</h5>
        <span class="task__time">7:00 - 8:00</span>
      </div>
      
    </div>
    </div>

  </div>
  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";
moment.locale("ru");

export default {
  data() {
    return {
      presentDay: "",
      currentWeek: "",
      firstDay: "",

      hours: [],
      days: [],
      months: [],

      showSelect: false,
      isArrowShow: true,
      isFirstWeekReg: false, 

      // загрузка данных с сервера
      showLoader: false,
      showCalendar: true,

      registrationMonth: "23-07-2023", // user
    };
  },
  mounted() {

    this.presentDay = moment().format("DD-MMMM").split("-"); // установка текущего дня 
    // this.OAuth();
    this.getMonths(this.registrationMonth); // загрузка в  select всех месяцев с даты регистрации по текущий + следующие
    this.showWeek(moment());
    this.getHours()


  },

  methods: {
    // загружаем часы с текущего на день вперед
    getHours() {
      let currentHour = Number(moment().format('HH'))
      for (let i = 0; i < 24; i++) {
        let hour = currentHour + i;
        if (hour > 23) {
          hour -= 24; 
        }
        this.hours.push(`${hour}:00`)        
      }
    
    },
    // показывает текущую неделю на календаре (выбранную)
    showWeek(currentDate) {
      this.days = [];
      const weekStart = currentDate.clone().startOf("week");
      this.currentWeek = weekStart;
      this.days = this.fillDays(this.currentWeek);
      this.firstDay = `${this.capitalizeFirstLetter(this.days[0][2])}  ${this.days[0][3]}`
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

    // загружает месяца пользователя, с регистарации по текущий + 3 вперёд (настраиваемо)
    getMonths(startDate, monthAfter = 3) {
      const nowNormalized = moment().locale("ru").startOf("month"); // Первое число текущего месяца
      const startDateNormalized = moment(startDate, "DD-MM-YYYY").startOf(
        "month"
      );
      while (startDateNormalized.isBefore(nowNormalized)) {
        this.months.push(
          this.capitalizeFirstLetter(
            startDateNormalized.format("MMMM YYYY MM")
          ).split(" ")
        );
        startDateNormalized.add(1, "M");
      }

      // Добавляем месяцы после текущего
      for (let i = 0; i < monthAfter; i++) {
        const monthslater = nowNormalized.clone().add(i, "M");
        this.months.push(
          this.capitalizeFirstLetter(monthslater.format("MMMM YYYY MM")).split(
            " "
          )
        );
      }
    },

    // изменяет выбранный месяц в списке (визуально)
    changeCurrentMonth(value) {
      this.firstDay = `${value[0]} ${value[1]}`;
      const newDate = moment(`${value[0]}-${value[1]}`, "MMMM-YYYY").startOf("month");
      this.showWeek(newDate);
    },

    // переключает неделю на предыдущую (стрелка)
    prevWeek(startDate) {
      this.startLoading();

      const previousWeek = this.currentWeek
        ? this.currentWeek.clone().subtract(1, "week")
        : moment().startOf("isoWeek").subtract(1, "week");
      const startDateNormalized = moment(startDate, "DD-MM-YYYY").startOf(
        "month"
      );
      
      if (previousWeek.isBefore(startDateNormalized)) {
        if(!this.isFirstWeekReg) {
          this.currentWeek = previousWeek;
          this.days = [];
          this.days = this.fillDays(this.currentWeek);
          this.isArrowShow = false;
        }
        this.isFirstWeekReg = true 
        // alert("Вы не можете перейти за начальную дату регистрации.");
        
      } else {
        this.currentWeek = previousWeek;
        this.days = [];
        this.days = this.fillDays(this.currentWeek);
      }
      this.firstDay = `${this.capitalizeFirstLetter(this.days[0][2])}  ${this.days[0][3]}`
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
      this.days = [];

      this.days = this.fillDays(this.currentWeek);
      this.firstDay = `${this.capitalizeFirstLetter(this.days[0][2])}  ${this.days[0][3]}`
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

    // // получает информацию о code пользователя из адреса
    OAuth() {
      const string = window.location.search;
      const code = string.split("?code=")[1];

      console.log(code); // выводит код доступа гитхаба

      axios
        .post(`localhost:5000/auth/gh_oauth`, code)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
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