import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface IUserDocInput {
    name: string;
    email: string;
    pwd: string;
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
