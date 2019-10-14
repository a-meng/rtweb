import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface IUser {
    id: number;
    name: string;
    email: string;
    roles: { id: number, name: string }[];
}
export interface IUserDocInput {
    name: string;
    email: string;
    pwd: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService extends Query<{ rtWebUsers: IUser[] }> {
    document = gql(`
        query($id:Int){
            rtWebUsers(id:$id) {
                id,
                name,
                email,
                roles {
                    id,
                    name
                }
            }
        }
    `);
}

@Injectable({ providedIn: 'root' })
export class CreateUserService extends Mutation<{ insertId: number, message: string }, { doc: IUserDocInput }> {
    document = gql(`
        mutation  ($doc:UserDocInput){
            createUser(doc:$doc) {
                insertId,
                message
            }
        }
    `);
}

@Injectable({ providedIn: 'root' })
export class UpdateUserService extends Mutation<{ affectedRows: number, message: string }, { id: number, doc: IUserDocInput }> {
    document = gql(`
        mutation  ($id:Int,$doc:UserDocInput){
            updateUser(id:$id,doc:$doc) {
                affectedRows,
                message
            }
        }
    `);
}

@Injectable({ providedIn: 'root' })
export class DeleteUserService extends Mutation<{ affectedRows: number, message: string }, { id: number }> {
    document = gql(`
        mutation  ($id:Int){
            deleteUser(id:$id) {
                affectedRows,
                message
            }
        }
    `);
}



