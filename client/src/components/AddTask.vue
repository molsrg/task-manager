<template>
    <form action="" type="post" @submit="addTask">
        <input
        type="text"
        placeholder="Название задачи"
        required
        v-model="taskName"
        />
        <input
        type="text"
        placeholder="Описание задачи"
        required
        v-model="taskInfo"
        />
        <label>Выберите тип задачи</label>
            <div>
                <input type="radio" id="taskType1" name="taskType" v-model="taskType" value="Personal" required />
                <label for="taskType1">Личное</label>

                <input type="radio" id="taskType2" name="taskType" v-model="taskType" value="Working" required />
                <label for="taskType2">Рабочее</label>

                <input type="radio" id="taskType3" name="taskType" v-model="taskType" value="Optional" required />
                <label for="taskType3">Нераспределённый</label>
            </div>


        <label for="start-time">Выберите время и дату начала задачи</label>
        <input
        id="start-time"
        type="datetime-local"
        placeholder="Начало задачи"
        required
        :min="formattedDate"
        v-model="taskStartTime"
        />
        <label for="end-time">Выберите время и дату окончания задачи</label>
        <input
        type="datetime-local"
        id="end-time"
        placeholder="Окончание задачи"
        required
        v-model="taskEndTime"
        />

        <button type="submit">Добавить задачу</button>
        <button @click="UPDATE_IS_ADDED_TASK()">Выйти из создания</button>
    </form>
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
    mounted() {
        this.formattedDate = this.USER_REGISTRATIONS.split('-').reverse().join('-') + 'T00:00'
    },
    data(){
        return {
            taskName: '',
            taskInfo: '', 
            taskType: '',
            taskStartTime: '',
            taskEndTime: '',


            formattedDate: ''
        }
    }, 
    methods: {
        ...mapActions(['ADD_TASK']), 
        ...mapMutations(['UPDATE_IS_ADDED_TASK']),
        addTask(event) {
            event.preventDefault();

            axios({
                method: "POST",
                url: "http://localhost:5000/task/createTask",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
                data: {
                    name: this.taskName,
                    type: this.taskType,
                    text: this.taskInfo,
                    status: "Done",
                    startTime: this.taskStartTime,
                    endTime: this.taskEndTime,
                },
                })
                .then(() => {
                    this.UPDATE_IS_ADDED_TASK()
                    location.reload();

                })
                .catch((err) => {
                    console.log(err);
                    alert("Создание задачи не удалось");
                });
        }
    }, 
    computed: {
    ...mapGetters(['USER_REGISTRATIONS' ]),
    },
};
</script>

<style scoped>
/* Стили для модального окна */
.modal {
  position: fixed;
  top: 25%;
  left: 25%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Затемненный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Выше других элементов на странице */
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Стили для формы и её элементов */
form {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="datetime-local"] {
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

input[type="radio"] {
  margin-right: 5px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

/* Стили для радиокнопок */
input[type="radio"] + label {
    font-weight: normal;
    cursor: pointer;
}

/* Стили для кнопок и других элементов формы (если есть) */
button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
}
</style>