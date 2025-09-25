export type NestedJSON = {
    [key: string]: string | NestedJSON;
};

/**
 * 
 * @param obj A nested json
 * @returns Flatted json
 * @example ```
 *      input = {
 *          "foo": {
 *              "bar": "x"
 *          }
 *      }
 *    
 *      output = {
 *          "foo.bar" = "x"
 *      }  
 * ```
 */
export function flattenJSON(
    obj: NestedJSON,
    prefix = "",
    res: Record<string, string> = {}
): Record<string, string> {
    for (const key in obj) {
        const val = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (val && typeof val === "object") {
            flattenJSON(val as NestedJSON, newKey, res); // reuse `res`
        } else {
            res[newKey] = val as string;
        }
    }
    return res;
}
