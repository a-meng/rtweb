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
export class RolePermsService extends Query<{ rtWebRoles: RolePerm[] }, { id?: number | null }> {
    document = gql(`
        query($id:Int){
            rtWebRoles(id:$id) {
                id,
                pid,
                name,
                perms{
                    id,
                    pid,
                    name
                }
            }
        }
    `);
}
