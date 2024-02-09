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
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (!node) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      let minNode = this.findMinNode(node.right);
      node.data = minNode.data;

      node.right = this.deleteNode(node.right, minNode.data);
    }
    return node;
  }

  findMinNode(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }
  find(value, node = this.root) {
    if (!node) {
      return null;
    }

    if (node.data === value) {
      return node;
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }
  levelOrder(callback) {
    if (!this.root) {
      return;
    }

    let queue = [this.root];
    let answer = [];

    while (queue.length > 0) {
      let node = queue.shift();

      if (!callback) {
        answer.push(node.data);
      } else {
        answer.push(callback(node.data));
      }

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return answer;
  }
  inorder(callback, node = this.root) {
    let answer = [];
    if (!node) {
      return answer;
    }
    if (!callback) {
      answer.push(node.data);
    } else {
      answer.push(callback(node.data));
    }
    if (node.right) {
      answer = answer.concat(this.inorder(callback, node.right));
    }
    if (node.left) {
      answer = answer.concat(this.inorder(callback, node.left));
    }

    return answer;
  }
  preorder(callback, node = this.root) {
    let answer = [];
    if (!node) {
      return;
    }
    if (node.left) {
      answer = answer.concat(this.preorder(callback, node.left));
    }
    if (!callback) {
      answer.push(node.data);
    } else {
      answer.push(callback(node.data));
    }
    if (node.right) {
      answer = answer.concat(this.preorder(callback, node.right));
    }
    return answer;
  }
  postorder(callback, node = this.root) {
    let answer = [];
    if (!node) {
      return;
    }
    if (node.right) {
      answer = answer.concat(this.postorder(callback, node.right));
    }
    if (!callback) {
      answer.push(node.data);
    } else {
      answer.push(callback(node.data));
    }
    if (node.left) {
      answer = answer.concat(this.postorder(callback, node.left));
    }

    return answer;
  }
  height(node = this.root) {
    if (!node) {
      return 0;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(value, node = this.root) {
    let depthVal = 0;
    if (!node) {
      return null;
    }
    if (node.data == value) {
      return depthVal + 1;
    }
    if (node.data > value) {
      return (depthVal = depthVal + this.depth(value, node.left) + 1);
    }
    if (node.data < value) {
      return (depthVal = depthVal + this.depth(value, node.right) + 1);
    }
    return depthVal;
  }
  isbalanced() {
    if (!this.root) {
      return "empty";
    }
    const rightHeight = this.height(this.root.right);
    const leftHeight = this.height(this.root.left);
    return Math.abs(rightHeight - leftHeight) > 1 ? false : true;
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
console.log(myNode);
prettyPrint(myNode);
console.log(newTree.isbalanced());
