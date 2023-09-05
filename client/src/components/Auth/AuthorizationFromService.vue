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
          @click="changeCurrent(month)"
          class="select__item"
          v-for="month in months"
          :key="month"
        >
          {{ month }}
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
        <!-- <div class="day__text">{{ day[2] }}</div> -->
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

export default {
  data() {
    return {
      presentDay: "",
      currentMonth: "",

      days: [],
      months: [],

      showCalendar: false,

      registrationMonth: "01-04-2023", // user
    };
  },
  mounted() {
    // this.OAuth();
    this.momentjs();
    this.getMonths(this.registrationMonth); // загрузка в  select всех месяцев с даты регистрации по текущий
  },

  methods: {
    momentjs() {
      const currentDate = moment();
      currentDate.locale("ru");
      this.currentMonth = this.capitalizeFirstLetter(
        currentDate.format("MMMM YYYY")
      ); // установка текущего месяца
      this.presentDay = currentDate.format("DD MMMM").split(" "); // установка текущего дня

      const weekStart = currentDate.clone().startOf("week");
      for (let i = 0; i <= 6; i++) {
        const day = moment(weekStart).add(i, "days").format("dddd DD MMMM");
        this.days.push(day.split(" "));
      }
    },

    getMonths(startDate, monthAfter = 3) {
      const nowNormalized = moment().locale("ru").startOf("month"); // Первое число текущего месяца
      const startDateNormalized = moment(startDate, "DD-MM-YYYY")
        .locale("ru")
        .startOf("month");

      while (startDateNormalized.isBefore(nowNormalized)) {
        this.months.push(
          this.capitalizeFirstLetter(startDateNormalized.format("MMMM YYYY"))
        );
        startDateNormalized.add(1, "M");
      }
      // Добавляем текущий месяц
      // this.months.push(nowNormalized.format("MMMM YYYY"));

      // Добавляем месяцы после текущего
      for (let i = 0; i < monthAfter; i++) {
        const monthslater = nowNormalized.clone().add(i, "M");
        this.months.push(
          this.capitalizeFirstLetter(monthslater.format("MMMM YYYY"))
        );
      }
    },

    changeCurrent(value) {
      this.currentMonth = value;
    },
    prevWeek() {
      if (!this.currentWeek) {
        this.currentWeek = moment()
          .startOf("isoWeek")
          .subtract(1, "week")
          .locale("ru");
      } else {
        this.currentWeek.subtract(1, "week").locale("ru");
      }

      this.days = [];

      for (let i = 0; i <= 6; i++) {
        const day = moment(this.currentWeek)
          .add(i, "days")
          .format("dddd DD MMMM");
        this.days.push(day.split(" "));
      }
    },
    nextWeek() {
      if (!this.currentWeek) {
        // Если текущая неделя не определена, создаем ее и устанавливаем в текущую неделю
        this.currentWeek = moment().add(1, "week").startOf("isoWeek");
      } else {
        // Иначе переключаемся на следующую неделю
        this.currentWeek.add(1, "week");
      }

      this.currentWeek.locale("ru");
      this.days = [];

      for (let i = 0; i <= 6; i++) {
        const day = moment(this.currentWeek)
          .add(i, "days")
          .format("dddd DD MMMM");
        this.days.push(day.split(" "));
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // 1) здесь я сделал минимальную разметку
    // 2) в хуке маунтед происходит отправка запроса к серверу, пока что он возвращает ошибку, скорее всего так и задумано
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