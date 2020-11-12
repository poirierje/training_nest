import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ForceBoolToTruePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return true;
    }

}
