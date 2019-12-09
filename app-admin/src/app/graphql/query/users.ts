import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { UserRole } from 'src/types/RtWeb';

@Injectable({ providedIn: 'root' })
export class UsersService extends Query<{ rtWebUsers: UserRole[] }, { id?: number }> {
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
