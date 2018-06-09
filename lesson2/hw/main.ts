interface Item {
    item: { name: string, count: number};
}

interface ItemNumber{
    itemNum: { number: number, count: number}
}

interface Counter {
    name: string, count: number
}

class Someclass implements Item
{
    names: any[];
    countOfNames: any[] = [];
    item: { name: string, count: number};

    constructor(arr: Array<any>) {
        this.names = arr;
    }

    countNamesOne() {
        let arr = this.countOfNames.slice();
        for (let i in this.names) {
            if (arr[0] == undefined) {
                this.item = {name: this.names[i], count: 1};
                arr.push(this.item);
            } else {
                let flag = true;
                arr.map((el: any) => {
                    if (el.name == this.names[i]) {
                        el.count++;
                        flag = false;
                    }else if (!isNaN(el) && el === this.names[i]){
                        el.count++;
                        flag = false;
                    }
                });
                if (flag) {
                    this.item = {name: this.names[i], count: 1};
                    arr.push(this.item);
                }
            }
        }

        return arr;
    }

    countNamesTwo() {
        let arr = this.countOfNames.slice();
        for (let i in this.names) {
            if (arr[this.names[i]] != undefined) {
                arr[this.names[i]]++
            } else {
                arr[this.names[i]] = 1;
            }
        }

        return arr;
    }

}

let arr = ['Bob',1 , 'John', 2,4,2, 'Peter', 'Alex', 'Alex', 'Bob', 'Bob', 'Alex', 'Alex', 'Bob', 'Kate', 'John'];

let ggg = new Someclass(arr);

console.log(arr);
console.log(ggg.countNamesOne());
console.log(ggg.countNamesTwo());


// find count of every name in array
