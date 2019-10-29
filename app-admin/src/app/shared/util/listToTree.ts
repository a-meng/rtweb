import { uniq } from 'lodash';
class ListNode { id: number; pid: number; }

class TreeNode<T extends ListNode>  {
    id: number; pid: number;
    node: T;
    children: TreeNode<T>[];
    constructor(n: T) {
        this.id = n.id;
        this.pid = n.pid;
        this.node = n;
    }
}

function listToTree<T extends ListNode>(list: T[], id: number): TreeNode<T>[] {
    const selected = []; const remain = [];
    list.forEach(e => e.pid === id ? selected.push(e) : remain.push(e));
    return selected.map(e => {
        return {
            id: e.id, pid: e.pid,
            node: e,
            children: listToTree(remain, e.id)
        };
    });
}

// 检测列表是合法子树
function isChildTree(parentList: ListNode[], childList: ListNode[]): boolean {
    return childList.every(node => {
        // 1. 在参考列表中存在
        const hasNode = parentList.find(e => e.id === node.id);
        if (!hasNode) { return false; }
        // 2. 当参考列表中存在此节点的父节点时,父节点一定要被选上
        const pnode = parentList.find(e => e.id === hasNode.pid);
        if (pnode) {
            const hasNode2 = childList.find(e => e.id === pnode.id);
            if (!hasNode2) { return false; }
        }
        return true;
    });
}

// 寻找根节点 （返回的是根pid）
function findRootIds<T extends ListNode>(list: T[]): number[] {
    const pids = uniq(list.map(e => e.pid));

    const ids = list.map(e => e.id);
    // pid 在ids中不存在 的那个node就是根节点
    return  pids.filter(e => !ids.includes(e));
}

export { listToTree, isChildTree, ListNode, TreeNode, findRootIds };

