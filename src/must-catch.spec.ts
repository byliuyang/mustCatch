import {MustCatch} from "./must-catch";

describe('mustCatch', () => {
    test('', () => {
        enum DivisionError {
            DenominatorIsZero,
            Unknown
        }

        function divide(numerator: number, denominator: number): MustCatch<DivisionError, number> {
            if (denominator == 0)
                return new MustCatch<DivisionError, number>(DivisionError, DivisionError.DenominatorIsZero, 0);
            let quote = numerator / denominator;
            return new MustCatch<DivisionError, number>(DivisionError, null, quote);
        }

        let mustCatch = divide(1, 2);

        if (mustCatch.hasError(DivisionError.DenominatorIsZero)) {
            console.log('DenominatorIsZero');
        } else if (mustCatch.hasError(DivisionError.Unknown)) {
            console.log('Unknown');
        } else {
            let quote = mustCatch.success();
            console.log('Success', quote);
        }
    });
});
