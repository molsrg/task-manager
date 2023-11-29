<template>
    <div class="form-task form-tasklist">
        <div class="form-title-container">
            <h3 class="form-title">
                {{ CHECKED_TASK.name }}
            </h3>
            <button type="button" @click="this.editedTask = !this.editedTask">
                <img src="./../../assets/images/home/edited_task.svg" alt="" />
            </button>
        </div>

        <form
            action=""
            type="post"
            @submit="editTask"
            style="display: flex; flex-direction: column; row-gap: 20px"
        >
            <div>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Описание задачи"
                    v-model="taskInfo"
                    :disabled="!editedTask"
                />
            </div>
            <h4 class="form-text">Тип задачи - {{ CHECKED_TASK.type }}</h4>

            <div>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Дата начала"
                    v-model="taskStartTime"
                    :disabled="!editedTask"
                />
            </div>

            <div>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Дата окончания"
                    v-model="taskEndTime"
                    :disabled="!editedTask"
                />
            </div>

            <div class="form-button-container">
                <div @click="deleteTask()" class="task-edited-button" style="border: 1px solid red; color: red;
;">
                    Удалить
                </div>

                <div @click="changeTask()" class="task-edited-button" style="background-color: #87979A; color: #FFECD1;
"> 
                    Сохранить
                </div>

                <div class="form-button_add" @click="closeTask()" >
                    Отмена
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    computed: {
        ...mapGetters(["CHECKED_TASK"]),
    },
    data() {
        return {
            taskInfo: "",
            taskStartTime: "",
            taskEndTime: "",
            editedTask: false,
        };
    },
    methods: {
        ...mapMutations(["UPDATE_CHECKED_TASK"]),
        closeTask() {
            this.UPDATE_CHECKED_TASK(undefined);
        },

        deleteTask(){

        }, 
        changeTask(){

        }
    },
    created() {
        const checkedTask = this.CHECKED_TASK;
        if (checkedTask) {
            this.taskInfo = checkedTask.text || "";
            this.taskStartTime = checkedTask.startTime || "";
            this.taskEndTime = checkedTask.endTime || "";
        }

        // <li>ID - {{ CHECKED_TASK._id }}</li>
        // <li>NAME - {{ CHECKED_TASK.name }}</li>
        // <li>INFO - {{ CHECKED_TASK.text}}</li>
        // <li>TYPE - {{ CHECKED_TASK.type }}</li>
        // <li>START TIME - {{ CHECKED_TASK.startTime }}</li>
        // <li>END TIME - {{ CHECKED_TASK.endTime }}</li>
        // <li>OWNER ? - {{ CHECKED_TASK.owner }}</li>
    },
};
</script>

<style>
.form-title-container {
    display: flex;
    column-gap: 5px;
    justify-content: center;
}

.task-edited-button {
    display: inline-block;
    text-align: center;
    padding-top: 11px;
    border-radius: 10px;
    cursor: pointer;
}
</style>