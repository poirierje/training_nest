import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RootGuard } from "./root.guard";

@Injectable()
export class RolesGuard extends RootGuard {
    processCanActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return true;
    }
}