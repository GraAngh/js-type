const assert = require('assert');
const Type = require('..\\src\\Type.js');

describe('class Type', function() {
    describe('Перечисление констант описания типов', function() {
        it('Type.UNDEFINED is "undefined"', function() {
            assert.equal(Type.UNDEFINED, 'undefined');
        });
        it('Type.NULL is "null"', function() {
            assert.equal(Type.NULL, 'null');
        });
        it('Type.BOOLEAN is "boolean"', function() {
            assert.equal(Type.BOOLEAN, 'boolean');
        });
        it('Type.NUMBER is "number"', function() {
            assert.equal(Type.NUMBER, 'number');
        });
        it('Type.STRING is "string"', function() {
            assert.equal(Type.STRING, 'string');
        });
        it('Type.ARRAY is "array"', function() {
            assert.equal(Type.ARRAY, 'array');
        });
        it('Type.OBJECT is "object"', function() {
            assert.equal(Type.OBJECT, 'object');
        });
        it('Type.FUNCTION is "function"', function() {
            assert.equal(Type.FUNCTION, 'function');
        });
        it('Type.SYMBOL is "symbol"', function() {
            assert.equal(Type.SYMBOL, 'symbol');
        });
        it('Type.PROTOTYPLESS is "prototypless"', function() {
            assert.equal(Type.PROTOTYPLESS, 'prototypless');
        });
    });
    
    describe('#of()', function() {
        it('When haven\'t passed a argument', function() {
            assert.throws(() => {
                Type.of();
            }, {
                name: 'Error',
                message: 'Have\'t passed a argument'
            }, 'Must throw error when no argument');
        });
        
        const customCases = [
            ['for undefined type', undefined, Type.UNDEFINED],
            ['for null type', null, Type.NULL],
            ['for boolean type', true, Type.BOOLEAN],
            ['for boolean type', false, Type.BOOLEAN],
            ['for number type', 0, Type.NUMBER],
            ['for number type', 1, Type.NUMBER],
            ['for number type', 1.02 + 0.02, Type.NUMBER],
            ['for number type', NaN, Type.NUMBER],
            ['for number type', new Number('123'), Type.NUMBER, 'Создание числа через конструктор new Number'],
            ['for string type', '', Type.STRING, 'Пустая строка'],
            ['for string type', 'Hello', Type.STRING, 'Не пустая строка'],
            ['for string type', String(123), Type.STRING, 'Преобразование числа в строчный тип'],
            ['for string type', new String(), Type.STRING, 'Создание числа через конструктор new String'],
            ['for array type', [], Type.ARRAY, 'Пустой массив'],
            ['for array type', [1, 2, 3], Type.ARRAY, 'Не пустой массив'],
            ['for object type', {}, Type.OBJECT],
            ['for function type', function(){}, Type.FUNCTION],
            ['for function type', ()=>{}, Type.FUNCTION],
            ['for function type', (new (class { method(){} })).method , Type.FUNCTION],
            ['for symbol type', Symbol.iterator, Type.SYMBOL, 'Встроенный символ'],
            ['for symbol type', Symbol.for('mySymbol'), Type.SYMBOL, 'Глобальный символ'],
            ['for symbol type', Symbol(), Type.SYMBOL, 'Локальный символ'],
            ['for prototypless type', Object.create(null), Type.PROTOTYPLESS, 'Беcпрототипный Object.create(null)'],
            ['for prototypless type', (array => { array.__proto__ = null; return array; })([]), Type.PROTOTYPLESS, 'Беcпрототипный array.__proto__ = null']
        ];
        
        customCases.forEach( c => it(c[0], function() {
            assert.equal(Type.of(c[1]), c[2], c[3]);
        }) ); 
        
        describe('Working with custom classes', function() {
            class MyClass { constructor(){} }
            const myclass = new MyClass;
                
            it('Name of constructor of class is target type', function() {
                assert.equal(Type.of(myclass), 'MyClass');
            });
            
            it('Its true for built-in classes. Fot class Map we get Map type', function() {
                assert.equal(Type.of(new Map), 'Map');
            });
            
            it('Turned off preference.customTypes return Type.OBJECT type instead', function() {
                Type.preferences.customTypes = false;
                assert.equal(Type.of(myclass), Type.OBJECT);
            });
            
            after(() => Type.preferences.customTypes = true);           
        });
        
        describe('Messing up with constructor name properties', function() {
            it('Removing constructor name will extract name from source', function() {
                class A { constructor() {} };
                
                delete A.name;
                assert.equal(A.name.length, 0, 'After deleting property name is void string');
                const a = new A;
                assert.equal(Type.of(a), 'A');
            });
        });
    });
    
    it('FALSE', function() { assert.ok(false) });
});