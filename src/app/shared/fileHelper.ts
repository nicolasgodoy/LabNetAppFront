export class fileHelper {




    static extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {

        try {
            const reader = new FileReader();
            reader.readAsDataURL($event);
            reader.onload = () => {
                resolve({
                    base: reader.result
                });
            };
            reader.onerror = error => {
                resolve({
                    base: null
                })
            }
        } catch (error) {

            return null;
        }
    })

    truncateString(input: string, maxLength: number): string {
        if (input.length <= maxLength) {
            return input;
        } else {
            return input.slice(0, maxLength) + '...';
        }
    }

    static truncateString(input: string, maxLength: number): string {
        if (input.length <= maxLength) {
            return input;
        } else {
            return input.slice(0, maxLength) + '...';
        }
    }
}