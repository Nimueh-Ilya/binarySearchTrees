class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }
    arr = [...new Set(arr.sort((a, b) => a - b))];
    this.root = this.buildTreeRecursive(arr, 0, arr.length - 1);
  }

  buildTreeRecursive(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTreeRecursive(arr, start, mid - 1);
    node.right = this.buildTreeRecursive(arr, mid + 1, end);
    return node;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    let ref = this.root;
    let newNode = new Node(value);
    while (true) {
      if (value < ref.data) {
        if (!ref.left) {
          ref.left = newNode;
          break;
        }
        ref = ref.left;
      } else if (value > ref.data) {
        if (!ref.right) {
          ref.right = newNode;
          break;
        }
        ref = ref.right;
      } else {
        break;
      }
    }
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

const arr = [1, 2, 3, 56, 56, 56, 4, 5, 6, 8, 9];
const newTree = new Tree();
newTree.buildTree(arr);
const myNode = newTree.root;
newTree.insert("7");
prettyPrint(myNode);
