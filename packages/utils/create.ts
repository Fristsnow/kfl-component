const _bem = (prefixName: string, blockSuffix: string, element: string, modifier: string) => {
    if (blockSuffix) prefixName += `-${blockSuffix}`;
    if (element) prefixName += `__${element}`;
    if (modifier) prefixName += `--${modifier}`;
    return prefixName;
}

const createBEM = (prefixName: string) => {
    const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix, '', '');
    const e = (element: string = '') => element ? _bem(prefixName, '', element, '') : '';
    const m = (modifier: string = '') => modifier ? _bem(prefixName, '', '', modifier) : '';
    const be = (blockSuffix: string = '', element: string = '') => blockSuffix && element ? _bem(prefixName, blockSuffix, element, '') : '';
    const bm = (blockSuffix: string = '', modifier: string = '') => blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : '';
    const em = (element: string = '', modifier: string = '') => element && modifier ? _bem(prefixName, '', element, modifier) : '';
    const bem = (blockSuffix: string = '', element: string = '', modifier: string = '') => blockSuffix && element && modifier ? _bem(prefixName, blockSuffix, element, modifier) : '';

    const is = (name: string, state: boolean | string) => (state ? `is-${name}` : ``)
    return { b, e, m, be, bm, em, bem }
}

export const createNamespace = (name: string) => {
    const prefixName = `kfl-${name}`;
    return createBEM(prefixName)
}

// export const bem = createNamespace('icon');

// console.log(bem.b('box'));
// console.log(bem.e('icon'));
// console.log(bem.m('icon'));
// console.log(bem.be('icon', 'icon'));
// console.log(bem.bm('icon', 'icon'));
// console.log(bem.em('icon', 'icon'));
// console.log(bem.bem('icon', 'icon', 'icon'));

