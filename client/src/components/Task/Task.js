// Файл с обработкой задач, которые находятся на главном календаре, высчисление стилей задачи

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
        let lengthInPixels = (durationInMinutes / 60) * 80;
        // Добавляем 10px за каждый пройденный час
        if (endHour - startHour > 1) {
            const addedHours = endHour - startHour - 1;
            let additionalPixels = addedHours * 9;
            if (endMinute !== 0) {
                lengthInPixels += 5;
            }
            return lengthInPixels + additionalPixels;
        }

        

        return lengthInPixels;
    },

    // Функция для вычисления левого позиционирования задачи в пикселях
    calculateLeftPosition(task, currentWeek) {
        const date = task.date.split("-");
        for (let i = 0; i < currentWeek.length; i++) {
            if (currentWeek[i][1] == date[0] && currentWeek[i][4] == date[1]) {
                return i * 180 + 65;
            }
        }
    },

    // Функция для вычисления верхнего позиционирования задачи в пикселях
    calculateTaskStartPosition(task) {
        const [startTime] = task.time.split(' - ');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const totalMinutes = (startHour - 1)  * 60 + startMinute;

        const startPosition = totalMinutes / 60 * 89 - 20
        if (startMinute == 0){ 
            return startPosition + 5
        }
        return startPosition
    },
};
