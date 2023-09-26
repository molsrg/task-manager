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
            :class="tasklist.toggleCircle ? 'circle-plus opened' : 'circle-plus closed'"
            @click="changeToggle(index)"
          >
            <div class="circle">
              <div class="horizontal"></div>
              <div class="vertical"></div>
            </div>
          </div>
        </div>
        <div :class="{'visible' : tasklist.isTasklistVisible}" class="tasklist__tasks">
          <label v-for="(task, taskIndex) in tasklist.tasks" :key="taskIndex" class="tasklist__label" >
            <input class="real-checkbox" :value="task" type="checkbox" @change="selectTasks()"  v-model="checkedTasks"/>
            <span class="custom-checkbox" :style="tasklistLabel(task)"></span>
            {{ task.name }}
          </label>
        </div>
    </div>

    </div>
  </div>
</template>
  

<script>
import { mapGetters, mapMutations } from 'vuex';
import Task from './../Task/Task'
export default {
  data() {
    return {
      checkedTasks: [],

    }
  },
  computed: {
    ...mapGetters(['USER_TASKLISTS']), 
  },
  methods: {
    Task,
    ...mapMutations(['UPDATE_VISIBLE_TASKLIST', 'UPDATE_SELECT_TASKS']),
    changeToggle(index) {
      this.UPDATE_VISIBLE_TASKLIST(index)
    },
    selectTasks(){
      this.UPDATE_SELECT_TASKS(this.checkedTasks)
    },
    tasklistLabel(){

      // const colorTask = Task.calculateTaskColor(task)
      // return {
      //   background: colorTask,
      //   border: `1px solid ${colorTask}`
      // }
    },

    // заготовка под добавление людей
    addPeople() {

    }
  },

}

</script>
