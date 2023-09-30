<template>
  <div class="leftnavbar">
    <div class="people-container">
      <img
        class="logo__img people-container__logo"
        src="../../assets/images/auth/logo.svg"
        alt="logo"
      />

      <div class="people-container__user-container user-container">
        <h3 class="user-container__user-count">3</h3>
        <img src="../../assets/images/home/line__horizont.svg" alt="" />
        <img
          src="../../assets/images/home/zaxar.png"
          alt=""
          class="user-container__user"
        />
        <img
          src="../../assets/images/home/zaxar.png"
          alt=""
          class="user-container__user"
        />
        <img
          src="../../assets/images/home/zaxar.png"
          alt=""
          class="user-container__user"
        />
        <button class="user-container__add-user" @click="addPeople()">
          <img src="../../assets/images/home/addpeople.svg" alt="" />
        </button>
      </div>
      <div></div>
    </div>

    <div class="task-container">
      <h3 class="logo__text task-container__logo-text">Task Unity Tech</h3>
      <div
        v-for="(tasklist, index) in USER_TASKLISTS"
        :key="index"
        class="task-container__tasklist tasklist"
      >
        <div class="tasklist__title">
          <h4 class="tasklist__text">{{ tasklist.title }}</h4>
          <div
            :class="
              tasklist.toggleCircle
                ? 'circle-plus opened'
                : 'circle-plus closed'
            "
            @click="changeToggle(index)"
          >
            <div class="circle" v-if="tasklist.tasks.length > 0">
              <div class="horizontal"></div>
              <div class="vertical"></div>
            </div>
          </div>
        </div>
        <div
          :class="{
            visible: tasklist.isTasklistVisible && tasklist.tasks.length > 0,
          }"
          class="tasklist__tasks"
        >
          <label
            v-for="task in tasklist.tasks"
            :key="task.id"
            class="tasklist__label"
          >
            <input
              class="real-checkbox"
              :value="task"
              type="checkbox"
              @change="selectTasks()"
              v-model="checkedTasks"
            />
            <span class="custom-checkbox" :style="tasklistLabel(task)"></span>
            {{ task.name }}
          </label>
        </div>
      </div>
      <button class="task-container__tasklist tasklist" @click="addedTask">
        Добавить задачу (заглушка)
      </button>
    </div>
  </div>
</template>
  

<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
// eslint-disable-next-line no-unused-vars
import Task from "./../Task/Task";
export default {
  data() {
    return {
      checkedTasks: [],
    };
  },
  computed: {
    ...mapGetters(["USER_TASKLISTS", 'CURRENT_WEEK', 'PRESENT_DAY']),
  },
  methods: {
    ...mapMutations(["UPDATE_VISIBLE_TASKLIST", "UPDATE_SELECT_TASKS"]),
    ...mapActions(['GET_THIS_WEEK_TASKS','GET_THIS_DAY_TASKS']), 
    changeToggle(index) {
      this.UPDATE_VISIBLE_TASKLIST(index);
    },
    selectTasks() {
      this.UPDATE_SELECT_TASKS(this.checkedTasks);
    },
    tasklistLabel() {
      // const colorTask = Task.calculateTaskColor(task)
      // return {
      //   background: colorTask,
      //   border: `1px solid ${colorTask}`
      // }
    },

    addedTask() {
      axios({
        method: "POST",
        url: "http://localhost:5000/task/create",
        headers: {
          authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
        data: {
          name: "dfвфвdwefswwwwwwfывмdfsdfRsdfacingсxxxссууу",
          type: "Working",
          text: "ERX1dwefрлдwwwwwсываsddfsfыdfxxxццц",
          status: "Done",
          startTime: "2023-09-20T12:00:00Z",
          endTime: "2023-09-20T16:30:00Z",
        },
      })
        .then((response) => {
          console.log(response);
          this.GET_THIS_WEEK_TASKS(this.CURRENT_WEEK)
          this.GET_THIS_DAY_TASKS(this.PRESENT_DAY)
        })
        .catch((err) => {
          console.log(err);
          alert("Создание задачи не удалось");
        });
    },

    // заготовка под добавление людей
    addPeople() {},
  },
};
</script>
