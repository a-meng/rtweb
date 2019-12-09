import { UserInputError } from 'apollo-server-koa'
import * as userServ from '../../services/user';
import * as roleServ from '../../services/role';
import * as premServ from '../../services/premission';
import * as rolePermServ from '../../services/rolePerm';
import * as userRoleServ from '../../services/userRole';
import { Context } from 'koa'
import { authByUserId } from '../../services/authority';
export default {
    Query: {
        rtWebUsers: (app: any, args: { id: number }, ctx: Context): Promise<userServ.User[]> => {
            const id = args.id;
            if (id) {
                return userServ.findById(id);
            } else {
                return userServ.findAll();
            }
        },
        rtWebRoles: (app: any, args: { id: number }, ctx: Context): Promise<roleServ.Role[]> => {
            const id = args.id;
            if (id) {
                return roleServ.findById(id);
            } else {
                return roleServ.findAll();
            }
        },
        rtWebPerms: (app: any, args: { id: number }, ctx: Context): Promise<premServ.Permission[]> => {
            const { id } = args;
            if (id) {
               // ctx.throw(500, '只能查全部');
                  return premServ.findById(id);
            } else {
                return premServ.findAll();
            }
        },
        sess: async (app: any, args: any, ctx: Context): Promise<userServ.User | null> => {
            let userId = ctx.session?.id;
            if (userId) {
                let [user] = await userServ.findById(userId);
                return user || null;
            }
            return null;
        }
    },
    Mutation: {
        createUser: async (app: any, params: { doc: userServ.UserDoc }, ctx: Context): Promise<{ insertId: number, message: string }> => {
            let res = await userServ.create(params.doc);
            return {
                insertId: res.insertId,
                message: res.message
            };
        },
        updateUser: async (app: any, params: { id: number, doc: userServ.User }, ctx: Context): Promise<{ affectedRows: number, message: string }> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/user/edit']);
            if (!authState) throw ('权限不足');
            const res = await userServ.updateById(params.id, params.doc);
            return {
                affectedRows: res.affectedRows,
                message: res.message
            };
        },
        deleteUser: async (app: any, params: { id: number }, ctx: Context): Promise<{ affectedRows: number, message: string }> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/user/edit']);
            if (!authState) throw ('权限不足');
            const res = await userServ.deleteById(params.id);
            return {
                affectedRows: res.affectedRows,
                message: res.message
            };
        },

        createRole: async (app: any, params: { doc: roleServ.Role }, ctx: Context): Promise<{ insertId: number, message: string }> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/role/edit']);
            if (!authState) throw ('权限不足');
            const res = await roleServ.create(params.doc);
            return {
                insertId: res.insertId,
                message: res.message
            };
        },
        updateRole: async (app: any, params: { id: number, doc: roleServ.Role }, ctx: Context): Promise<{ affectedRows: number, message: string }> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/role/edit']);
            if (!authState) throw ('权限不足');
            const res = await roleServ.updateById(params.id, params.doc);
            return {
                affectedRows: res.affectedRows,
                message: res.message
            };
        },
        deleteRole: async (app: any, params: { id: number }, ctx: Context): Promise<{ affectedRows: number, message: string }> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/role/edit']);
            if (!authState) throw ('权限不足');
            const res = await roleServ.deleteById(params.id);
            await rolePermServ.deleteByRoleId(params.id); //附带删除role_permission 关联关系
            return {
                affectedRows: res.affectedRows,
                message: res.message
            };
        },

        createPerm: async (app: any, params: { doc: premServ.Permission }, ctx: Context): Promise<boolean> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/permission/edit']);
            if (!authState) throw ('权限不足');
            await premServ.create(params.doc);
            return true;
        },
        updatePerm: async (app: any, params: { id: number, doc: premServ.Permission }, ctx: Context): Promise<boolean> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/permission/edit']);
            if (!authState) throw ('权限不足');
            await premServ.updateById(params.id, params.doc);
            return true
        },
        deletePerm: async (app: any, params: { id: number }, ctx: Context): Promise<boolean> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/permission/edit']);
            if (!authState) throw ('权限不足');
            await premServ.deleteById(params.id);
            return true;
        },

        updateUserRoles: async (app: any, params: { id: number, roleIds: number[] }, ctx: Context): Promise<boolean> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/user/edit']);
            if (!authState) throw ('权限不足');
            await userRoleServ.updateByUserId(params.id, params.roleIds);
            return true;
        },
        updateRolePerms: async (app: any, params: { id: number, permIds: number[] }, ctx: Context): Promise<boolean> => {
            let authState = await authByUserId(ctx.session?.id, ['admin/role/edit']);
            if (!authState) throw ('权限不足');
            await rolePermServ.updateByRoleId(params.id, params.permIds);
            return true;
        },
        login: async (app: any, args: { email: string, pwd: string }, ctx: Context): Promise<userServ.User> => {
            const { email, pwd } = args;
            console.info(email, pwd);
            let [user] = await userServ.findByEmail(email);
            console.info(user);
            if (user && user.pwd === pwd) {
                if (ctx.session) {
                    ctx.session.id = user.id; //更新登录信息
                } else {
                    ctx.throw('登录信息保存失败', 500);
                }
                return user;
            } else {
                throw new UserInputError('用户名或密码错误');
            }
        },
        logout: async (app: any, args: any, ctx: Context): Promise<boolean> => {
            ctx.session = null;
            return true;
        },
    },

    RtWebUser: {
        roles: (user: userServ.User): Promise<roleServ.Role[]> => roleServ.findByUserId(user.id)
    },
    RtWebRole: {
        perms: (role: roleServ.Role): Promise<roleServ.Role[]> => {
            // 角色id为1属于系统管理员 获取所有权限
            if (role.id === 1) {
                return premServ.findAll();
            } else {
                return premServ.findByRoleIds([role.id])
            }

        }
    }
}