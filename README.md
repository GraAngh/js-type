
# Установка

`npm i @graangh/type`

### Константы

```js 
Type.UNDEFINED = 'undefined'
Type.NULL      = 'null'
Type.BOOLEAN   = 'boolean'
Type.NUMBER    = 'number'
Type.STRING    = 'string'
Type.ARRAY     = 'array'
Type.FUNCTION  = 'function'
Type.OBJECT    = 'object'
Type.SYMBOL    = 'symbol'
/* extra type for object without prototype */
Type.PROTOTYPLESS = 'prototypless'
```

### Методы

 - **`of`**_`(value)`_ - определение типа для переданного значения 
	
 > Значение возвращается в виде предоставленных констант выше.
 > Для объекта __без прототипа__ вернет *Type.PROTOTYPLES*
	 
```js
const Type = require('@graangh/type.js');

console.log( Type.of('hello world') ); // Выведет <string> string 
console.log( Type.of(0) );             // Выведет <string> number
console.log( Type.of(undefined) );     // Выведет <string> undefined
console.log( Type.of(null) );          // Выведет <string> null
console.log( Type.of(Object.create(null)) ); // Выведет <string> prototypless
console.log( Type.of() );              // ERROR: no arguments forbidden

/* with Type.preferences.customTypes = true (enabled by default) */
class MyClass { constructor(){} }
console.log(new MyClass); // Выведет <string> MyClass
``` 

### Основа работы

Определение типа основывается как на получении свойства `[target].name`, 
так и на извлечении имени из исходного кода `[target.constructor].toString()`

[function.name article-en]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#JavaScript_compressors_and_minifiers
[function.name article-ru]: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/name#JavaScript_compressors_and_minifiers