export interface Theme {
    name: string;
    type: string | null;
    colors: {
        [key: string]: string;
    };
    get(key: string, value?: string | Theme): string | null;
    set(key: string, value: string | Theme): Theme;
    has(key: string): boolean;
    extend(value: Theme, rewrite?: boolean): Theme;
    toString(): string;
}
export declare function createTheme(name: string, type?: string): Theme;
