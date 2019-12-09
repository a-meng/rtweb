import { gql } from 'apollo-server-koa'

export default gql`
    type Query{
        rtWebUsers(id:Int):[RtWebUser]
        rtWebRoles(id:Int):[RtWebRole]
        rtWebPerms(id:Int):[RtWebPermission]
        sess:RtWebUser
    }
    type Mutation {
        createUser(doc:UserDocInput):InsertOutput
        updateUser(id:Int,doc:UserDocInput):UpdateOutput
        deleteUser(id:Int):DeleteOutput
        createRole(doc:RoleDocInput):InsertOutput
        updateRole(id:Int,doc:RoleDocInput):UpdateOutput
        deleteRole(id:Int):DeleteOutput
        createPerm(doc:PermDocInput):Boolean
        updatePerm(id:Int,doc:PermDocInput):Boolean
        deletePerm(id:Int):Boolean
        updateUserRoles(id:Int,roleIds:[Int]):Boolean
        updateRolePerms(id:Int,permIds:[Int]):Boolean
        login(email:String,pwd:String):RtWebUser
        logout:Boolean
    }
    type RtWebUser{
        id: Int
        email: String
        name: String
        roles:[RtWebRole]
    }
    type RtWebRole{
        id:Int
        pid:Int
        name:String
        perms:[RtWebPermission]
    }
    type RtWebPermission{
        id:Int
        pid:Int
        name:String
        value:String
        attr:String
        desc:String
    }
    type InsertOutput{
        insertId:Int
        message:String  
    }
    type UpdateOutput{
        affectedRows:Int
        message:String
    }
    type DeleteOutput{
        affectedRows:Int
        message:String
    }
    input UserDocInput{
        name: String
        email: String
        pwd: String
    }
    input RoleDocInput{
        id:Int
        pid:Int
        name:String
    }
    input PermDocInput{
        pid:Int
        name:String
        value:String
        attr:String
        desc:String
    }
`