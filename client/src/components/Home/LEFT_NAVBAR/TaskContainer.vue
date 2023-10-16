<template>
<div class="task-container">
    <h3 class="task-container_logo-text">Task Unity Tech</h3>
    <div class="task-container_item">
        <div
        v-for="(tasklist, index) in USER_TASKLISTS"
        :key="index"
        class="tasklist"
        >
            <div class="tasklist_title">
                <h4 class="tasklist_title-text">{{ tasklist.title }}</h4>
                <div
                    :class="
                    tasklist.toggleCircle ? 'circle-plus opened' : 'circle-plus closed'
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
                class="tasklist_tasks"
                :class="{ 'tasklist_tasks-visible': tasklist.isTasklistVisible && tasklist.tasks.length > 0 }"
            >
            <label
                v-for="task in tasklist.tasks"
                :key="task.id"
                class="tasklist_label"
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
        <div class="tasklist-important-task">
                <h4>Домашка</h4>
                <img src="./../../../assets/images/home/tasklist-more.svg" alt="">
        </div>
    <div class="task-container_item">
        <button class="tasklist-option" @click="addedTask">
        Добавить задачу
        </button>

        <button class="tasklist-option" @click="addedTasklist">
        Добавить лист
        </button>

        <button
        class="tasklist-option"
        @click="checkSelectedTask"
        >
        Показать отмеченные задачи
        </button>
    </div>
    </div>
    
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import './../../../assets/images/home/tasklist-more.svg'
export default {
    data() {
        return {
        checkedTasks: [],
        };
    },
    computed: {
        ...mapGetters(["USER_TASKLISTS", "CHECKED_TASK"]),
    },
    methods: {
        ...mapMutations([
        "UPDATE_VISIBLE_TASKLIST",
        "UPDATE_SELECT_TASKS",
        "UPDATE_IS_ADDED_TASK",
        "UPDATE_IS_ADDED_TASKLIST",
        "UPDATE_CHECK_SELECT_TASK",
        ]),
        ...mapActions(["GET_THIS_WEEK_TASKS", "GET_THIS_DAY_TASKS"]),

        changeToggle(index) {
        this.UPDATE_VISIBLE_TASKLIST(index);
        },
        selectTasks() {
        this.UPDATE_SELECT_TASKS(this.checkedTasks);
        },

        addedTask() {
        this.UPDATE_IS_ADDED_TASK();
        },

        addedTasklist() {
        this.UPDATE_IS_ADDED_TASKLIST();
        },

        checkSelectedTask() {
        this.UPDATE_CHECK_SELECT_TASK();
        },
    },
};
</script>

<style scoped>
    .task-container {
        min-height: 100vh;
        min-width: 356px;
        background-color: rgb(191, 191, 191);
        padding: 0px 11px;
        /* overflow-y: scroll; */
        font-family: Raleway;
    }

    .task-container_logo-text {
        margin-top: 38px;
        font-size: 20px;
        font-weight: 200;
        color: rgba(0, 21, 36, 1);
    }

    .task-container_item{
        margin-top: 14px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .tasklist {
        background-color: #C4D7DA;
        padding: 17px 19px;
        border-radius: 10px;
        padding-bottom: 6px;
    }

    .tasklist_title{
        display: flex;
        justify-content: space-between;
    }

    .tasklist_title-text {
        font-size: 20px;
        font-weight: 500;
        line-height: 23px;
    }

    .tasklist_tasks{
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        font-family: Raleway;
        font-size: 20px;
        font-weight: 300;
        line-height: 23px;
        color: #001524;
        gap: 11px;

        max-height: 0;
        overflow: hidden;
        transition: max-height 5s linear; /* Устанавливаем время и тип анимации по вашему выбору */
    }

    .tasklist-important-task {
        background-color: transparent;
        border-radius: 10px;
        
        display: flex;
        justify-content: space-between;
        /* font-family: Raleway; */
        font-size: 20px;
        font-weight: 500;

        background-color: #DDC9C3;
        padding: 17px 21px;

    }

    .tasklist_tasks-visible{
        max-height: 500px; /* Выберите подходящее значение, чтобы максимально раскрывать список задач */
    }

    .tasklist_label{
        word-wrap: break-word;
    }
    
    .tasklist-option {
        background-color: transparent;
        border-radius: 10px;
        border: 1px #001524 solid;
        padding: 16px 53px;

        /* font-family: Raleway; */
        /* font-size: 16px; */
        font-weight: 500;

    }


    

</style>