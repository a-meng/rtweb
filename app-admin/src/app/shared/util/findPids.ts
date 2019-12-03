export default function findPids<T extends { id: number, pid: number }>(list: T[], ids: number[]): number[] {
    const has = list.find(e => e.id === ids[0]);
    if (has && has.pid) {
        return findPids(list, [has.pid, ...ids]);
    } else {
        return ids;
    }
}

