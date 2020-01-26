import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Permission } from 'src/types/RtWeb';


export interface IPermDocInput {
    pid: number | null;
    name: string;
    value: string;
    attr: string;
    desc: string;
}

@Injectable({ providedIn: 'root' })
export class PermsService extends Query<{ rtWebPerms: Permission[] }, { id: number }> {
    document = gql(`
        query($id:Int){
            rtWebPerms(id:$id) {
                id,
                pid,
                name,
                value,
                attr,
                desc
            }
        }
    `);
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
