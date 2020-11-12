import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RootGuard } from "./root.guard";

@Injectable()
export class RolesGuard extends RootGuard {
    constructor(private reflector: Reflector) {
        super();
    }

    processCanActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const myRole = 'user';
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        console.log(`MyRole = ${myRole}`);
        console.log(`Roles  = ${roles}`);

        if (!roles) {
            return true;
        }

        // const request = context.switchToHttp().getRequest();
        // const user = request.user;
        // return matchRoles(roles, user.roles);

        return roles.includes(myRole);
    }
}