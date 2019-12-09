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
export class UpdatePermService extends Mutation<{ affectedRows: number, message: string }, { id: number, doc: IPermDocInput }> {
    document = gql(`
        mutation  ($id:Int,$doc:PermDocInput){
            updatePerm(id:$id,doc:$doc) {
                affectedRows,
                message
            }
        }
    `);
}
