export function validateNumber(input: string) {
    // Regular expression to match numbers, both integers and decimals
    var numberPattern = /^-?\d*\.?\d+$/;

    // Check if the input matches the pattern
    return numberPattern.test(input);
}
