class Someclass {
    names: string[];
    countOfNames: any[] = [];

    constructor(arr: Array<string>) {
        this.names = arr;
    }

    countNamesOne() {
        let arr = this.countOfNames.slice();
        for (let i in this.names) {
            if (arr[0] == undefined) {
                arr.push({name: this.names[i], count: 1});
            } else {
                let flag = true;
                arr.map((el) => {
                    if (el.name == this.names[i]) {
                        el.count++;
                        flag = false;
                    }
                });
                if (flag) {
                    arr.push({name: this.names[i], count: 1});
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

let arr = ['Bob', 'John','Peter', 'Alex', 'Alex', 'Bob', 'Bob', 'Alex', 'Alex', 'Bob', 'Kate', 'John'];

let ggg = new Someclass(arr);

console.log(arr);
console.log(ggg.countNamesOne());
console.log(ggg.countNamesTwo());


// find count of every name in array
