import nodeBTree from "./nodeBTree.js";

// const arr2 = [
//   2, 31, 1, 7, 9, 34, 33, -3, 32, 99, 66, 11, 55, 3, 4, 0, -4, 6, -2, 8, -6, 10,
//   12, 19, 16, 15, 13, 14,
// ];

function BTree(arr = []) {
  const node = new nodeBTree();
  for (let i = 0; i < arr.length; i++) {
    const nodeNeedPush = node.browse(arr[i]);
    // console.log({ [arr[i]]: nodeNeedPush });
    nodeNeedPush.push(arr[i]);
  }

  return node;
}

let arr = [];

const $$ = document.querySelector.bind(document);

const input = $$("#input");
const btnResult = $$("#submit");
const btnDelete = $$("#delete");

function clearDiv() {
  const div = document.getElementById("result");
  div.innerHTML = "";
}

function validArr(arr) {
  return arr.every(item => !isNaN(item) && item.toString() != "");
}
function hasUniqueElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) {
      return false;
    }
  }
  return true;
}
btnResult.onclick = () => {
  if (input.value) {
    arr = input.value.split(",");
    arr = arr.map(item => {
      let value = item.trim();
      return +value;
    });
    if (validArr(arr)) {
      if (!hasUniqueElements(arr)) {
        $.toast({
          text: "Các phần tử trong mảng phải là duy nhất!",
          heading: "Báo lỗi",
          showHideTransition: "slide",
          position: {
            right: 80,
            top: 20,
          },
          stack: false,
          icon: "error",
        });
        return false;
      }
      clearDiv();
      const result = BTree(arr);
      result.show();
      console.log(result);
      $.toast({
        text: "BTree thành công!",
        heading: "Thành công",
        showHideTransition: "slide",
        position: {
          right: 80,
          top: 20,
        },
        stack: false,
        icon: "success",
      });
    } else {
      $.toast({
        text: "Các phần tử truyền vào không hợp lệ!",
        heading: "Báo lỗi",
        showHideTransition: "slide",
        position: {
          right: 80,
          top: 20,
        },
        stack: false,
        icon: "error",
      });
    }
  } else {
    $.toast({
      text: "Không được bỏ trống ô nhập liệu!",
      heading: "Báo lỗi",
      showHideTransition: "slide",
      position: {
        right: 80,
        top: 20,
      },
      stack: false,
      icon: "error",
    });
  }
};

btnDelete.onclick = () => {
  clearDiv();
  input.value = "";
  $.toast({
    text: "Xóa thành công!",
    heading: "Thành công",
    showHideTransition: "slide",
    position: {
      right: 80,
      top: 20,
    },
    stack: false,
    icon: "success",
  });
};
