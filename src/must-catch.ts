export class MustCatch<Err, Result> {
    readonly _errors: { [error: string]: boolean };
    readonly _totalNumErrors: number;
    private _numErrorsCaught: number;

    constructor(private _ErrorEnum: any, private _error: Err, private _result: Result) {
        this._errors = {};

        const possibleErrors = this._getPossibleValues(_ErrorEnum);
        possibleErrors.forEach(error =>
            this._errors[error] = false);

        this._totalNumErrors = possibleErrors.length;
        this._numErrorsCaught = 0;
    }

    _getPossibleValues(ErrorEnum: any): string[] {
        return Object
            .keys(ErrorEnum)
            .filter(error => !isNaN(Number(error)))
            .map(error => ErrorEnum[error]);
    }

    hasError(error: Err): boolean {
        const errorStr = this._ErrorEnum[error];
        if(!this._errors[errorStr] && this._numErrorsCaught < this._totalNumErrors) {
            this._errors[errorStr] = true;
            this._numErrorsCaught++;
        }
        return this._error === error;
    }

    success(): Result {
        if (this._numErrorsCaught === this._totalNumErrors) {
            return this._result;
        }
        throw new Error(`all ${this._ErrorEnum} must be handled!`);
    }
}
