<template>
  <div class="wrapper">
    <span class="loader"></span>
  </div>

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
    <img src="../../assets/images/main/left-arrow.svg" alt="" class="arrow" />
    <img src="../../assets/images/main/right-arrow.svg" alt="" class="arrow" />
  </div>

  <div class="calendar">
    <div class="week">
      <div class="day">
        <div class="day__number">02</div>
        <div class="day__text">пн</div>
        <div class="day__line">―</div>
      </div>
      <div class="day">
        <div class="day__number">03</div>
        <div class="day__text">вт</div>
        <div class="day__line">―</div>
      </div>
      <div class="day">
        <div class="day__number">04</div>
        <div class="day__text">ср</div>
        <div class="day__line">―</div>
      </div>
      <div class="day">
        <div class="day__number">05</div>
        <div class="day__text">чт</div>
        <div class="day__line">―</div>
      </div>
      <div class="day">
        <div class="day__number">06</div>
        <div class="day__text">пт</div>
        <div class="day__line">―</div>
      </div>
      <div class="day">
        <div class="day__number">07</div>
        <div class="day__text">сб</div>
        <div class="day__line">―</div>
      </div>
      <div class="day">
        <div class="day__number">08</div>
        <div class="day__text">вс</div>
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

export default {
  data() {
    return {
      showCalendar: false,
      currentMonth: "",
      months: [
        "January 2023",
        "February 2023",
        "March 2023",
        "April 2023",
        "May 2023",
        "June 2023",
        "July 2023",
        "August 2023",
        "September 2023",
        "October 2023",
        "November 2023",
        "December 2023",
      ],
    };
  },
  mounted() {
    this.OAuth();
    this.getMonth();
  },

  methods: {
    changeCurrent(value) {
      this.currentMonth = value;
    },
    getMonth() {
      const today = new Date();
      const currentMonth = this.months[today.getMonth()];
      this.currentMonth = currentMonth;
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