import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RootGuard } from "./root.guard";

@Injectable()
export class AuthGuard extends RootGuard {
    processCanActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return (Math.random() < 0.5);
    }
}