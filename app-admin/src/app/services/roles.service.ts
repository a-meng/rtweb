import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface IRole {
    id: number;
    pid: number;
    name: string;
}
export interface IRoleDocInput {
    pid: number;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class RolesService extends Query<{ rtWebRoles: IRole[] }, { id?: number }> {
    document = gql(`
        query($id:Int){
            rtWebRoles(id:$id) {
                id,
                pid,
                name
            }
        }
    `);
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


@Injectable({ providedIn: 'root' })
export class DeleteRoleService extends Mutation<{ affectedRows: number, message: string }, { id: number }> {
    document = gql(`
        mutation  ($id:Int){
            deleteRole(id:$id) {
                affectedRows,
                message
            }
        }
    `);
}

@Injectable({ providedIn: 'root' })
export class RolePermsService extends Query<{ rtWebRoles: IRole[] }, { id?: number }> {
    document = gql(`
        query($id:Int){
            rtWebRoles(id:$id) {
                id,
                perms{
                    id
                }
            }
        }
    `);
}

@Injectable({ providedIn: 'root' })
export class UpdateRolePerms extends Mutation<boolean, { id: number, permIds: number[] }> {
    document = gql(`
        mutation ($id:Int,$permIds:[Int]){
            updateRolePerms(id:$id,permIds:$permIds)
        }
    `);
}

