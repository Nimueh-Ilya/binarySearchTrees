class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array) {
    this.array = array;
  }
  cleanArray() {
    return [...new Set(this.array.sort((a, b) => a - b))];
  }

  buildTree(arr, start, end = arr.length) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
const arr = [1, 2, 3, 56, 56, 4, 5, 6, 7, 8, 9];
const newTree = new Tree(arr);
const myNode = newTree.buildTree(newTree.cleanArray(), 0);
console.log(myNode);
prettyPrint(myNode);
