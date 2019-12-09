import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface IUserDocInput {
    name: string;
    email: string;
    pwd: string;
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
