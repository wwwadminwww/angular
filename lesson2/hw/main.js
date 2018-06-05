var Someclass = /** @class */ (function () {
    function Someclass(arr) {
        this.countOfNames = [];
        this.names = arr;
    }
    Someclass.prototype.countNamesOne = function () {
        var _this = this;
        var arr = this.countOfNames.slice();
        var _loop_1 = function (i) {
            if (arr[0] == undefined) {
                arr.push({ name: this_1.names[i], count: 1 });
            }
            else {
                var flag_1 = true;
                arr.map(function (el) {
                    if (el.name == _this.names[i]) {
                        el.count++;
                        flag_1 = false;
                    }
                });
                if (flag_1) {
                    arr.push({ name: this_1.names[i], count: 1 });
                }
            }
        };
        var this_1 = this;
        for (var i in this.names) {
            _loop_1(i);
        }
        return arr;
    };
    Someclass.prototype.countNamesTwo = function () {
        var arr = this.countOfNames.slice();
        for (var i in this.names) {
            if (arr[this.names[i]] != undefined) {
                arr[this.names[i]]++;
            }
            else {
                arr[this.names[i]] = 1;
            }
        }
        return arr;
    };
    return Someclass;
}());
var arr = ['Bob', 'John', 'Peter', 'Alex', 'Alex', 'Bob', 'Bob', 'Alex', 'Alex', 'Bob', 'Kate', 'John'];
var ggg = new Someclass(arr);
console.log(arr);
console.log(ggg.countNamesOne());
console.log(ggg.countNamesTwo());
// find count of every name in array
