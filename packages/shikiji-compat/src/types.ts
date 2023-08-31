import type { BuiltinLanguage, BuiltinTheme, BundledHighlighterOptions, CodeOptionsMultipleThemes, CodeOptionsSingleTheme, CodeToHastOptionsCommon, IRawGrammar, LanguageRegistration, LineOption, StringLiteralUnion, ThemeRegistration, ThemeRegistrationRaw } from 'shikiji'

export interface AnsiToHtmlOptions {
  theme?: StringLiteralUnion<BuiltinTheme>
  lineOptions?: LineOption[]
}

export interface HighlighterOptions extends BundledHighlighterOptions<BuiltinLanguage, BuiltinTheme> {
  theme?: BuiltinTheme
}

export type IThemeRegistration = ThemeRegistrationRaw | ThemeRegistration | StringLiteralUnion<BuiltinTheme>

export interface IShikiTheme extends ThemeRegistration {}

export interface ILanguageRegistration extends LanguageRegistration {
  grammar?: IRawGrammar
}

export type Lang = StringLiteralUnion<BuiltinLanguage>
export type Theme = StringLiteralUnion<BuiltinTheme>

export type CodeToHtmlOptions = (
  | Partial<CodeOptionsSingleTheme<BuiltinTheme>>
  | Partial<CodeOptionsMultipleThemes<BuiltinTheme>>
) & CodeToHastOptionsCommon<BuiltinLanguage>
