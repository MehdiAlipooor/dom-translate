import pupa from "pupa";
import {
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
    useMemo,
} from "react";
import { useLanguageStorage } from "./hooks/use-language-storage";
import { flattenJSON, type NestedJSON } from "./utils/flatten-json";

type Language = Record<string, string>;
type Languages = Record<"fa" | "en", Language>;

export const EndpointV2 = ({
    allLanguages,
    defaultLanguage,
}: {
    allLanguages: Languages;
    defaultLanguage: string;
}) => {
    const { language } = useLanguageStorage(defaultLanguage);

    const flattenedLanguage = useMemo(
        () => flattenJSON(allLanguages[language as keyof Languages] as NestedJSON),
        [allLanguages, language]
    );

    const translationCache = useMemo(() => new Map<string, string>(), []);

    function translateString(input: string): string {
        if (translationCache.has(input)) {
            return translationCache.get(input) ?? ""
        }

        const val = flattenedLanguage[input];
        const translated = val ? pupa(val, {}) : input;
        translationCache.set(input, translated);
        return translated;
    }

    function translateReactNode(node: ReactNode): ReactNode {
        if (typeof node === "string") return translateString(node);

        if (Array.isArray(node)) {
            let changed = false;
            const newArray = node.map((child) => {
                const translatedChild = translateReactNode(child);
                if (translatedChild !== child) changed = true;
                return translatedChild;
            });

            return changed ? newArray : node;
        }

        if (isValidElement(node)) {
            const element = node as ReactElement<any>;
            const translatedChildren = translateReactNode(element.props.children);

            if (translatedChildren !== element.props.children) {
                return cloneElement(element, element.props, translatedChildren);
            }
            return element;
        }

        return node;
    }

    const response = useMemo(() => {
        return translateReactNode(
            <div>
                <div>
                    pages.profile.info.name
                    <p style={{ border: "2px solid red" }}>
                        pages.profile.info.email
                        <ul>
                            <li>
                                <a href="#something">list.one</a>
                            </li>
                            <li>
                                <a href="#something">list.two</a>
                            </li>
                            <li>
                                <a href="#something">list.three</a>
                            </li>
                            <li>
                                <a href="#something">list.four</a>
                                <h2>slkdfsdlfk</h2>

                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        );
    }, [flattenedLanguage]);

    return <>{response}</>;
};
