import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Role, RolePerm } from 'src/types/RtWeb';

export interface IRole {
    id: number;
    pid: number|null;
    name: string;
}
export interface IRoleDocInput {
    pid: number | null;
    name: string;
}




@Injectable({ providedIn: 'root' })
export class UpdateRoleService extends Mutation<{ affectedRows: number, message: string }, { id: number, doc: IRoleDocInput }> {
    document = gql(`
        mutation  ($id:Int,$doc:RoleDocInput){
            updateRole(id:$id,doc:$doc) {
                affectedRows,
                message
            }
        }
    `);
}
