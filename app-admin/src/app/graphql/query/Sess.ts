import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { UserRolePerm } from 'src/types/RtWeb';
@Injectable({ providedIn: 'root' })
export class SessService extends Query<{ sess: UserRolePerm | null }> {
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
