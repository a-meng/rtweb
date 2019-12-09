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
export class UpdateRolePermsService extends Mutation<{ updateRolePerms: boolean }, { id: number, permIds: number[] }> {
    document = gql(`
        mutation ($id:Int,$permIds:[Int]){
            updateRolePerms(id:$id,permIds:$permIds)
        }
    `);
}
