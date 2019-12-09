import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Perm } from 'src/types/RtWeb';


export interface IPermDocInput {
    pid: number | null;
    name: string;
    value: string;
    attr: string;
    desc: string;
}


@Injectable({ providedIn: 'root' })
export class DeletePermService extends Mutation<{ affectedRows: number, message: string }, { id: number }> {
    document = gql(`
        mutation  ($id:Int){
            deletePerm(id:$id) {
                affectedRows,
                message
            }
        }
    `);
}
