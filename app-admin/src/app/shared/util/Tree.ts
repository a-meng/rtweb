interface TheNode {
    id: number;
    pid: number | null;
}

interface TheTree<T extends TheNode> {
    id: T['id'];
    pid: T['pid'];
    node: T;
    children: TheTree<T>[];
}

function listToTree<T extends TheNode>(list: T[], pid: number | null = null): TheTree<T>[] {
    return list.filter(e => e.pid === pid).map(e => {
        return {
            id: e.id,
            pid: e.pid,
            node: e,
            children: listToTree(list, e.id)
        };
    });
}
