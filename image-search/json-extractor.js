module.exports = function(props, data){
    var arr = [];
    for(var i = 0; i < data.length; i++){
        var value = data[i];
        var obj = {};
        for(var j = 0; j < props.length; j++){
            var prop = props[j];
            if(value.hasOwnProperty(prop)){
                obj[prop] = value[prop];
            }
        }
        arr.push(obj);
    }
    return arr;
};