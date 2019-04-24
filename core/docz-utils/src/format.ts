import * as prettier from 'prettier'
import logger from 'signale'

export const formatter = (code: string, voidCustomElements: boolean) => {
  const formattedCode = prettier.format(code, {
    parser: 'babel',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  } as any)

  return voidCustomElements ? findCustomElements(formattedCode) : formattedCode;
}

export const format = (code: string, voidCustomElements: boolean = false): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const result = formatter(code, voidCustomElements)

      resolve(result)
    } catch (err) {
      logger.fatal(err)
      resolve(code)
    }
  })

const nonCustomVoidElements = 'area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr';
const elementRegex = new RegExp(`<(?!${nonCustomVoidElements})(?<element>[\\w-]*)(?<attributes>[^\\<]*)\\/>`)

const findCustomElements = (code: string): string => {
  const match = elementRegex.exec(code);
  if (match) {
    const { element, attributes } = match.groups as Record<string, string>;

    // make sure attributes do not consist out of a single whitespace from <foo />
    const formattedAttrs = attributes.trim() ? attributes.trimRight() : '';
    const replaced = code.replace(match[0], `\<${element}${formattedAttrs}></${element}>`);
    return findCustomElements(replaced)
  }

  return code;
}
