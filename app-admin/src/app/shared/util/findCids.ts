export default function findCids<T extends { id: number, pid: number }>(list: T[], ids: number[]): number[] {
    let children = [];
    ids.forEach(e => {
        const arr = list.filter(ee => ee.pid === e).map(ee => ee.id);
        children = children.concat(arr);
    });
    if (children.length > 0) {
        return [...ids, ...findCids(list, children)];
    } else {
        return ids;
    }
}
