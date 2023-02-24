# Homework #5

```
Вносите изменения в файлы:

- ./src/AsyncArray.mjs
- ./src/async.mjs
```

> В данном домашнем задании нельзя использовать синтаксис `async/await`!

## Задание №1

Создайте и **экспортируйте** класс `AsyncArray` расширяющий обычный `Array`.
Класс `AsyncArray` должен содержать один метод `serialMap()`. 
Данный метод должен работать как обычный `map()`, но с учётом того, 
что каждое преобразование элемента массива происходит асинхронно, 
т.е. функция-преобразователь будет возвращать `Promise`. 
Следовательно, результатом `serialMap()` тоже должен быть `Promise` с новым экземпляром `AsyncArray` содержащим результаты всех асинхронных преобразований.
Каждое следующее преобразование должно запускаться только после того, как завершилось предыдущее.

#### Пример:
```javascript
import {AsyncArray} from './AsyncArray.mjs';

const asyncTransformation = (el, index, asyncArray) => new Promise((resolve, reject) => {
    // любое асинхронное преобразование
});
const asyncArray = new AsyncArray(1, 2, 3);

asyncArray.serialMap(asyncTransformation).then(result => {
    // result - экземпляр AsyncArray с результатами преобразований
});
```

## Задание №2

Создайте и **экспортируйте** функцию `_async()`.
Задача данной функции создавать самодельные асинхронные функции на основе функций-генераторов.

Если оригинальный синтаксис создания асинхронной функции выглядит так:
```javascript
async function testFunction(a, b) {
    return (await someAsyncAction(a)) + (await oneMoreAsyncAction(b));
}
```
то аналогичный самодельный вариант будет выглядеть так:
```javascript
import {_async} from './async.mjs';

const testFunction = _async(function* (a, b) {
    return (yield someAsyncAction(a)) + (yield oneMoreAsyncAction(b));
});
```
Самодельный вариант функции `testFunction` по принципу работы и результату не должен отличаться от оригинального.
