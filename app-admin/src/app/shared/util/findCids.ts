export default function findCids<T extends { id: number, pid: number | null }>(list: T[], ids: (number | null)[]): (number | null)[] {
    let children: (number | null)[] = [];
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
