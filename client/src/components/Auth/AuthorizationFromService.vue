<template>
  <!-- <div class="wrapper">
    <span class="loader"></span>
  </div> -->

  <div class="select__arrow">
    <div class="select">
      <div class="select__header">
        <div class="select__current">{{ currentMonth }}</div>
        <img
          @click="showCalendar = !showCalendar"
          :class="showCalendar ? 'select__btn' : 'select__btn-isActive'"
          src="../../assets/images/main/select__btn.svg"
          alt=""
        />
      </div>
      <div :class="showCalendar ? 'select__body-show' : 'select__body'">
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
        @click="prevWeek()"
        src="../../assets/images/main/left-arrow.svg"
        alt=""
        class="arrows__item"
      />
      <img
        @click="nextWeek()"
        src="../../assets/images/main/right-arrow.svg"
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
        <div class="day__line">―</div>
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
      currentDate: null,
      presentDay: "",

      currentWeek: "",
      currentMonth: "",

      days: [],
      months: [],

      showCalendar: false,
      isFirstUpdate: true,

      registrationMonth: "01-04-2023", // user
    };
  },
  mounted() {
    this.currentDate = moment();
    this.currentMonth = this.capitalizeFirstLetter(
      this.currentDate.format("MMMM YYYY")
    ); // установка текущего месяца
    this.presentDay = this.currentDate.format("DD MMMM").split(" "); // установка текущего дня
    // this.OAuth();
    this.getMonths(this.registrationMonth); // загрузка в  select всех месяцев с даты регистрации по текущий + следующие
    this.showWeek(this.currentDate);
  },

  methods: {
    // показывает текущую неделю на календаре (выбранную)
    showWeek(currentDate) {
      this.days = [];
      const weekStart = currentDate.clone().startOf("week");
      this.currentWeek = weekStart;
      for (let i = 0; i <= 6; i++) {
        const day = moment(weekStart).add(i, "days").format("dddd DD MMMM");
        this.days.push(day.split(" "));
      }
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

    // изменяет выбранный месяц в списке
    changeCurrentMonth(value) {
      this.currentMonth = `${value[0]} ${value[1]}`;
    },

    // переключает неделю на предыдущую (стрелка)
    prevWeek() {
      if (!this.currentWeek) {
        this.currentWeek = moment().startOf("isoWeek").subtract(1, "week");
      } else {
        this.currentWeek.subtract(1, "week");
      }

      this.days = [];

      for (let i = 0; i <= 6; i++) {
        const day = moment(this.currentWeek)
          .add(i, "days")
          .format("dddd DD MMMM");
        this.days.push(day.split(" "));
      }
    },

    // переключает неделю на следующую (стрелка)
    nextWeek() {
      if (!this.currentWeek) {
        // Если текущая неделя не определена, создаем ее и устанавливаем в текущую неделю
        this.currentWeek = moment().add(1, "week").startOf("isoWeek");
      } else {
        // Иначе переключаемся на следующую неделю
        this.currentWeek.add(1, "week");
      }
      this.days = [];

      for (let i = 0; i <= 6; i++) {
        const day = moment(this.currentWeek)
          .add(i, "days")
          .format("dddd DD MMMM");
        this.days.push(day.split(" "));
      }
    },

    // делает заглавным первые буквы месяцев в списке (мб костыль)
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // изменяет месяц, выбранный в списке 
    changeMonth() {
      let date = null;
      for (let i = 0; i < this.months.length; i++) {
        if (`${this.months[i][0]} ${this.months[i][1]}` == this.currentMonth) {
          date = `${this.months[i][2]}-${this.months[i][1]}-01`;
        }
      }
      const newWeek = moment(date, "MM-YYYY-DD");
      this.showWeek(newWeek);
    },

    // получает информацию о code пользователя из адреса 
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
  watch: {
    // следит за отслеживанием выбранного месяца в списке и вызывает функцию при изменении значения 
    currentMonth() {
      if (this.isFirstUpdate) {
        this.isFirstUpdate = false; // Устанавливаем флаг false при первом обновлении
      } else {
        this.changeMonth();
      }
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