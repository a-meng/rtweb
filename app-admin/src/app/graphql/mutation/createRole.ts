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
export class CreateRoleService extends Mutation<{ insertId: number, message: string }, { doc: IRoleDocInput }> {
    document = gql(`
        mutation  ($doc:RoleDocInput){
            createRole(doc:$doc) {
                insertId,
                message
            }
        }
    `);
}
