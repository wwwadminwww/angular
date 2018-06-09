var tbody = document.getElementById('tbody');
var tName = document.getElementById('name');
var tExp = document.getElementById('experience');
var tDate = document.getElementById('birthday');
var filterTable = /** @class */ (function () {
    function filterTable(cells, tName, tExp, tDate) {
        this.names = {
            existData: [],
            type: "name",
            counter: 0,
            check: function () {
                if (this.counter === 2) {
                    this.counter = 0;
                }
                else {
                    this.counter++;
                }
            },
            element: null
        };
        this.dates = {
            existData: [],
            type: "date",
            counter: 0,
            check: function () {
                if (this.counter === 2) {
                    this.counter = 0;
                }
                else {
                    this.counter++;
                }
            },
            element: null
        };
        this.exp = {
            existData: [],
            type: "exp",
            counter: 0,
            check: function () {
                if (this.counter === 2) {
                    this.counter = 0;
                }
                else {
                    this.counter++;
                }
            },
            element: null
        };
        this.tableData = cells;
        this.names.element = tName;
        this.exp.element = tExp;
        this.dates.element = tDate;
    }
    filterTable.prototype.getData = function () {
        var data = [];
        for (var i = 0; i < this.tableData['rows'].length; i++) {
            for (var j = 0; j < this.tableData['rows'][i].cells.length; j++) {
                if (!data[j]) {
                    data.push([]);
                }
                data[j].push(this.tableData['rows'][i].cells[j].innerHTML);
            }
        }
        return data;
    };
    filterTable.prototype.prepareData = function () {
        var data = this.getData();
        console.log(data);
        this.names.existData = data[0];
        this.exp.existData = data[1];
        this.dates.existData = data[2];
        console.log("Names:", this.names);
        console.log("Exp:", this.exp);
        console.log("Dates:", this.dates);
    };
    filterTable.prototype.sortColumn = function (column) {
        if (column.type === 'name') {
            switch (column.counter) {
                case 0: return column.existData.slice().sort();
                case 1: return column.existData.slice().sort().reverse();
                case 2: return column.existData;
            }
        }
        else if (column.type === 'exp') {
            switch (column.counter) {
                case 0: return column.existData.slice().sort(function (a, b) { return a - b; });
                case 1: return column.existData.slice().sort(function (a, b) { return a - b; }).reverse();
                case 2: return column.existData;
            }
        }
        else if (column.type === 'date') {
            switch (column.counter) {
                case 0: return column.existData.slice().sort(function (a, b) {
                    return new Date(a) - new Date(b);
                });
                case 1: return column.existData.slice().sort(function (a, b) {
                    return new Date(a) - new Date(b);
                }).reverse();
                case 2: return column.existData;
            }
        }
    };
    ;
    filterTable.prototype.render = function (cellsData, arr, colIndex) {
        for (var i = 0; i < cellsData.rows.length; i++) {
            for (var j = 0; j < cellsData.rows[i].cells.length; j++) {
                cellsData.rows[i].cells[colIndex].innerHTML = arr[i];
            }
        }
    };
    filterTable.prototype.run = function () {
        var _this = this;
        this.prepareData();
        this.names.element.addEventListener("click", function () {
            console.log("This is names click");
            _this.render(tbody, _this.exp.existData, 1);
            _this.render(tbody, _this.dates.existData, 2);
            _this.render(tbody, _this.sortColumn(_this.names), 0);
            _this.names.check();
        });
        this.exp.element.addEventListener("click", function () {
            console.log("This is exp click");
            _this.render(tbody, _this.names.existData, 0);
            _this.render(tbody, _this.dates.existData, 2);
            _this.render(tbody, _this.sortColumn(_this.exp), 1);
            _this.exp.check();
        });
        this.dates.element.addEventListener("click", function () {
            console.log("This is dates click");
            _this.render(tbody, _this.names.existData, 0);
            _this.render(tbody, _this.exp.existData, 1);
            _this.render(tbody, _this.sortColumn(_this.dates), 2);
            _this.dates.check();
        });
    };
    return filterTable;
}());
var sort = new filterTable(tbody, tName, tExp, tDate);
sort.run();
