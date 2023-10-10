<template>
    <form action="" type="post" @submit="addTaskList">
        <input
        type="text"
        placeholder="Название списка"
        required
        v-model="taskListTitle"
        />

        <label for="start-time">Выберите промежуток отслеживания списка</label>
        <input
        id="start-time"
        type="text"
        placeholder="Начало задачи"
        required
        v-model="taskListStartTime"
        :min="formattedDate"
        />
        

        <button type="submit">Добавить список</button>
        <button @click="UPDATE_IS_ADDED_TASKLIST()">Выйти из создания</button>
    </form>
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations, mapGetters } from "vuex";
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
export default {
    mounted() {
        this.formattedDate = this.USER_REGISTRATIONS.split('-').reverse().join('-') + 'T00:00'

        new AirDatepicker('#start-time',{
            position: 'right center',
            range: true,
            multipleDatesSeparator: ' - ', 
            dateFormat: 'yyyy-MM-dd',
            buttons: [
        {
            content(dp) {
                return dp.opts.timepicker 
                    ? 'Выключить выбор времени'
                    : 'Включить выбор времени'
            },
            onClick(dp) {
                let viewDate = dp.viewDate;
                let today = new Date();
                
                // Since timepicker takes initial time from 'viewDate', set up time here, 
                // otherwise time will be equal to 00:00 if user navigated through datepicker
                viewDate.setHours(today.getHours());
                viewDate.setMinutes(today.getMinutes());

                dp.update({
                    timepicker: !dp.opts.timepicker,
                    viewDate
                })
            }
        }
    ]
        });
        
    },
    data(){
        return {
            taskListTitle: '',
            taskListStartTime: '',
            taskListEndTime: '',

            formattedDate: ''
        }
    }, 
    methods: {
        ...mapActions(['ADD_TASK', 'GET_TASKLIST']), 
        ...mapMutations(['UPDATE_IS_ADDED_TASKLIST']),
        addTaskList(event) {
            event.preventDefault();
            axios({
                method: 'POST',
                url: 'http://localhost:5000/task/createTaskList',
                headers: {'authorization': `Bearer ${localStorage.getItem('AccessToken')}`},
                data: {
                    title: this.taskListTitle,
                    toggleCircle: false,
                    isTasklistVisible: false,
                    startTime: this.taskListStartTime,
                    endTime: this.taskListEndTime,
                },
            })
            .then(() => {
                this.UPDATE_IS_ADDED_TASKLIST()
                this.GET_TASKLIST()


            })
            .catch((err) => {
                console.log(err)
                alert("Создание списка не удалось")
            }) 
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