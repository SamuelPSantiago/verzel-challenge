export interface Validator<Input> {
    validate(Input: Input): void;
}