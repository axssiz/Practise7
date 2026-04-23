// Практическая работа: JavaScript

// 1. Функция, возвращающая квадрат числа
function squareNumber(num) {
  return num * num;
}

// 2. Функция, проверяющая, делится ли число на 3
function isDivisibleBy3(num) {
  return num % 3 === 0;
}

// 3. Функция, находящая остаток от деления
function remainder(dividend, divisor) {
  return dividend % divisor;
}

// 4. Функция, переводящая градусы Цельсия в Фаренгейты
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// 5. Функция, возвращающая наибольшее из трёх чисел
function maxOfThree(a, b, c) {
  return Math.max(a, b, c);
}

// 6. Функция, переводящая строку в верхний регистр
function toUpperCaseString(str) {
  return str.toUpperCase();
}

// 7. Функция, удаляющая все пробелы из строки
function removeSpaces(str) {
  return str.split(" ").join("");
}

// 8. Функция, заменяющая все буквы "a" на "o"
function replaceAWithO(str) {
  return str.replace(/a/g, "o").replace(/A/g, "O");
}

// 9. Функция, находящая количество символов в строке без использования .length
function stringLengthWithoutLength(str) {
  let count = 0;
  for (const _ of str) {
    count += 1;
  }
  return count;
}

// 10. Функция, проверяющая, содержит ли строка подстроку
function containsSubstring(str, substring) {
  return str.indexOf(substring) !== -1;
}

// 11. Функция, находящая сумму чётных чисел массива
function sumEvenNumbers(arr) {
  let sum = 0;
  for (const value of arr) {
    if (value % 2 === 0) {
      sum += value;
    }
  }
  return sum;
}

// 12. Функция, находящая количество элементов больше заданного числа
function countGreaterThan(arr, threshold) {
  let count = 0;
  for (const value of arr) {
    if (value > threshold) {
      count += 1;
    }
  }
  return count;
}

// 13. Функция, удаляющая первый элемент массива
function removeFirstElement(arr) {
  const copy = arr.slice();
  copy.shift();
  return copy;
}

// 14. Функция, добавляющая элемент в начало массива
function addElementToStart(arr, element) {
  const copy = arr.slice();
  copy.unshift(element);
  return copy;
}

// 15. Функция, находящая максимальное значение массива
function maxArray(arr) {
  return Math.max(...arr);
}

// 16. Функция, находящая минимальное значение массива
function minArray(arr) {
  return Math.min(...arr);
}

// 17. Функция, разворачивающая массив вручную (без reverse)
function reverseArrayManually(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    result.push(arr[i]);
  }
  return result;
}

// 18. Функция, находящая сумму элементов на чётных индексах
function sumEvenIndexElements(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (i % 2 === 0) {
      sum += arr[i];
    }
  }
  return sum;
}

// 19. Функция, создающая копию массива
function copyArray(arr) {
  return arr.slice();
}

// 20. Функция, проверяющая, есть ли элемент в массиве
function elementExists(arr, element) {
  return arr.indexOf(element) !== -1;
}

// 21. Создание объекта пользователя с полями name и age
const user = {
  name: "Ivan",
  age: 20,
};

// 22. Функция, выводящая все ключи объекта
function getObjectKeys(obj) {
  return Object.keys(obj);
}

// 23. Функция, выводящая все значения объекта
function getObjectValues(obj) {
  return Object.values(obj);
}

// 24. Функция, добавляющая новое свойство объекту
function addObjectProperty(obj, key, value) {
  const copy = { ...obj };
  copy[key] = value;
  return copy;
}

// 25. Функция, удаляющая свойство из объекта
function removeObjectProperty(obj, key) {
  const copy = { ...obj };
  delete copy[key];
  return copy;
}

// 26. Функция, изменяющая цвет текста элемента при клике
function changeTextColorOnClick(element, color) {
  if (!element || typeof element.addEventListener !== "function") {
    return;
  }
  element.addEventListener("click", () => {
    element.style.color = color;
  });
}

// 27. Функция, скрывающая элемент при нажатии кнопки
function hideElementOnButton(button, elementToHide) {
  if (!button || !elementToHide) {
    return;
  }
  button.addEventListener("click", () => {
    elementToHide.style.display = "none";
  });
}

// 28. Функция, показывающая значение input при нажатии кнопки
function showInputValueOnButton(button, input, outputElement) {
  if (!button || !input || !outputElement) {
    return;
  }
  button.addEventListener("click", () => {
    outputElement.textContent = input.value;
  });
}

// 29. Функция, добавляющая элемент в список при клике
function addListItemOnClick(button, list, itemText) {
  if (!button || !list) {
    return;
  }
  button.addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = itemText;
    list.appendChild(li);
  });
}

// 30. Функция, очищающая поле ввода после отправки
function clearInputAfterSubmit(form, input) {
  if (!form || !input) {
    return;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    input.value = "";
  });
}

// Примеры использования:
console.log(squareNumber(5)); // 25
console.log(isDivisibleBy3(9)); // true
console.log(remainder(10, 3)); // 1
console.log(celsiusToFahrenheit(0)); // 32
console.log(maxOfThree(1, 10, 5)); // 10
console.log(toUpperCaseString("hello")); // HELLO
console.log(removeSpaces(" a b c ")); // abc
console.log(replaceAWithO("Abracadabra")); // Obrocodobro
console.log(stringLengthWithoutLength("test")); // 4
console.log(containsSubstring("hello world", "world")); // true
console.log(sumEvenNumbers([1, 2, 3, 4])); // 6
console.log(countGreaterThan([1, 5, 8], 4)); // 2
console.log(removeFirstElement([1, 2, 3])); // [2, 3]
console.log(addElementToStart([2, 3], 1)); // [1, 2, 3]
console.log(maxArray([5, 3, 9])); // 9
console.log(minArray([5, 3, 9])); // 3
console.log(reverseArrayManually([1, 2, 3])); // [3, 2, 1]
console.log(sumEvenIndexElements([10, 20, 30, 40])); // 50
console.log(copyArray([1, 2, 3])); // [1, 2, 3]
console.log(elementExists([1, 2, 3], 2)); // true
console.log(getObjectKeys(user)); // ['name', 'age']
console.log(getObjectValues(user)); // ['Ivan', 20]
console.log(addObjectProperty(user, "city", "Moscow"));
console.log(removeObjectProperty(user, "age"));
