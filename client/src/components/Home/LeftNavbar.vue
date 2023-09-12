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
        <button class="user-container__add-user">
          <img src="../../assets/images/home/addpeople.svg" alt="" />
        </button>
      </div>
      <div></div>
    </div>

    <div class="task-container">
      <h3 class="logo__text task-container__logo-text">Task Unity Tech</h3>
      <div class="task-container__tasklist tasklist">
        <div class="tasklist__title">
          <h4 class="tasklist__text">Эта неделя</h4>
          <div
            :class="toggleCircle ? 'circle-plus opened' : 'circle-plus closed'"
            @click="changeToggle()"
          >
            <div class="circle">
              <div class="horizontal"></div>
              <div class="vertical"></div>
            </div>
          </div>
        </div>
        <div class="tasklist__tasks" v-if="isTasklistVisible">
            <label class="tasklist__label">
                <input class="real-checkbox" type="checkbox"/>
                <span class="custom-checkbox"></span>
                Утренняя рутина

            </label>
            <label class="tasklist__label">
                <input class="real-checkbox" type="checkbox"/>
                <span class="custom-checkbox"></span>
                Утренняя рутина

            </label>
            <label class="tasklist__label">
                <input class="real-checkbox" type="checkbox"/>
                <span class="custom-checkbox"></span>
                Утренняя рутина

            </label>
            <label class="tasklist__label">
                <input class="real-checkbox" type="checkbox"/>
                <span class="custom-checkbox"></span>
                Утренняя рутина

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
        toggleCircle: false,
        isTasklistVisible: false,
    };
  },
  methods: {
    changeToggle() {
      this.toggleCircle = !this.toggleCircle;
      this.isTasklistVisible = !this.isTasklistVisible;
    },
  },
};
</script>
  
  <style >
/* анимация переключения с + на -  */
.closed .vertical {
  transition: all 0.5s ease-in-out;
  transform: rotate(-90deg);
}
.closed .horizontal {
  transition: all 0.5s ease-in-out;
  transform: rotate(-90deg);
  opacity: 1;
}

.opened {
  opacity: 1;
}
.opened .vertical {
  transition: all 0.5s ease-in-out;
  transform: rotate(90deg);
}
.opened .horizontal {
  transition: all 0.5s ease-in-out;
  transform: rotate(90deg);
  opacity: 0;
}

.circle-plus {
  height: 26px;
  width: 26px;
  font-size: 1em;
  opacity: 0.7;
}

.circle-plus .circle {
  position: relative;
  width: 100%;
  padding-top: 100%;
}

.circle-plus .circle .horizontal {
  position: absolute;
  background-color: black;
  width: 50%;
  height: 1px;
  left: 50%;
  margin-left: -25%;
  top: 50%;
}

.circle-plus .circle .vertical {
  position: absolute;
  background-color: black;
  width: 1px;
  height: 50%;
  left: 50%;
  top: 50%;
  margin-top: -25%;
}
</style>