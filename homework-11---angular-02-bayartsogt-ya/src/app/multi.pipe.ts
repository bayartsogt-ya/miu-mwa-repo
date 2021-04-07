import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "multi",
})
export class MultiPipe implements PipeTransform {
    transform(name: String, number: Number): String {
        let outputList: String[] = [];
        for (let i = 0; i < number; i++) {
            outputList.push(name);
        }
        return outputList.join(" ");
    }
}
