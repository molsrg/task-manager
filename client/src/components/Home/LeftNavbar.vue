<template>
  <div class="leftnavbar">
    <div class="people-container">
      <img
        class="logo people-container__logo"
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
      v-for="(tasklist, index) in tasklists"
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
          <label v-for="(task, taskIndex) in tasklist.tasks" :key="taskIndex" class="tasklist__label">
            <input class="real-checkbox" type="checkbox" />
            <span class="custom-checkbox"></span>
            {{ task }}
          </label>
        </div>
    </div>

      

    </div>
  </div>
</template>
  

<script>
export default {
  data() {
    return {
      tasklists: [
        {
          title: 'Эта неделя',
          toggleCircle: false,
          isTasklistVisible: false,
          tasks: [
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
          ],
        },
        {
          title: 'Другая неделя',
          toggleCircle: false,
          isTasklistVisible: false,
          tasks: [
            'Задача 1',
            'Задача 2',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',
            'Утренняя рутина',

          ],
        },

      ],
    };
  },
  methods: {
    changeToggle(index) {
      this.tasklists[index].toggleCircle = !this.tasklists[index].toggleCircle;
      this.tasklists[index].isTasklistVisible = !this.tasklists[index].isTasklistVisible;
    },

    // заготовка под добавление людей
    addPeople() {

    }
  },
};
</script>
  
  <style >

/* height: 300px; 
  overflow: auto;
  transition: height 3s linear;  */
</style>