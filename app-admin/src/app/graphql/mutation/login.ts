import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { UserRolePerm } from 'src/types/RtWeb';

@Injectable({ providedIn: 'root' })
export class LoginService extends Mutation<{ login: UserRolePerm | null }, { email: string, pwd: string }> {
    document = gql(`
        mutation($email: String, $pwd: String){
            login(email: $email, pwd: $pwd) {
                id,
                name,
                email,
                roles{
                    id,
                    name,
                    perms{
                        id,
                        pid,
                        name,
                        value,
                        attr,
                        desc
                    }
                }
            }
        }
    `);
}
