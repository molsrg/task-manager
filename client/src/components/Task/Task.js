export default {
        
    // Функция для вычисления фона задачи
    calculateTaskColor(task) {
        if (task.type == "EveryDay") {
        return "#C4D7DA";
        }
        if (task.type == "Working") {
        return "#FFDEBF";
        }
        if (task.type == "Common") {
        return "#DDC9C3";
        }
    },

    // Функция для вычисления длины задачи в пикселях
    calculateTaskLengthInPixels(task) {
        const [startTime, endTime] = task.time.split(" - ");

        // Разбиваем время начала и времени окончания на часы и минуты
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        // Вычисляем продолжительность задачи в минутах
        const durationInMinutes =
        (endHour - startHour) * 60 + (endMinute - startMinute);
        
        // Вычисляем длину задачи в пикселях (1 час = 80 пикселей)
        const lengthInPixels = (durationInMinutes / 60) * 80;
        // Добавляем 10px за каждый пройденный час
        if (endHour - startHour > 1) {
        const addedHours = endHour - startHour - 1;
        let additionalPixels = addedHours * 9;
        return lengthInPixels + additionalPixels;
        }

        return lengthInPixels;
    },

    calculateLeftPosition(task, currentWeek) {
        if (task && task.date) {
            const date = task.date.split("-");
            for (let i = 0; i < currentWeek.length; i++) {
                if (currentWeek[i][1] == date[0]) {
                    return i * 180 + 65;
                }
            }
        } else {
            // Обработка случая, когда task или task.date не существует
            console.error("Invalid task object:", task);
        }
    },
    
    calculateTaskStartPosition(task) {
        const [startTime] = task.time.split(' - ');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const totalMinutes = (startHour - 1)  * 60 + startMinute;

        const startPosition = totalMinutes / 60 * 89
        if (startMinute == 0){ 
            console.log(startPosition)
            return startPosition + 5 - 20
        }
        console.log(startPosition)
        return startPosition - 20;
    },
};
