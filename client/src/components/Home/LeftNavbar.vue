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
      <!-- <div></div> -->
      <img @click="goPersonalArea" src="./../../assets/images/home/lk.svg" alt="">
      <img @click="goOut" src="./../../assets/images/auth/exit.svg" alt="">
    </div>

    <!-- <div class="task-container">
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
          :class="{ visible: tasklist.isTasklistVisible && tasklist.tasks.length > 0}"
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
            <span class="custom-checkbox"></span>
            {{ task.name }}
          </label>
        </div>
      </div>
      <div style="display:flex; flex-direction: column;">
        <button class="task-container__tasklist tasklist" @click="addedTask">
        Добавить задачу
        </button>
        <button class="task-container__tasklist tasklist" @click="addedTasklist">
          Добавить лист
        </button>
        <button class="task-container__tasklist tasklist" @click="checkSelectedTask">
          Показать отмеченные задачи
        </button>
      </div>
      
    </div> -->
  
    <TaskContainer></TaskContainer>
  
  </div>
</template>
  

<script>

import { mapGetters, mapMutations, mapActions } from "vuex";
import TaskContainer from './LEFT_NAVBAR/TaskContainer.vue'
// eslint-disable-next-line no-unused-vars
import Task from '../../store/modules/Task/Task'
export default {
  data() {
    return {
      checkedTasks: [],
    };
  
  },

  components: {
    TaskContainer
  },
  computed: {
    ...mapGetters(["USER_TASKLISTS", 'CHECKED_TASK']),
  },
  methods: {
    ...mapMutations(["UPDATE_VISIBLE_TASKLIST", "UPDATE_SELECT_TASKS",'UPDATE_IS_ADDED_TASK', 'UPDATE_IS_ADDED_TASKLIST', 'UPDATE_CHECK_SELECT_TASK']),
    ...mapActions(['GET_THIS_WEEK_TASKS','GET_THIS_DAY_TASKS']), 

    changeToggle(index) {
      this.UPDATE_VISIBLE_TASKLIST(index);
    },
    selectTasks() {
      this.UPDATE_SELECT_TASKS(this.checkedTasks);
    },

    addedTask() {
      this.UPDATE_IS_ADDED_TASK()
    },

    addedTasklist(){
      this.UPDATE_IS_ADDED_TASKLIST()
    },
    goPersonalArea(){
      window.location.href = "http://localhost:8080/personal"
    },

    checkSelectedTask(){
      this.UPDATE_CHECK_SELECT_TASK()
    },

    // заготовка под добавление людей
    addPeople() {},

    goOut(){
      localStorage.removeItem('AccessToken')
      window.location.href = "http://localhost:8080/"
    },
  },
};
</script>
