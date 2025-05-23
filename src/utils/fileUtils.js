import * as fs from "fs";
import * as path from "path";

export class FileUtils {
    static async writeToFile(fileName, dataToWrite) {
        const dir = path.join(process.cwd(), "testdata");
        path.join();
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } // Write to file

        const filePath = path.join(dir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(dataToWrite, null, 2));
        console.log(`Data saved to ${filePath}`);
    }
}
