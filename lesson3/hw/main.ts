interface Column {
    existData: Array<any>,
    type: string,
    counter: number,
    check(): void,
    element: HTMLElement
}

class filterTable {
    tableData: HTMLElement;
    names: Column = {
        existData:[],
        type:"name",
        counter:0,
        check: function () {
            if (this.counter === 2){
                this.counter = 0;
            }else{
                this.counter++;
            }
        },
        element: null,
    };
    dates: Column = {
        existData:[],
        type:"date",
        counter:0,
        check: function () {
            if (this.counter === 2){
                this.counter = 0;
            }else{
                this.counter++;
            }
        },
        element: null,
    };
    exp: Column = {
        existData:[],
        type:"exp",
        counter:0,
        check: function () {
            if (this.counter === 2){
                this.counter = 0;
            }else{
                this.counter++;
            }
        },
        element: null,
    };

    constructor(cells: HTMLElement, tName: HTMLElement, tExp: HTMLElement, tDate: HTMLElement) {
        this.tableData = cells;
        this.names.element = tName;
        this.exp.element = tExp;
        this.dates.element = tDate;
    }

    private getData() {
        let data: Array<any> = [];
        for (let i = 0; i < this.tableData['rows'].length; i++) {
            for (let j = 0; j < this.tableData['rows'][i].cells.length; j++) {
                if (!data[j]){
                    data.push([]);
                }
                data[j].push(this.tableData['rows'][i].cells[j].innerHTML);
            }
        }
        return data;
    }

    private prepareData():void{
        let data = this.getData();
        console.log(data);
        this.names.existData = data[0];
        this.exp.existData = data[1];
        this.dates.existData = data[2];

        console.log("Names:", this.names);
        console.log("Exp:", this.exp);
        console.log("Dates:", this.dates);
    }

    private sortColumn(column: Column): Array<any> {
        if (column.type === 'name'){
            switch (column.counter){
                case 0: return column.existData.slice().sort();
                case 1: return column.existData.slice().sort().reverse();
                case 2: return column.existData;
            }
        }else if(column.type === 'exp'){
            switch (column.counter){
                case 0: return column.existData.slice().sort(function (a, b) {  return a - b;  });
                case 1: return column.existData.slice().sort(function (a, b) {  return a - b;  }).reverse();
                case 2: return column.existData;
            }
        }else if(column.type === 'date'){
            switch (column.counter){
                case 0: return column.existData.slice().sort(function(a,b) {
                    return <any>new Date(a) - <any>new Date(b);
                });
                case 1: return <any>column.existData.slice().sort(function(a,b) {
                    return <any>new Date(a) - <any>new Date(b);
                }).reverse();
                case 2: return column.existData;
            }
        }
    };

    private render(cellsData, arr, colIndex): void{
        for (let i = 0; i < cellsData.rows.length; i++) {
            for (let j = 0; j < cellsData.rows[i].cells.length; j++) {
                cellsData.rows[i].cells[colIndex].innerHTML = arr[i];
            }
        }
    }

    run(){
        this.prepareData();
        this.names.element.addEventListener("click", () => {
            console.log("This is names click");
            this.render(tbody, this.exp.existData, 1);
            this.render(tbody, this.dates.existData, 2);
            this.render(tbody, this.sortColumn(this.names), 0);
            this.names.check();
        });
        this.exp.element.addEventListener("click", () => {
            console.log("This is exp click");
            this.render(tbody, this.names.existData, 0);
            this.render(tbody, this.dates.existData, 2);
            this.render(tbody, this.sortColumn(this.exp), 1);
            this.exp.check();
        });
        this.dates.element.addEventListener("click", () => {
            console.log("This is dates click");
            this.render(tbody, this.names.existData, 0);
            this.render(tbody, this.exp.existData, 1);
            this.render(tbody, this.sortColumn(this.dates), 2);
            this.dates.check();
        });
    }

}

let tbody = <HTMLElement>document.getElementById('tbody');
let tName = <HTMLElement>document.getElementById('name');
let tExp = <HTMLElement>document.getElementById('experience');
let tDate = <HTMLElement>document.getElementById('birthday');

let sort = new filterTable(tbody, tName, tExp, tDate);

sort.run();
