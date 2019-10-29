import { Component, OnInit, Input, Output, TemplateRef } from '@angular/core';
import { listToTree, TreeNode, ListNode, findRootIds } from '../util/listToTree';
@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
    public treeData: TreeNode<ListNode>[][] = [];
    // tslint:disable-next-line: variable-name
    private _data: ListNode[] = [];
    @Input()
    set data(data: ListNode[]) {
        this._data = data;
        const ids = findRootIds(data);
        console.info(ids);
        this.treeData = [].concat(...ids.map(id => listToTree(data, id)));

    }
    get data() {
        return this._data;
    }
    @Input() tpl: TemplateRef<ListNode> = null;

    constructor() { }

    ngOnInit() {
    }

}
