import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, Role, Permission } from '../../types/RtWeb';
import { ReplaySubject } from 'rxjs';

export interface Sess extends User {
    roles: ({ perms: Permission[] } & Role)[];
}


@Injectable({ providedIn: 'root' })
export class SessService extends Query<{ sess: Sess }> {
    document = gql(`
        query{
            sess {
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

@Injectable({ providedIn: 'root' })
export class LoginService extends Mutation<{ login: Sess }, { email: string, pwd: string }> {
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

@Injectable({ providedIn: 'root' })
export class LogoutService extends Mutation<boolean> {
    document = gql(`
        mutation{
            logout
        }
    `);
}
