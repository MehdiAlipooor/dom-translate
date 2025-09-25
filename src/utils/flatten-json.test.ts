import { describe, expect, it } from "vitest";
import { flattenJSON } from "./flatten-json";

const _unFlattedJson = {
    "foo": {
        "bar": "x"
    }
}

const _flattedJson = {
    "foo.bar": "x"
};

describe('flattenJson', () => {
    it('should flatten nested json', () => {
        const result = flattenJSON(_unFlattedJson);
        expect(result).toEqual(_flattedJson)
    })
})