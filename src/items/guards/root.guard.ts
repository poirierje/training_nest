import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export abstract class RootGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('--> Guard : ' + this.constructor.name);
        return this.processCanActivate(context);
    }

    abstract processCanActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}