import * as path from "path";
import * as node from "util";

const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const reset = "\x1b[0m";

export var testFailures: number = 0;
export var testPasses: number = 0;

// grouping

export function group(name: string): (tests: () => void) => void {
    return (tests) => {
        console.log(`${yellow}${name}${reset}`);
        console.group();
        tests();
        console.groupEnd();
    };
}

export function relativeFilename(filename: string): string {
    return path.relative(process.cwd(), filename);
}

export function suite(filename: string): (tests: () => void) => void {
    return group(relativeFilename(filename));
}

// tests

export function test(name: string): (result: () => boolean) => void {
    return (result) => {
        try {
            testResult({ name, testPassed: result() });
        } catch (error) {
            testResult({
                name,
                testPassed: false,
                message: getErrorMessage(error),
            });
        }
    };
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    } else {
        return String(error);
    }
}

function testResult(result: {
    name: string;
    testPassed: boolean;
    message?: string;
}): void {
    const { name, testPassed, message } = result;
    const marker = testPassed ? green + "/" : red + "X";
    console.log(marker, name, reset);
    if (message) {
        console.group();
        console.group();
        console.log(message);
        console.groupEnd();
        console.groupEnd();
    }
    if (testPassed) {
        testPasses += 1;
    } else {
        testFailures += 1;
    }
}

// assert

export function assertEquals<A>(result: { expected: A; actual: A }): boolean {
    const { expected, actual } = result;

    return assert(node.isDeepStrictEqual(expected, actual))(
        `expected: ${JSON.stringify(expected, null, 2)}
actual: ${JSON.stringify(actual, null, 2)}`
    );
}

export function assert(result: boolean): (message: string) => boolean {
    return (message) => {
        if (!result) {
            throw new Error(message);
        }
        return result;
    };
}

// results

export function results(): void {
    console.log("");
    if (testFailures) {
        console.log(`${red}There were test failures.${reset}`);
        console.log(
            `total: ${
                testFailures + testPasses
            }, ${green}passed: ${testPasses}${reset}, ${red}failed: ${testFailures}${reset}`
        );
        process.exit(1);
    } else {
        console.log(`${green}All tests passed!${reset}`);
        console.log(`total: ${testFailures + testPasses}`);
    }
}
