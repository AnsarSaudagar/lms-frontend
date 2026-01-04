import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
    transform(seconds: number | null | undefined): string {
        if (!seconds || seconds < 0) return '0s';

        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);

        if (hrs > 0) {
            return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
        }

        if (mins > 0) {
            return `${mins}m`;
        }

        return `${seconds}s`;
    }
}
