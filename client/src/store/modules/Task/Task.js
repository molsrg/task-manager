// Файл с обработкой задач, которые находятся на главном календаре, высчисление стилей задачи

export default {
    // Функция для вычисления фона задачи
    calculateTaskColor(task) {
        if (task.type == "Personal") {
            return "#C4D7DA";
        }
        if (task.type == "Working") {
            return "#FFDEBF";
        }
        if (task.type == "Optional") {
            return "#DDC9C3";
        }
    },

    // Функция для вычисления длины задачи в пикселях
    calculateTaskLengthInPixels(task) {
        // Получаем время начала и времени окончания из задачи
        const startTime = new Date(task.startTime);
        const endTime = new Date(task.endTime);

        // Вычисляем продолжительность задачи в минутах
        const durationInMinutes = (endTime - startTime) / (1000 * 60);
    
        // Вычисляем длину задачи в пикселях (1 час = 80 пикселей)
        let lengthInPixels = (durationInMinutes / 60) * 80

        const addedHours = endTime.getHours() - startTime.getHours() - 1;
        // Добавляем 10px за каждый пройденный час
        if (addedHours + 1 > 1) {
            let additionalPixels = addedHours * 9;
            if (endTime.getMinutes() !== 0) {
                lengthInPixels += 5;
            }
            if(endTime.getHours() == 23 && endTime.getMinutes() == 59){
                lengthInPixels += 2
            }
            return lengthInPixels + additionalPixels;
        }

        if(endTime.getHours() == 23 && endTime.getMinutes() == 59){
            return lengthInPixels + 2
        }
        return lengthInPixels;
    },
    
    // Функция для вычисления левого позиционирования задачи в пикселях
    calculateLeftPosition(task, currentWeek) {
        const startTime = new Date(task.startTime);
        const day = startTime.getDate();
        const month = startTime.getMonth() + 1; 
        const year = startTime.getFullYear();

        const date= [day, month, year];

        for (let i = 0; i < currentWeek.length; i++) {
            if (currentWeek[i][1] == date[0] && currentWeek[i][4] == date[1]) {
                return i * 180 + 65;
            }
        }
    },

    // Функция для вычисления верхнего позиционирования задачи в пикселях
    calculateTaskStartPosition(task) {
        const startTime = new Date(task.startTime);
        const startHour = startTime.getHours(); // Используем getHours() для локального времени
        const startMinute = startTime.getMinutes(); // Используем getMinutes() для локального времени
        const totalMinutes = (startHour) * 60 + startMinute;
    
        const startPosition = (totalMinutes / 60) * 89 - 20;
        if (startMinute === 0) {
            return startPosition + 5;
        }
        return startPosition;
    }
    

};
