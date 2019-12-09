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
export class CreatePermService extends Mutation<{ insertId: number, message: string }, { doc: IPermDocInput }> {
    document = gql(`
        mutation  ($doc:PermDocInput){
            createPerm(doc:$doc) {
                insertId,
                message
            }
        }
    `);
}
