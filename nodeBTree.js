function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default class nodeBTree {
  //Khởi tạo node
  constructor(arr = [], connect = {}, parentNode = null) {
    this.arr = arr;
    this.connect = connect;
    this.parentNode = parentNode;
    this.result = document.getElementById("result");
  }
  sort() {
    //Sắp xếp
    this.arr.sort((a, b) => a - b);
  }
  browse(element) {
    //Sử dụng đệ quy để kiểm tra nơi cần thêm
    if (isObjectEmpty(this.connect)) {
      return this;
    } else {
      if (element < this.arr[0]) {
        return this.connect?.[0].browse(element);
      } else if (this.arr[this.arr.length - 1] < element) {
        return this.connect[this.arr.length].browse(element);
      } else {
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i] > element) {
            return this.connect[i].browse(element);
          }
        }
      }
    }
  }
  push(element) {
    //Kiểm tra nếu node cha tồn tại và đầy thì chạy trong if

    this.arr.push(element);
    this.sort();
    this.handle();
  }
  getConnect(arrKey, arrValue) {
    const obj = {};
    for (let i = 0; i < arrKey.length; i++) {
      if (this.connect.hasOwnProperty(arrValue[i])) {
        let t = this.connect[arrValue[i]];
        t.parentNode = this;
        obj[arrKey[i]] = t;
      }
    }
    return obj;
  }
  handle() {
    const parent = this.parentNode ? this.parentNode : this;
    if (this.arr.length >= 5) {
      const midValue = this.arr[2];
      const newNode = new nodeBTree(
        [...this.arr.slice(0, 2)],
        this.getConnect([0, 1, 2], [0, 1, 2]),
        parent
      );
      const newNode2 = new nodeBTree(
        [...this.arr.slice(3)],
        this.getConnect([0, 1, 2], [3, 4, 5]),
        parent
      );
      //Kiểm tra có tồn tại node cha không
      if (this.parentNode == null) {
        this.arr = [midValue];
        this.connect = {
          ...this.connect,
          [this.arr.length - 1]: newNode,
          [this.arr.length]: newNode2,
        };
      } else {
        this.parentNode.arr.push(midValue);
        this.parentNode.sort();
        this.arr = [...this.arr.slice(0, 2)];
        const index = this.parentNode.arr.indexOf(midValue);
        const newObj = {};
        for (let key in this.parentNode.connect) {
          if (+key <= index) {
            newObj[key] = this.parentNode.connect[key];
          } else {
            key = +key;
            newObj[key + 1] = this.parentNode.connect[key];
          }
        }
        newObj[index + 1] = newNode2;
        this.parentNode.connect = newObj;
        if (parent.arr.length >= 5) {
          parent.handle();
          parent.connect = {
            0: parent.connect[0],
            1: parent.connect[1],
          };
          for (let i = 0; i < 2; i++) {
            const parentConnect = parent.connect[i].connect;
            for (let key in parentConnect) {
              parentConnect[key].parentNode = parent.connect[i];
            }
          }
        }
      }
    }
  }

  show() {
    const node = this.drawANode(this.arr);
    this.result.appendChild(node);
    const row = document.createElement("div");
    row.classList.add("row");
    this.result.appendChild(row);
    this.addElement(this.connect, row);
  }
  addElement(connect, row) {
    Object.entries(connect).forEach(([key, value]) => {
      const column = document.createElement("div");
      column.classList.add("column");
      const node = this.drawANode(value.arr);
      column.appendChild(node);
      row.appendChild(column);
      const rowNew = document.createElement("div");
      rowNew.classList.add("row");
      column.appendChild(rowNew);
      this.addElement(connect[key].connect, rowNew);
    });
  }
  drawANode(arr) {
    const node = document.createElement("div");
    node.classList.add("node");
    for (let i = 0; i < arr.length; i++) {
      const element = document.createElement("element");
      element.classList.add("element");
      node.appendChild(element);
      element.innerText = arr[i];
    }
    return node;
  }
}
