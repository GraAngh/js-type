'use strict';
/*\
|*|
|*| DEFINITION
|*|
\*/ 
const Type = {
    /** 
     *  Получнеие типа значения
     *
     *  @var any value Проверяемое значение
     *
     *  @return string 
     */    
    of(value) {
        let raw_type = null;
        let lowcase_type = null;
        
        // аргумент не передан
        if (!arguments.length) {
            throw new Error('Have\'t passed a argument');
        }
        
        // особые переменные
        if (value === null) {
            return this.NULL;
        } 
        if (value === undefined) {
            return this.UNDEFINED;
        }
        
        // проверка наличия прототипа
        if (!value.__proto__) {
            return this.PROTOTYPLESS;
        }
        
        // здесь возможно удаление имени и замест будет пустая строка
        if (!value.__proto__.constructor.name) {
            raw_type = value.__proto__.constructor.toString().match(/^(?:function|class)\s+([^\s({]+)/)[1];
        } else {
            raw_type = value.__proto__.constructor.name;                   
        }
        
        lowcase_type = raw_type.toLowerCase();
        
        if ( !this._isBasicType(lowcase_type) ) {
            if (this.preferences.customTypes) {
                return raw_type;                
            }
            
            return this.OBJECT;
        }
        
        // Здесь вернется только базовый тип, аон весь в нижнем регистре
        return lowcase_type;
    },
    
    _isBasicType(type) {
        for (let i = 2; i < this.basicTypesMap.length; i++) {
            if (this.basicTypesMap[i].value === type) {
                return true;
            }
        }
        
        return false;
    }
};

const attachTypeConstant = function (constant) {
    attachTypeConstant.descriptor.value = constant.value;
    Object.defineProperty(this, constant.key, attachTypeConstant.descriptor);
};

attachTypeConstant.descriptor = {
    value: null,
    enumerable: true,
    writable: false,
    configurable: false
};

/* Карта констант */
Type.basicTypesMap = [
    {key: 'UNDEFINED', value: 'undefined'},
    {key: 'NULL',      value: 'null'},
    {key: 'BOOLEAN',   value: 'boolean'},
    {key: 'STRING',    value: 'string'},
    {key: 'NUMBER',    value: 'number'},
    {key: 'ARRAY',     value: 'array'},
    {key: 'FUNCTION',  value: 'function'},
    {key: 'OBJECT',    value: 'object'},
    {key: 'SYMBOL',    value: 'symbol'}
];
Type.extraTypesMap = [ 
    {key: 'PROTOTYPLESS', value: 'prototypless'}
];

Type.basicTypesMap.forEach( attachTypeConstant, Type );
Type.extraTypesMap.forEach( attachTypeConstant, Type );

/* объект настроек */
Object.defineProperty(Type, 'preferences', {    
    value: {
        /* Распознование объектов пользовательских классов как тип, 
        в противном случае распознавать как Object */
        customTypes: true 
    }
});

/*\
|*|
|*| EXPORT
|*|
\*/ 
module.exports = Type;